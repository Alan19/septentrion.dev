import {Request, Response} from "express";
import {AltInformation, ImageInformation} from "../image-information";
import fs from "fs";
import path from "path";

export function getImages(_req: Request, res: Response) {
    const hidden: (ImageInformation | AltInformation)[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, './local_scripts/hidden.json'), 'utf-8'));
    const images: (ImageInformation | AltInformation)[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, './images.json'), 'utf-8'));
    const combinedImages = [...images, ...hidden];
    res.json(combinedImages)
}
