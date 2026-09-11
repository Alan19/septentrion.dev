import rss, {type RSSFeedItem} from '@astrojs/rss';
import {getCollection} from "astro:content";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import _ from "lodash";

dayjs.extend(utc);
dayjs.extend(timezone);

export async function GET(context: { site: any; }) {
    const artworks = await getCollection('artworks')
    const blog = await getCollection('blog')
    const artworkRSSPosts: RSSFeedItem[] = artworks.toSorted((a, b) => a.data.commissionNumber - b.data.commissionNumber).map(post => ({
        title: post.data.title,
        pubDate: dayjs.tz(post.data.published, "America/New_York").toDate(),
        link: `/gallery/artwork/${post.id}`,
        categories: post.data.tags,
        content: `Artist: ${post.data.artist}\nRating: ${_.capitalize(post.data.rating)}\nCharacter: ${post.data.characters.join(", ")}`,
        enclosure: {url: post.data.thumbnailUrl, length: 1000000, type: "image/png"}
    }));
    const blogRSSPosts: RSSFeedItem[] = blog.toSorted((a, b) => a.data.pubDate.getTime() - b.data.pubDate.getTime()).map(post => ({
        title: post.data.title,
        pubDate: post.data.pubDate,
        link: `/blog/${post.id}`,
        content: post.data.description,
        categories: post.data.tags
    }));
    return rss({
        // `<title>` field in output xml
        title: "Astral Wave Event Log",
        // `<description>` field in output xml
        description: `A stream of artwork of Alcor's OCs and Astral Wave worldbuilding updates`,
        // Pull in your project "site" from the endpoint context
        // https://docs.astro.build/en/reference/api-reference/#site
        site: context.site,
        // Array of `<item>`s in output xml
        // See "Generating items" section for examples using content collections and glob imports
        items: [...artworkRSSPosts, ...blogRSSPosts],
        // (optional) inject custom xml
        customData: `<language>en-us</language>`,
    });
}