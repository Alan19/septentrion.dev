const express = require("express");
const router = express.Router();

const imageJson = require('./images.json')
const hidden = require("./local_scripts/hidden.json");
const fs = require("fs");
const path = require("path");

router.post('/', async (req, res) => {
    const {images, tags, add} = req.body;
    const jsonOutput = {}

    images.forEach((title) => {
        const foundImage = imageJson.find((element) => element.title === title) ?? hidden.find((element) => element.title === title)
        if (add) {
            foundImage.tags = Array.from(new Set(foundImage.tags.concat(tags)))
        } else {
            foundImage.tags.filter(value => !tags.includes(value));
        }
        jsonOutput[title] = foundImage.tags;
    })

    fs.writeFile(path.resolve(__dirname, 'images.json'), JSON.stringify(imageJson, null, 2), (err1) => {
        console.log(err1)
    });

    fs.writeFile(path.resolve(__dirname, 'hidden.json'), JSON.stringify(hidden, null, 2), (err1) => {
        console.log(err1)
    });

    res.json(jsonOutput)
});

module.exports = router;