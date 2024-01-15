const express = require('express');
const AWS = require('aws-sdk');
const router = express();
const fs = require('fs')
const dotenv = require('dotenv');
const images = require('./images.json');
const sharp = require('sharp');
const axios = require("axios");

dotenv.config();
router.use(express.json());

// Configure AWS SDK
AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: 'us-east-1'
});
const s3 = new AWS.S3();

router.post('/', (req, res) => {
    const jsonEntries = images;
    Promise.all(jsonEntries.filter(value => value.src.startsWith("https://alcorsiteartbucket.s3.amazonaws.com/"))
        .map(value => compressImageOnS3(jsonEntries, value.src.split("/").pop())))
        .then(() => {
            fs.writeFileSync("./routes/images.json", JSON.stringify(jsonEntries));
            res.json(jsonEntries)
        })
});

async function compressImageOnS3(jsonEntries, key) {
    const originalImage = await s3.getObject({
        Bucket: process.env.BUCKET_NAME,
        Key: key
    }).promise();

    // noinspection JSCheckFunctionSignatures
    const sharpImage = sharp(originalImage.Body);
    if ((await sharpImage.metadata()).height > 500) {
        const compressedImageBuffer = await sharpImage
            .resize({height: 500})
            .webp()
            .toBuffer();

        const imageName = key.split('.')[0];
        console.log('Uploading ' + imageName)
        return s3.upload({
            Bucket: process.env.BUCKET_NAME,
            Key: `500h/${imageName}.webp`,
            Body: compressedImageBuffer,
            ContentType: 'image/webp'
        }, (err, data) => {
            if (err) {
                return err;
            } else {
                jsonEntries.find((entry) => entry.src.split("/").pop() === key)["thumbnailUrl"] = data.Location;
            }
        });
    }
    return Promise.resolve();
}

module.exports = router;