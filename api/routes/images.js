const express = require('express');
const router = express.Router();
let images = require('./images.json')

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
  const queryParams = req.query;
  res.send(images.filter(image => doesParameterContainTag(image, queryParams)))
});

module.exports = router;
