import {Request, Response} from 'express';
import sharp, {ResizeOptions, Sharp} from "sharp";
import _ from "lodash";
import AWS from "aws-sdk";
import {sha3_224} from "js-sha3";
import fs from "fs";
import path from "path";
import {AltInformation, ImageInformation} from '../images/ImageInformation';

async function getMainImageEntryFields(file: Express.Multer.File, title: string, bucket: string, characters: string, tags: string, altNumber?: number) {
    const sharpBuffer = sharp(file.buffer);
    const metadata = await sharpBuffer.metadata();
    const {height = 1, width = 1} = metadata;
    let snakeCaseFileName = prepareFileName(title);
    if (altNumber) {
        snakeCaseFileName += `_${altNumber}`;
    }
    const [src, thumbnailUrl, [webpUrl, id], nearLosslessUrl] = await Promise.all([uploadOriginalVersion(bucket, `${snakeCaseFileName}.${file.originalname.split('.').pop()}`, file.buffer, file.mimetype),
        uploadThumbnailVersion(bucket, snakeCaseFileName, file.buffer),
        uploadFullscreenVersion(bucket, snakeCaseFileName, file.buffer),
        uploadNearLosslessVersion(bucket, snakeCaseFileName, file.buffer)]);
    const aspectRatio = width / height;
    const characterArray = characters.split(',').map((char: string) => char.trim());
    const tagArray = tags !== '' ? tags.split(',').map((tag: string) => tag.trim()) : [];
    return {webpUrl, id, src, thumbnailUrl, nearLosslessUrl, aspectRatio, characterArray, tagArray};
}

export async function uploadImage(req: Request, res: Response) {
    const file = req.file;
    const bucket = process.env.BUCKET_NAME;
    if (file && bucket) {
        const {artist, href, tags, title, published, rating, characters} = req.body;
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
        // TODO Use hidden as a request parameter
        addToJson(jsonOutput, tagArray.includes("Hidden"));
        res.json(jsonOutput);
    } else {
        res.status(422).send('No file attached!');
    }
}

export async function uploadImageAlt(req: Request, res: Response) {
    const file = req.file;
    const bucket = process.env.BUCKET_NAME;
    if (file && bucket) {
        const {href, tags, imageName: parent, rating, characters, altType} = req.body;
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

        addToJson(jsonOutput, tagArray.includes("Hidden"));
        res.json(jsonOutput);
    } else {
        res.status(422).send('No file attached!');
    }
}


export function prepareFileName(title: string) {
    return encodeURIComponent(_.snakeCase(title));
}

function uploadFile(bucket: string, fileName: string, buffer: Buffer, contentType: string) {
    AWS.config.update({
        accessKeyId: process.env.ACCESS_KEY_ID, secretAccessKey: process.env.SECRET_ACCESS_KEY, region: 'us-east-1'
    });

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

async function compressImageBuffer(sharpImage: Sharp, resizeSettings: ResizeOptions, maxFileSize: number): Promise<[Buffer, number]> {
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
    return [compressedImageBuffer, quality];
}

function addToJson(newImageEntry: ImageInformation | AltInformation, isHidden = false) {
    const fileToWriteTo = isHidden ? './local_scripts/hidden.json' : '../images/images.json';
    const json: (ImageInformation | AltInformation)[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, fileToWriteTo)).toString());
    json.push(newImageEntry)
    fs.writeFileSync(path.resolve(__dirname, fileToWriteTo), JSON.stringify(json, null, 2));
}

function getUploadMessage(uploadType: string, imageName: string, result: Buffer<ArrayBufferLike>, quality?: number) {
    const qualityString = quality ? `with quality ${quality}` : '';
    return `Uploading ${uploadType} version ${imageName} ${qualityString} and a size of ${(Buffer.byteLength(result) / 1024).toFixed(2)} kb`;
}

export async function uploadThumbnailVersion(bucket: string, imageName: string, buffer: Buffer) {
    const [result, quality] = await compressImageBuffer(sharp(buffer), {width: 2160, height: 3840, withoutEnlargement: true, fit: 'inside'}, 307200);
    console.log(getUploadMessage('thumbnail', imageName, result, quality));
    const value = await uploadFile(bucket, `thumbnail/${imageName}.webp`, result, 'image/webp');
    return value.Location;
}

export async function uploadFullscreenVersion(bucket: string, imageName: string, buffer: Buffer): Promise<[string, string]> {
    const [result, quality] = await compressImageBuffer(sharp(buffer, {animated: true}), {width: 4096, height: 4096, fit: 'inside', withoutEnlargement: true}, 1048576);
    console.log(getUploadMessage('lossy', imageName, result, quality));
    const value = await uploadFile(bucket, `webp/${imageName}.webp`, result, 'image/webp');

    return [value.Location, sha3_224(result)];
}

export async function uploadNearLosslessVersion(bucket: string, imageName: string, buffer: Buffer) {
    const compressedImageBuffer = await sharp(buffer, {animated: true})
        .resize({width: 4096, height: 4096, fit: 'inside', withoutEnlargement: true})
        .webp({quality: 50, nearLossless: true})
        .toBuffer();
    console.log(getUploadMessage('near lossless', imageName, compressedImageBuffer));
    return (await uploadFile(bucket, `near_lossless/${imageName}.webp`, compressedImageBuffer, 'image/webp')).Location;
}

//TODO Add alt upload