const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require("path");

//TODO Refresh images every time it opens
function doesParameterContainTag(image, queryParams) {
  const enabledTags = Object.keys(queryParams).filter(value => queryParams[value] === "1");
  const hiddenTags = Object.keys(queryParams).filter(value => queryParams[value] === "-1");
  const hasFilterTag = enabledTags.some(
    (tag) => image.tags?.includes(tag) ?? false
  );
  const hasHiddenTag = hiddenTags.some(
    (tag) => image.tags?.includes(tag) ?? false
  );
  if (enabledTags.length === 0) {
    return !hasHiddenTag;
  } else {
    return hasFilterTag && !hasHiddenTag;
  }
}

/* GET home page. */
router.get('/', function (req, res, next) {
  const hidden = JSON.parse(fs.readFileSync(path.resolve(__dirname, './hidden.json'), 'utf-8'));
  let images = JSON.parse(fs.readFileSync(path.resolve(__dirname, './images.json'), 'utf-8'));
  const combinedImages = [...images, ...hidden];
    res.send(combinedImages)
});

module.exports = router;
