import {defineCollection} from "astro:content";
import {type ImageEntry, isImageInformation, Rating} from "./util/images.ts";
import {z} from "astro/zod";
import * as fs from "node:fs";
import path from "node:path";

const artworks = defineCollection({
        loader: async () => {
            let parentImages = fs.readdirSync('src/content/gallery/').flatMap(value => (JSON.parse(fs.readFileSync(path.join('src/content/gallery', value)).toString()) as ImageEntry[]).filter(value => isImageInformation(value)));
            return parentImages.toSorted((a, b) => a.published.localeCompare(b.published)).map((value, index) => ({...value, commissionNumber: index + 1}));
        },
        schema: z.object({
            id: z.string(),
            title: z.string(),
            artist: z.string(),
            tags: z.array(z.string()),
            href: z.string().optional(),
            published: z.iso.date(),
            rating: z.enum(Rating),
            thumbnailUrl: z.url(),
            nearLossless: z.string(),
            webp: z.url(),
            aspectRatio: z.number(),
            characters: z.array(z.string()),
            commissionNumber: z.number()
        })
    },
)

export const collections = {artworks}