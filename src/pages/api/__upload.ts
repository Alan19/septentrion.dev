import type {APIRoute} from "astro";
import type {AltImageFormData, ParentImageFormData} from "../../components/uploader/ArtUploader.tsx";
import dotenv from "dotenv";
import {PutObjectCommand, S3} from "@aws-sdk/client-s3";
import {fromEnv} from "@aws-sdk/credential-providers";
import filenamify from "filenamify";
import type {AltInformation, ImageInformation} from "../../util/images.ts";
import sharp, {type Metadata, type ResizeOptions, type Sharp} from "sharp";
import {sha3_224} from "js-sha3";
import * as fs from "node:fs";
import _ from "lodash";
import {getCollection} from "astro:content";

dotenv.config();

export const prerender = false;
const artworks = await getCollection('artworks')
console.log(artworks)
export const s3 = new S3({
    region: process.env.REGION,
    credentials: fromEnv(),
    maxAttempts: 5
})

function getFormData(data: FormData) {
    return data.entries().reduce((previousValue, [key, value]) => {
        // Add new fields here as necessary
        return key === "file" ? {...previousValue, [key]: value} : {...previousValue, [key]: JSON.parse(<string>value)};
    }, {}) as ParentImageFormData | AltImageFormData;
}

export const POST: APIRoute = async ({request}) => {
    const data = await request.formData();
    const formValues: ParentImageFormData | AltImageFormData = getFormData(data);
    console.log(formValues)

    if (process.env.BUCKET_NAME) {
        let altNumber: number | undefined;
        if (formValues.type === 'alt') {
            altNumber = (artworks.find(value => value.data.title === formValues.title)?.data.alts.length ?? 0) + 1;
        } else {
            altNumber = undefined;
        }
        const {
            aspectRatio,
            id,
            nearLosslessUrl,
            src,
            thumbnailUrl,
            webpUrl
        } = await uploadImage(formValues.file, formValues.title, process.env.BUCKET_NAME, altNumber);
        if (formValues.type === 'alt') {
            const uploadData: AltInformation = {
                altType: formValues.altType,
                aspectRatio: aspectRatio,
                characters: formValues.characters,
                id: id,
                nearLossless: nearLosslessUrl,
                parent: formValues.title,
                rating: formValues.rating,
                src: src,
                tags: formValues.tags,
                thumbnailUrl: thumbnailUrl,
                webp: webpUrl,
                href: formValues.href,
                complexInfo: formValues.complexInfo
            }
            addToJson(uploadData, formValues.hidden)
            return new Response(
                JSON.stringify({
                    message: `Successfully uploaded alt ${altNumber} for ${formValues.title}!`,
                    output: formValues
                }),
                {status: 200}
            );
        }
        else {
            const uploadData: ImageInformation = {
                artist: formValues.artist,
                aspectRatio: aspectRatio,
                characters: formValues.characters,
                href: formValues.href,
                id: id,
                nearLossless: nearLosslessUrl,
                published: formValues.published,
                rating: formValues.rating,
                src: src,
                tags: formValues.tags,
                thumbnailUrl: thumbnailUrl,
                title: formValues.title,
                webp: webpUrl
            }
            addToJson(uploadData, formValues.hidden)
            return new Response(
                JSON.stringify({
                    message: `Successfully uploaded ${formValues.title}!`,
                    output: formValues
                }),
                {status: 200}
            );
        }
    }
    return new Response(
        JSON.stringify({message: "Bucket is undefined!"}),
        {status: 500}
    );

};

async function uploadImage(file: File, title: string, bucket: string, altNumber?: number) {
    let snakeCaseFileName = prepareFileName(title);
    if (altNumber) {
        snakeCaseFileName += `_${altNumber}`;
    }
    let sanitizedFilename = `${snakeCaseFileName}.${file.name.split('.').at(-1)}`;
    const [src, [thumbnailUrl, aspectRatio], [webpUrl, id], nearLosslessUrl] = await file.arrayBuffer()
        .then(value => Buffer.from(value))
        .then(value => Promise.all([
            uploadOriginalVersion(bucket, sanitizedFilename, value, file.type),
            uploadThumbnailVersion(bucket, snakeCaseFileName, value),
            uploadFullscreenVersion(bucket, snakeCaseFileName, value),
            uploadNearLosslessVersion(bucket, snakeCaseFileName, value)]));
    return {webpUrl, id, src, thumbnailUrl, nearLosslessUrl, aspectRatio};
}

export function prepareFileName(title: string) {
    return filenamify(_.snakeCase(title));
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
    const fileToWriteTo = isHidden ? 'src/content/gallery/hidden.json' : 'src/content/gallery/images.json';
    const json: (ImageInformation | AltInformation)[] = JSON.parse(fs.readFileSync(fileToWriteTo).toString());
    json.push(newImageEntry)
    fs.writeFileSync(fileToWriteTo, JSON.stringify(json, null, 2));
}

export async function uploadThumbnailVersion(bucket: string, imageName: string, buffer: Buffer): Promise<[string, number]> {
    const [result, quality, {height, width}] = await compressImageBuffer(sharp(buffer), {width: 2160, height: 3840, withoutEnlargement: true, fit: 'inside'}, 300000);
    console.log(getUploadMessage('thumbnail', imageName, Buffer.byteLength(result), quality, Buffer.byteLength(buffer)));
    const value = await uploadFile(bucket, `thumbnail/${imageName}.webp`, result, 'image/webp');
    const aspectRatio = width !== undefined && height !== undefined ? width / height : 1;
    return [value, aspectRatio];
}

export async function uploadFullscreenVersion(bucket: string, imageName: string, buffer: Buffer): Promise<[string, string]> {
    const [result, quality] = await compressImageBuffer(sharp(buffer, {animated: true}), {width: 4096, height: 4096, fit: 'inside', withoutEnlargement: true}, 1000000);
    console.log(getUploadMessage('lossy', imageName, Buffer.byteLength(result), quality, Buffer.byteLength(buffer)));
    const value = await uploadFile(bucket, `webp/${imageName}.webp`, result, 'image/webp');

    return [value, sha3_224(result)];
}

export async function uploadNearLosslessVersion(bucket: string, imageName: string, buffer: Buffer) {
    const result = await sharp(buffer, {animated: true})
        .resize({width: 4096, height: 4096, fit: 'inside', withoutEnlargement: true})
        .webp({quality: 50, nearLossless: true})
        .toBuffer();
    console.log(getUploadMessage('near lossless', imageName, Buffer.byteLength(result), 50, Buffer.byteLength(buffer)));
    return (await uploadFile(bucket, `near_lossless/${imageName}.webp`, result, 'image/webp'));
}

export async function uploadFile(bucket: string, fileName: string, buffer: Buffer, contentType: string) {
    try {
        const command = new PutObjectCommand({
            Bucket: bucket,
            Key: fileName,
            Body: buffer,
            ContentType: contentType
        });
        return s3.send(command).then(() => {
            const url = `https://${bucket}.s3.amazonaws.com/${encodeURI(fileName)}`;
            console.log(`Uploaded to ${url}`)
            return url;
        });
    } catch (reason) {
        console.error(`Error uploading ${fileName}`);
        throw reason;
    }
}

export async function compressImageBuffer(sharpImage: Sharp, resizeSettings: ResizeOptions, maxFileSize: number): Promise<[Buffer, number, Metadata]> {
    let fileSize;
    let compressedImageBuffer;
    let quality = 100;
    const compressedWebp = sharpImage.resize(resizeSettings);
    do {
        compressedImageBuffer = await compressedWebp.webp({quality: quality}).toBuffer({resolveWithObject: true});
        fileSize = compressedImageBuffer.info.size;
        // Compress to 1mb or less
        if (fileSize > maxFileSize) {
            quality -= 5;
        } else {
            break;
        }
    } while (quality > 0);
    return [compressedImageBuffer.data, quality, await compressedWebp.metadata()];
}

export function getUploadMessage(uploadType: string, imageName: string, resultSize: number, quality: number, originalSize: number) {
    return `Uploading ${uploadType} version of ${imageName} with quality ${quality} a size of ${(resultSize / 1000).toFixed(2)} KB (${(resultSize / originalSize * 100).toFixed(2)}%)`;
}