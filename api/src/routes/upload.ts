import {Request, Response} from 'express';
import sharp from "sharp";
import {S3} from '@aws-sdk/client-s3';
import {sha3_224} from "js-sha3";
import fs from "fs";
import path from "path";
import {AltInformation, ImageInformation} from '../images/ImageInformation';
import {prepareFileName} from "../utils/utils";
import {fromEnv} from "@aws-sdk/credential-providers";
import dotenv from "dotenv";
import {compressImageBuffer, getUploadMessage, uploadFile} from "./upload-utils";

dotenv.config({path: path.resolve(__dirname, '../../.env')});

export const s3 = new S3({
    region: process.env.REGION,
    credentials: fromEnv(),
    maxAttempts: 5
})

async function getMainImageEntryFields(file: Express.Multer.File, title: string, bucket: string, characters: string, tags: string, altNumber?: number) {
    let snakeCaseFileName = prepareFileName(title);
    if (altNumber) {
        snakeCaseFileName += `_${altNumber}`;
    }
    const [src, [thumbnailUrl, aspectRatio], [webpUrl, id], nearLosslessUrl] = await Promise.all([
        uploadOriginalVersion(bucket, `${snakeCaseFileName}.${file.originalname.split('.').pop()}`, file.buffer, file.mimetype),
        uploadThumbnailVersion(bucket, snakeCaseFileName, file.buffer),
        uploadFullscreenVersion(bucket, snakeCaseFileName, file.buffer),
        uploadNearLosslessVersion(bucket, snakeCaseFileName, file.buffer)]);
    const characterArray = characters.split(',').map((char: string) => char.trim());
    const tagArray = tags !== '' ? tags.split(',').map((tag: string) => tag.trim()) : [];
    return {webpUrl, id, src, thumbnailUrl, nearLosslessUrl, aspectRatio, characterArray, tagArray};
}

export async function uploadImage(req: Request, res: Response) {
    const file = req.file;
    const bucket = process.env.BUCKET_NAME;
    if (file && bucket) {
        const {artist, href, tags, title, published, rating, characters, isHidden} = req.body;
        const {webpUrl, id, src, thumbnailUrl, nearLosslessUrl, aspectRatio, characterArray, tagArray} = await getMainImageEntryFields(file, title, bucket, characters, tags);
        const jsonOutput: ImageInformation = {
            title: title,
            artist: artist,
            tags: tagArray,
            href: href,
            published: published,
            aspectRatio: aspectRatio,
            rating: rating,
            characters: characterArray,
            src: src,
            thumbnailUrl: thumbnailUrl,
            webp: webpUrl,
            id: id,
            nearLossless: nearLosslessUrl
        };
        addToJson(jsonOutput, JSON.parse(isHidden));
        res.json(jsonOutput);
    } else {
        res.status(422).send('No file attached!');
    }
}

export async function uploadImageAlt(req: Request, res: Response) {
    const file = req.file;
    const bucket = process.env.BUCKET_NAME;
    if (file && bucket) {
        const {href, tags, imageName: parent, rating, characters, altType, isHidden} = req.body;
        const altNumber = [...JSON.parse(fs.readFileSync(path.resolve(__dirname, '../images/images.json')).toString()), ...JSON.parse(fs.readFileSync(path.resolve(__dirname, './local_scripts/hidden.json')).toString())].filter(value => value.parent === parent).length + 1;
        const {webpUrl, id, src, thumbnailUrl, nearLosslessUrl, aspectRatio, characterArray, tagArray} = await getMainImageEntryFields(file, parent, bucket, characters, tags, altNumber);
        const jsonOutput: AltInformation = {
            tags: tagArray,
            href: href,
            aspectRatio: aspectRatio,
            parent: parent,
            rating: rating,
            characters: characterArray,
            altType: ["cropped", "extra", "recolor"].includes(altType) ? altType : JSON.parse(altType),
            src: src,
            nearLossless: nearLosslessUrl,
            id: id,
            thumbnailUrl: thumbnailUrl,
            webp: webpUrl,
        };

        addToJson(jsonOutput, JSON.parse(isHidden));
        res.json(jsonOutput);
    } else {
        res.status(422).send('No file attached!');
    }
}

/**
 * Uploads an image, and returns its URL in a promise
 * @param bucket The name of the bucket
 * @param fileName The name of the file (includes file extension)
 * @param buffer The buffer for the image to be uploaded
 * @param contentType The content type of the file to be uploaded (usually image/webp)
 */
async function uploadOriginalVersion(bucket: string, fileName: string, buffer: Buffer, contentType: string): Promise<string> {
    return uploadFile(bucket, fileName, buffer, contentType).then(value => value)
}

function addToJson(newImageEntry: ImageInformation | AltInformation, isHidden = false) {
    const fileToWriteTo = isHidden ? './local_scripts/hidden.json' : '../images/images.json';
    const json: (ImageInformation | AltInformation)[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, fileToWriteTo)).toString());
    json.push(newImageEntry)
    fs.writeFileSync(path.resolve(__dirname, fileToWriteTo), JSON.stringify(json, null, 2));
}

export async function uploadThumbnailVersion(bucket: string, imageName: string, buffer: Buffer): Promise<[string, number]> {
    const [result, quality, {height, width}] = await compressImageBuffer(sharp(buffer), {width: 2160, height: 3840, withoutEnlargement: true, fit: 'inside'}, 300000);
    console.log(getUploadMessage('thumbnail', imageName, result, quality));
    const value = await uploadFile(bucket, `thumbnail/${imageName}.webp`, result, 'image/webp');
    const aspectRatio = width !== undefined && height !== undefined ? width / height : 1;
    return [value, aspectRatio];
}

export async function uploadFullscreenVersion(bucket: string, imageName: string, buffer: Buffer): Promise<[string, string]> {
    const [result, quality] = await compressImageBuffer(sharp(buffer, {animated: true}), {width: 4096, height: 4096, fit: 'inside', withoutEnlargement: true}, 1000000);
    console.log(getUploadMessage('lossy', imageName, result, quality));
    const value = await uploadFile(bucket, `webp/${imageName}.webp`, result, 'image/webp');

    return [value, sha3_224(result)];
}

export async function uploadNearLosslessVersion(bucket: string, imageName: string, buffer: Buffer) {
    const compressedImageBuffer = await sharp(buffer, {animated: true})
        .resize({width: 4096, height: 4096, fit: 'inside', withoutEnlargement: true})
        .webp({quality: 50, nearLossless: true})
        .toBuffer();
    console.log(getUploadMessage('near lossless', imageName, compressedImageBuffer, 50));
    return (await uploadFile(bucket, `near_lossless/${imageName}.webp`, compressedImageBuffer, 'image/webp'));
}