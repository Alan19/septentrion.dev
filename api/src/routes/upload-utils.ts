import {PutObjectCommand} from "@aws-sdk/client-s3";
import {Metadata, ResizeOptions, Sharp} from "sharp";
import {s3} from "./upload";

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
    let quality = 95;
    const compressedWebp = sharpImage
        .resize(resizeSettings);
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

export function getUploadMessage(uploadType: string, imageName: string, result: Buffer<ArrayBufferLike>, quality: number) {
    return `Uploading ${uploadType} version of ${imageName} with quality ${quality} a size of ${(Buffer.byteLength(result) / 1000).toFixed(2)} KB`;
}