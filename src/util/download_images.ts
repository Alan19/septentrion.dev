import fs from "fs-extra";
import path from "node:path";
import imagesJson from "../content/gallery/images.json" with {type: "json"};
import hiddenJson from "../content/gallery/hidden.json" with {type: "json"};
import {program} from "commander";
import _ from "lodash";
import axios from "axios";
import {sha3_224} from "js-sha3";
import {type AltInformation, type ImageInformation, isAltInformation, isImageInformation} from "./images.ts";
import {prepareFileName} from "../pages/api/__upload.ts";

export function getPublishedDate(item: ImageInformation | AltInformation, allImages: (ImageInformation | AltInformation)[]) {
    return isImageInformation(item) ? item.published : allImages
        .filter(value => isImageInformation(value))
        .find(value => value.title === item.parent)?.published ?? '1980-01-01';
}

// Setup parameters
// TODO Add validation for rating input
program.description('Downloads images that are stored on the website')
    .option('-r, --rating <rating...>', 'Filter the files to download by rating (mainstream, general, sensitive, mature)')
    .option('-m, --mode <mode>', 'The type of image to download for each image entry (near-lossless, lossy, thumbnail)', value => {
        const validModes = ['near-lossless', 'lossy', 'thumbnail'];
        if (!validModes.includes(value)) {
            throw new Error(`Invalid mode: ${value}. Valid options are: ${validModes.join(', ')}`);
        }
        return value;
    }, 'near-lossless');
program.parse();
const options = program.opts();

const ratingFilter: ('general' | 'mainstream' | 'sensitive' | 'mature')[] = options.rating ?? [];
const mode: "near-lossless" | "lossy" | "thumbnail" = options.mode;
const folderName = [...ratingFilter, _.snakeCase(mode)].join("_");
const imageBackupsDir = path.join(folderName);

// Empty and ensure folder exists
fs.ensureDirSync(imageBackupsDir);
const downloadedImages: string[] = [];

await downloadImages()
    .then(() => console.log('All images downloaded successfully'))
    .catch(err => console.error('Error in downloading image:', err))

fs.readdir(imageBackupsDir, (_err, files) => files
    .filter(value => !downloadedImages.includes(value))
    .forEach((file) => fs.unlink(path.join(imageBackupsDir, file))));

async function downloadImageEntry(item: ImageInformation | AltInformation, entriesToDownload: (ImageInformation | AltInformation)[]) {
    const published = getPublishedDate(item, entriesToDownload)
    let title: string;
    title = isImageInformation(item) ? `${item.title}` : `${item.parent}_${entriesToDownload.filter(value => isAltInformation(value) && value.parent === item.parent).indexOf(item) + 1}`;
    const {webp, thumbnailUrl, nearLossless} = item;

    const fileName = `${published}_${prepareFileName(title)}.webp`;
    const filePath = path.join(imageBackupsDir, fileName);

    let url;
    switch (mode) {
        case "near-lossless":
            url = nearLossless;
            break;
        case "lossy":
            url = webp;
            break;
        case "thumbnail":
            url = thumbnailUrl;
            break;
        default:
            url = nearLossless;
    }
    return await downloadImage(url, filePath)
        .then(() => downloadedImages.push(fileName))
        .catch(reason => console.error(`Failed to download ${url}: ${reason}`));
}

async function downloadImages() {
    const entriesToDownload = ([...imagesJson, ...hiddenJson]) as (ImageInformation | AltInformation)[];
    return Promise.all(entriesToDownload.filter(value => ratingFilter.length === 0 || ratingFilter.includes(value.rating)).map(async item => await downloadImageEntry(item, entriesToDownload)))
}

// Function to download and save an artwork, does not save the file if the hash for the existing file is the same
async function downloadImage(url: string, filePath: string) {
    return axios.get(url, {responseType: 'arraybuffer'})
        .then(async result => {
            const fileData = Buffer.from(result.data, 'binary');
            const fileBuffer = await fs.readFile(filePath).then(value => value).catch(() => undefined);
            const doHashesMatch = fileBuffer ? sha3_224(fileData) === sha3_224(fileBuffer) : false;
            if (!doHashesMatch) {
                fs.writeFileSync(filePath, fileData);
                console.log("Downloaded " + filePath);
            }
            else {
                console.log(`Hash of ${filePath} matches what is on the computer!`);
            }
        })
        .catch(err => console.error(`Failed to download ${url}: ${err}`));
}