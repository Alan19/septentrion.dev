import {Request, Response} from "express";
import hidden from "./local_scripts/hidden.json";
import images from "./images.json";
import fs from "fs";
import path from "path";
import {AltInformation, ImageInformation, isImageInformation} from "../image-information";

export function batchTag(req: Request<object, object, { imagesToUpdate: string[], tags: string[], add: boolean }>, res: Response) {
    const {imagesToUpdate, tags, add} = req.body;
    const imageArray = images as (ImageInformation | AltInformation)[];
    const hiddenArray = hidden as (ImageInformation | AltInformation)[];
    const jsonOutput: Record<string, string[]> = {}

    imagesToUpdate.forEach((title: string) => {
        const publicImageInformation = imageArray.filter(value => isImageInformation(value));
        const hiddenImageInformation = hiddenArray.filter(value => isImageInformation(value));
        const foundImage = publicImageInformation.find((element) => element.title === title) ?? hiddenImageInformation.find((element) => element.title === title)
        if (foundImage) {
            if (add) {
                foundImage.tags = Array.from(new Set(foundImage.tags.concat(tags)))
            } else {
                foundImage.tags.filter(value => !tags.includes(value));
            }
            jsonOutput[title] = foundImage.tags;
        }
    })

    fs.writeFile(path.resolve(__dirname, 'images.json'), JSON.stringify(imageArray, null, 2), (err1) => {
        console.log(err1)
    });

    fs.writeFile(path.resolve(__dirname, 'hidden.json'), JSON.stringify(hiddenArray, null, 2), (err1) => {
        console.log(err1)
    });

    res.json(jsonOutput)

}