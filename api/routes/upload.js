const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const router = express();
const fs = require('fs')
const dotenv = require('dotenv');
const sharp = require('sharp')
const path = require('path')
dotenv.config();
router.use(express.json());

// Configure AWS SDK
AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
});
const s3 = new AWS.S3();

// Multer setup for image upload
const storage = multer.memoryStorage();
const upload = multer({storage});

function convertToSnakeCase(str) {
    return str && str.match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        .map(s => s.toLowerCase())
        .join('_');
}

router.post('/', upload.single('image'), async (req, res) => {
    const file = req.file;

    const {artist, href, tags, title, published} = req.body;


    const sharpBuffer = sharp(file.buffer);
    const metadata = await sharpBuffer.metadata();
    const jsonOutput = {
        title: title,
        artist: artist,
        tags: tags.split(',').map(tag => tag.trim()),
        href: href,
        published: published,
        aspectRatio: metadata.width / metadata.height
    };

    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: `${convertToSnakeCase(title)}.${file.originalname.split('.').pop()}`,
        Body: file.buffer,
        ContentType: file.mimetype
    };

    jsonOutput['src'] = (await s3.upload(params).promise()).Location;
    await uploadCompressedVersions(file.buffer, convertToSnakeCase(title), jsonOutput, 0)
    addToJson(jsonOutput);
    res.json(jsonOutput);
});

router.post('/alt', upload.single('image'), async (req, res) => {
    const file = req.file;
    const {href, tags, imageName, altCount} = req.body;
    const numberOfAlts = require('images.json').concat(require('hidden.json')).filter(value => value.parent === imageName).length + 1;

    const sharpBuffer = sharp(file.buffer);
    const metadata = await sharpBuffer.metadata();
    const jsonOutput = {
        // Inherit the original's tags if it's blank
        tags: tags.split(',').map(tag => tag.trim()),
        href: href,
        aspectRatio: metadata.width / metadata.height,
        parent: imageName
    };

    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: `${convertToSnakeCase(imageName)}/${numberOfAlts}.${file.originalname.split('.').pop()}`,
        Body: file.buffer,
        ContentType: file.mimetype
    };

    jsonOutput['src'] = (await s3.upload(params).promise()).Location;
    await uploadCompressedVersions(file.buffer, convertToSnakeCase(imageName), jsonOutput, numberOfAlts)
    addAltToJson(jsonOutput);
    res.json(jsonOutput);
});

function addAltToJson(jsonOutput) {
    const fileToWriteTo = jsonOutput.tags.includes('Hidden') ? './hidden.json' : './images.json';
    fs.readFile(path.resolve(__dirname, fileToWriteTo), (err, data) => {
        let images = JSON.parse(data);
        images.push(jsonOutput)
        fs.writeFileSync(path.resolve(__dirname, fileToWriteTo), JSON.stringify(images, null, 2));
    });
}


function addToJson(jsonOutput) {
    const fileToWriteTo = jsonOutput.tags.includes('Hidden') ? './hidden.json' : './images.json';
    fs.readFile(path.resolve(__dirname, fileToWriteTo), (err, data) => {
        let json = JSON.parse(data);
        json.push(jsonOutput);

        fs.writeFile(path.resolve(__dirname, fileToWriteTo), JSON.stringify(json, null, 2), (err1) => {
            console.log(err1)
        });
    })
}

async function uploadCompressedVersions(originalImage, imageName, entry, altNumber) {
    const sharpImage = sharp(originalImage, {animated: true});
    let webpImageBuffer = await sharpImage
        .resize({width: 4096, fit: 'outside', withoutEnlargement: true})
        .webp()
        .toBuffer();

    // We want a lossless webp, near lossless 4k, and 1mb or less for the thumbnail
    let compressedImageBuffer = await getCompressedBuffer(sharpImage, imageName);
    return Promise.all([
        s3.upload({
            Bucket: process.env.BUCKET_NAME, Key: entry.parent ? `thumbnail/alts/${imageName}_${altNumber}.webp` : `thumbnail/${imageName}.webp`, Body: compressedImageBuffer, ContentType: 'image/webp'
        }, (err, data) => {
            if (err) {
                return err;
            } else {
                console.log(`Successfully uploaded ${imageName} to ${data.Location}`)
                entry["thumbnailUrl"] = data.Location;
            }
        }),
        s3.upload({
            Bucket: process.env.BUCKET_NAME, Key: entry.parent ? `webp/alts/${imageName}_${altNumber}.webp` : `webp/${imageName}.webp`, Body: webpImageBuffer, ContentType: 'image/webp'
        }, (err, data) => {
            if (err) {
                return err;
            } else {
                console.log(`Successfully uploaded ${imageName} to ${data.Location}`)
                entry["webp"] = data.Location;
            }
        })
    ]);
}

async function getCompressedBuffer(sharpImage, imageName) {
    let fileSize;
    let compressedImageBuffer;
    let quality = 80;
    do {
        compressedImageBuffer = await sharpImage
            .resize({width: 4096, fit: 'inside', withoutEnlargement: true})
            .webp({quality: quality})
            .toBuffer();
        fileSize = compressedImageBuffer.length;
        // Compress to 1mb or less
        if (fileSize > 1048576) {
            quality -= 5;
        } else {
            break;
        }
    } while (quality > 0);

    // noinspection JSUnusedAssignment
    console.log(`Uploading ${imageName} with Quality: ${quality} and Size: ${Math.floor(fileSize / 1024)} kilobytes`)
    return compressedImageBuffer;
}


module.exports = {router, uploadCompressedVersions};