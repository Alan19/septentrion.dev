import {Request, Response} from 'express';
import sharp, {ResizeOptions, Sharp} from "sharp";
import _ from "lodash";
import AWS from "aws-sdk";
import {sha3_224} from "js-sha3";
import fs from "fs";
import path from "path";
import {AltInformation, ImageInformation} from "../image-information";

export async function uploadImage(req: Request, res: Response) {
    const file = req.file;
    const bucket = process.env.BUCKET_NAME;
    if (file && bucket) {
        const {artist, href, tags, title, published, rating, characters} = req.body;
        const sharpBuffer = sharp(file.buffer);
        const metadata = await sharpBuffer.metadata();
        const {height = 1, width = 1} = metadata;
        const snakeCaseFileName = prepareFileName(title);
        const [webpUrl, id] = await uploadFullscreenVersion(bucket, snakeCaseFileName, file.buffer);
        const src = await uploadOriginalVersion(bucket, `${snakeCaseFileName}.${file.originalname.split('.').pop()}`, file.buffer, file.mimetype);
        const thumbnailUrl = await uploadThumbnailVersion(bucket, snakeCaseFileName, file.buffer);
        const aspectRatio = width / height;
        const characterArray = characters.split(',').map((char: string) => char.trim());
        const tagArray = tags !== '' ? tags.split(',').map((tag: string) => tag.trim()) : [];
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
            id: id
        };
        addToJson(jsonOutput);
        res.json(jsonOutput);
    } else {
        res.status(422).send('No file attached!');
        return;
    }
}

function prepareFileName(title: string) {
    return encodeURIComponent(_.snakeCase(title));
}

function uploadFile(bucket: string, fileName: string, buffer: Buffer, contentType: string) {
    return new AWS.S3().upload({
        Bucket: bucket,
        Key: fileName,
        Body: buffer,
        ContentType: contentType
    }).promise();
}

/**
 * Uploads an image, and returns its URL in a promise
 * @param bucket The name of the bucket
 * @param fileName The name of the file (includes file extension)
 * @param buffer The buffer for the image to be uploaded
 * @param contentType The content type of the file to be uploaded (usually image/webp)
 */
async function uploadOriginalVersion(bucket: string, fileName: string, buffer: Buffer, contentType: string): Promise<string> {
    return uploadFile(bucket, fileName, buffer, contentType).then(value => value.Location)
}

async function compressImageBuffer(sharpImage: Sharp, resizeSettings: ResizeOptions, maxFileSize: number) {
    let fileSize;
    let compressedImageBuffer;
    let quality = 100;
    do {
        compressedImageBuffer = await sharpImage
            .resize(resizeSettings)
            .webp({quality: quality})
            .toBuffer();
        fileSize = Buffer.byteLength(compressedImageBuffer);
        // Compress to 1mb or less
        if (fileSize > maxFileSize) {
            quality -= 5;
        } else {
            break;
        }
    } while (quality > 0);
    return compressedImageBuffer;
}

function addToJson(newImageEntry: ImageInformation, isHidden = false) {
    const fileToWriteTo = isHidden ? '../hidden.json' : './imagesToUpdate.json';
    const json: (ImageInformation | AltInformation)[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, fileToWriteTo)).toString());
    json.push(newImageEntry)
    fs.writeFileSync(path.resolve(__dirname, fileToWriteTo), JSON.stringify(json, null, 2));
}

async function uploadThumbnailVersion(bucket: string, imageName: string, buffer: Buffer) {
    const result = await compressImageBuffer(sharp(buffer, {animated: true}), {width: 2160, height: 3840, withoutEnlargement: true, fit: 'inside'}, 300000);
    const value = await uploadFile(bucket, `thumbnail/${imageName}.webp`, result, 'image/webp');
    return value.Location;
}

async function uploadFullscreenVersion(bucket: string, imageName: string, buffer: Buffer): Promise<[string, string]> {
    const result = await compressImageBuffer(sharp(buffer, {animated: true}), {width: 4096, height: 4096, fit: 'inside', withoutEnlargement: true}, 1000000);
    const value = await uploadFile(bucket, `webp/${imageName}.webp`, result, 'image/webp');

    return [value.Location, sha3_224(result)];
}

