import {Request, Response} from "express";
import {AltInformation, ImageInformation} from "../image-information";
import hidden from "./local_scripts/hidden.json"
import images from "../images/images.json"

export function getImages(_req: Request, res: Response) {
    res.json([...(hidden as (ImageInformation | AltInformation)[]), ...(images as unknown as (ImageInformation | AltInformation)[])])
}
