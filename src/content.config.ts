import {defineCollection} from "astro:content";
import images from './content/gallery/images.json'
import hiddenImages from './content/gallery/hidden.json'
import {type ImageEntry, type ImageInformation, isImageInformation, Rating} from "./util/images.ts";
import {z} from "astro/zod";

const artworks = defineCollection({
        loader: async () => {
            let parentImages = (images as ImageEntry[]).concat(hiddenImages as ImageEntry[]).filter(value => isImageInformation(value as ImageEntry)) as ImageInformation[];
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