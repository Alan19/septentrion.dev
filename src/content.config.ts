import {defineCollection, getCollection} from "astro:content";
import {ArtworkLoader} from "./loaders/artworkLoader.ts";
import {z} from "astro/zod";
import {Rating} from "./util/images.ts";

const altSchema = z.object({
    id: z.string(),
    tags: z.array(z.string()),
    href: z.string().optional(),
    rating: z.enum(Rating),
    thumbnailUrl: z.url(),
    nearLossless: z.string(),
    webp: z.url(),
    aspectRatio: z.number(),
    characters: z.array(z.string()),
    parent: z.string(),
    altType: z.union([z.enum(["extra", "cropped", "recolor"]), z.object({altNumber: z.nullish(z.number()), pageNumber: z.nullish(z.number())})])
})

const parentSchema = z.object({
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
    commissionNumber: z.number(),
    alts: z.array(altSchema)
});

const artworks = defineCollection({
    loader: ArtworkLoader(),
    schema: parentSchema
})


export const collections = {artworks}