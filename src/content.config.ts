import {defineCollection} from "astro:content";
import images from './content/gallery/images.json'
import {type ImageEntry, isImageInformation, Rating} from "./util/images.ts";
import {z} from "astro/zod";

const artworks = defineCollection({
        loader: async () => images.filter(value => isImageInformation(value as ImageEntry)),
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
            characters: z.array(z.string())
        })
    },
)

export const collections = {artworks}