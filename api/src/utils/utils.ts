import {type AltInformation, type ImageInformation, isImageInformation} from "../images/ImageInformation";
import {snakeCase} from "lodash";
import filenamify from "filenamify";

export function getPublishedDate(item: ImageInformation | AltInformation, allImages: (ImageInformation | AltInformation)[]) {
    return isImageInformation(item) ? item.published : allImages
        .filter(value => isImageInformation(value))
        .find(value => value.title === item.parent)?.published ?? '1980-01-01';
}

export function prepareFileName(title: string) {
    return filenamify(snakeCase(title));
}