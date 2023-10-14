const express = require('express');
const multer = require('multer');
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
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Prefix: '',
  }
  s3.listObjectsV2(params, function (err, data) {
    if (err) {
      res.json(err);
    }
    else {
      // data.Contents.map(value => value.Key).filter(value => !value.startsWith('500w/')).forEach(value => {
      //   compressImageOnS3(value);
      // })
      // res.json(data.Contents);
      // addCompressedLink(data.Contents.map(value => value.Key).filter(value => value.startsWith('500w/')));
      compressImageOnS3('alcor_techsuit.jpeg').then(value => {
        addCompressedLink(['500w/alcor_techsuit.jpeg']);
        res.json(value);
      })
    }
  })
});

async function compressImageOnS3(key) {
  const originalImage = await s3.getObject({
    Bucket: process.env.BUCKET_NAME,
    Key: key
  }).promise();

  const sharpImage = sharp(originalImage.Body);
  if ((await sharpImage.metadata()).width > 500) {
    const compressedImageBuffer = await sharpImage
      .resize({width: 500})
      .jpeg()
      .toBuffer();

    const titleCase = (s) =>
      s.replace (/^[-_]*(.)/, (_, c) => c.toUpperCase())       // Initial char (after -/_)
        .replace (/[-_]+(.)/g, (_, c) => ' ' + c.toUpperCase()) // First char after each -/_

    const imageName = key.split('.')[0];
    console.log('Uploading ' + imageName)
    const output = await s3.upload({
      Bucket: process.env.BUCKET_NAME,
      Key: `500w/${imageName}.jpeg`,
      Body: compressedImageBuffer,
      ContentType: 'image/jpeg'
    }, async (err, data) => {
      if (err) {
        return err;
      } else {
        return data;
      }
    });
  }

}

function convertToSnakeCase(str) {
  return str && str.match(
    /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(s => s.toLowerCase())
    .join('_');
}

function addCompressedLink(keys) {
  fs.readFile('D:\\Users\\alanx\\WebstormProjects\\Personal-Website\\api\\routes\\images.json', async (err, data) => {
    let json = JSON.parse(data);
    keys.forEach(key => {
      const find = json.find(path => path.src.split('/').pop().split('.')[0] === key.split('/')[1].split('.')[0]);
      if (find) {
        console.log(`Compressed image for ${key} is available on https://alcorsiteartbucket.s3.amazonaws.com/${key}`)
        find['thumbnailUrl'] = `https://alcorsiteartbucket.s3.amazonaws.com/${key}`;
        fs.writeFileSync('D:\\Users\\alanx\\WebstormProjects\\Personal-Website\\api\\routes\\images.json', JSON.stringify(json, null, 2), err1 => {
          console.log(err1)
        });
      }
    })
  })
}

module.exports = router;