const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const router = express();
const fs = require('fs')
const dotenv = require('dotenv');
const sharp = require('sharp')
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
  const jsonOutput = {
    title: title,
    artist: artist,
    tags: tags.split(',').map(tag => tag.trim()),
    href: href,
    published: published
  };

  if ((await sharpBuffer.metadata()).width > 500) {
    const compressedParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: `500w/${convertToSnakeCase(title)}.${file.originalname.split('.').pop()}`,
      Body: sharpBuffer.resize({width: 500}).jpeg(),
      ContentType: file.mimetype
    }
    jsonOutput['thumbnailUrl'] = (await s3.upload(compressedParams).promise()).Location;
  }

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: convertToSnakeCase(title) + '.' + file.originalname.split('.').pop(),
    Body: file.buffer,
    ContentType: file.mimetype
  };

  jsonOutput['src'] = (await s3.upload(params).promise()).Location;
  addToJson(jsonOutput);
  res.json(jsonOutput);
});

function addToJson(jsonOutput) {
  fs.readFile('D:\\Users\\alanx\\WebstormProjects\\Personal-Website\\api\\routes\\images.json', (err, data) => {
    let json = JSON.parse(data);
    json.push(jsonOutput);

    fs.writeFile('D:\\Users\\alanx\\WebstormProjects\\Personal-Website\\api\\routes\\images.json', JSON.stringify(json, null, 2), (err1) => {
      console.log(err1)
    });
  })
}


module.exports = router;