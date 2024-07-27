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

function convertGreekToUnicode(str) {
    const greekToUnicodeMap = {
        'Α': 'U+0391', 'Β': 'U+0392', 'Γ': 'U+0393', 'Δ': 'U+0394', 'Ε': 'U+0395',
        'Ζ': 'U+0396', 'Η': 'U+0397', 'Θ': 'U+0398', 'Ι': 'U+0399', 'Κ': 'U+039A',
        'Λ': 'U+039B', 'Μ': 'U+039C', 'Ν': 'U+039D', 'Ξ': 'U+039E', 'Ο': 'U+039F',
        'Π': 'U+03A0', 'Ρ': 'U+03A1', 'Σ': 'U+03A3', 'Τ': 'U+03A4', 'Υ': 'U+03A5',
        'Φ': 'U+03A6', 'Χ': 'U+03A7', 'Ψ': 'U+03A8', 'Ω': 'U+03A9',
        'α': 'U+03B1', 'β': 'U+03B2', 'γ': 'U+03B3', 'δ': 'U+03B4', 'ε': 'U+03B5',
        'ζ': 'U+03B6', 'η': 'U+03B7', 'θ': 'U+03B8', 'ι': 'U+03B9', 'κ': 'U+03BA',
        'λ': 'U+03BB', 'μ': 'U+03BC', 'ν': 'U+03BD', 'ξ': 'U+03BE', 'ο': 'U+03BF',
        'π': 'U+03C0', 'ρ': 'U+03C1', 'σ': 'U+03C3', 'τ': 'U+03C4', 'υ': 'U+03C5',
        'φ': 'U+03C6', 'χ': 'U+03C7', 'ψ': 'U+03C8', 'ω': 'U+03C9'
    };

    let result = '';
    for (let char of str) {
        if (greekToUnicodeMap[char]) {
            result += greekToUnicodeMap[char];
        } else {
            result += char;
        }
    }
    return result;
}

function prepareFileName(title) {
    return convertToSnakeCase(convertGreekToUnicode(title));
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

    const fileName = prepareFileName(title);
    const fileExtension = file.originalname.split('.').pop();
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: `${fileName}.${fileExtension}`,
        Body: file.buffer,
        ContentType: file.mimetype
    };

    jsonOutput['src'] = (await s3.upload(params).promise()).Location;
    const [compressedData, webpData] = await uploadCompressedVersions(file.buffer, fileName, jsonOutput, 0)
    jsonOutput['thumbnailUrl'] = compressedData.Location
    jsonOutput['webp'] = webpData.Location;
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

    const fileName = prepareFileName(imageName);
    const fileExtension = file.originalname.split('.').pop();
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: `alts/${imageName}_${numberOfAlts}.${fileExtension}`,
        Body: file.buffer,
        ContentType: file.mimetype
    };

    jsonOutput['src'] = (await s3.upload(params).promise()).Location;
    const [compressedData, webpData] = await uploadCompressedVersions(file.buffer, fileName, jsonOutput, numberOfAlts);
    jsonOutput['thumbnailUrl'] = compressedData.Location
    jsonOutput['webp'] = webpData.Location;
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
        .resize({width: 4096, height: 2160, fit: 'outside', withoutEnlargement: true})
        .webp()
        .toBuffer();

    // We want a lossless webp, near lossless 4k, and 1mb or less for the thumbnail
    let compressedImageBuffer = await getCompressedBuffer(sharpImage, imageName);
    return Promise.all([
        s3.upload({
            Bucket: process.env.BUCKET_NAME, Key: entry.parent ? `thumbnail/alts/${imageName}_${altNumber}.webp` : `thumbnail/${imageName}.webp`, Body: compressedImageBuffer, ContentType: 'image/webp'
        }).promise(),
        s3.upload({
            Bucket: process.env.BUCKET_NAME, Key: entry.parent ? `webp/alts/${imageName}_${altNumber}.webp` : `webp/${imageName}.webp`, Body: webpImageBuffer, ContentType: 'image/webp'
        }).promise()
    ]);
}

async function getCompressedBuffer(sharpImage, imageName) {
    let fileSize;
    let compressedImageBuffer;
    let quality = 80;
    do {
        compressedImageBuffer = await sharpImage
            .resize({width: 4096, height: 2160, fit: 'inside', withoutEnlargement: true})
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


module.exports = {router, uploadCompressedVersions, prepareFileName};