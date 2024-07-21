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

// Combine similar lines of code
router.post('/', upload.single('image'), async (req, res) => {
    const file = req.file;
    const {artist, href, tags, title, published} = req.body;

    function convertToSnakeCase(str) {
        return str && str.match(
            /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
            .map(s => s.toLowerCase())
            .join('_');
    }


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

    const isGif = file.mimetype === "image/gif";
    if (metadata.height > 600) {
        const compressedParams = {
            Bucket: process.env.BUCKET_NAME,
            Key: `600h/${convertToSnakeCase(title)}.webp`,
            Body: sharp(file.buffer, {animated: isGif}).resize({height: 600}).toFormat('webp'),
            ContentType: 'image/webp'
        }
        jsonOutput['thumbnailUrl'] = (await s3.upload(compressedParams).promise()).Location;
    }

    const webpParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: `webp/${convertToSnakeCase(title)}.webp`,
        Body: sharp(file.buffer, {animated: isGif}).webp(),
        ContentType: 'image/webp'
    }
    jsonOutput['webp'] = (await s3.upload(webpParams).promise()).Location;


    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: `${convertToSnakeCase(title)}.${file.originalname.split('.').pop()}`,
        Body: file.buffer,
        ContentType: file.mimetype
    };

    jsonOutput['src'] = (await s3.upload(params).promise()).Location;
    addToJson(jsonOutput);
    res.json(jsonOutput);
});

router.post('/alt', upload.single('image'), async (req, res) => {
    const file = req.file;
    const {href, tags, imageName, altCount} = req.body;
    const numberOfAlts = parseInt(altCount);

    function convertToSnakeCase(str) {
        return str && str.match(
            /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
            .map(s => s.toLowerCase())
            .join('_');
    }

    const sharpBuffer = sharp(file.buffer);
    const metadata = await sharpBuffer.metadata();
    const jsonOutput = {
        // Inherit the original's tags if it's blank
        tags: tags.split(',').map(tag => tag.trim()),
        href: href,
        aspectRatio: metadata.width / metadata.height,
        parent: imageName
    };

    const isGif = file.mimetype === "image/gif";
    if (metadata.height > 600) {
        const compressedParams = {
            Bucket: process.env.BUCKET_NAME,
            Key: `600h/${convertToSnakeCase(imageName)}/${numberOfAlts}.webp`,
            Body: sharp(file.buffer, {animated: isGif}).resize({height: 600}).toFormat("webp"),
            ContentType: 'image/webp'
        }
        // TODO Unify names
        jsonOutput['thumbnailUrl'] = (await s3.upload(compressedParams).promise()).Location;
    }

    const webpParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: `webp/${convertToSnakeCase(imageName)}/${numberOfAlts}.webp`,
        Body: sharp(file.buffer, {animated: isGif}).toFormat('webp'),
        ContentType: 'image/webp'
    }
    jsonOutput['webp'] = (await s3.upload(webpParams).promise()).Location;


    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: `${convertToSnakeCase(imageName)}/${numberOfAlts}.${file.originalname.split('.').pop()}`,
        Body: file.buffer,
        ContentType: file.mimetype
    };

    jsonOutput['src'] = (await s3.upload(params).promise()).Location;
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


module.exports = router;