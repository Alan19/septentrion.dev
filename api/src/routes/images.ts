import {Request, Response} from "express";
import fs from "fs";
import path from "path";
import {AltInformation, ImageInformation} from "../images/ImageInformation";

export function getImages(_req: Request, res: Response) {
    const json: (ImageInformation | AltInformation)[] = [...JSON.parse(fs.readFileSync(path.resolve(__dirname, "../images/images.json")).toString()), ...JSON.parse(fs.readFileSync(path.resolve(__dirname, "./local_scripts/hidden.json")).toString())];
    res.json(json)
}
