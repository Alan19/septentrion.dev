const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const router = express();
const fs = require('fs')
const dotenv = require('dotenv');
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

router.post('/', upload.single('image'), (req, res) => {
  const file = req.file;
  const {artist, href, tags, title} = req.body;

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: title,
    Body: file.buffer,
    ContentType: file.mimetype
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({error: 'Error uploading image'});
    }

    const imageUrl = data.Location;

    // Update your JSON file with the image link and tags
    // Update the JSON file and send a response to the client
    const jsonOutput = {
      src: imageUrl,
      title: title,
      artist: artist,
      tags: tags.split(',').map(tag => tag.trim()),
      href: href
    };
    res.json(jsonOutput);


    addToJson(jsonOutput);
  });
});

function addToJson(jsonOutput) {
  fs.readFile('D:\\Users\\alanx\\WebstormProjects\\Personal-Website\\api\\routes\\images.json', (err, data) => {
    let json = JSON.parse(data);
    json.push(jsonOutput);

    fs.writeFile('D:\\Users\\alanx\\WebstormProjects\\Personal-Website\\api\\routes\\images.json', JSON.stringify(json, null, 2), err1 => {
      console.log(err1)
    });
  })
}


module.exports = router;