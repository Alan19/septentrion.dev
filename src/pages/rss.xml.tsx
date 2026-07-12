import rss from '@astrojs/rss';
import {getCollection} from "astro:content";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import MarkdownIt from 'markdown-it';
import ReactDOMServer from 'react-dom/server';

const parser = new MarkdownIt();
dayjs.extend(utc);
dayjs.extend(timezone);

export async function GET(context: { site: any; }) {
    const artworks = await getCollection('artworks')
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
        items: artworks.map(post => ({
            title: post.data.title,
            pubDate: dayjs.tz(post.data.published, "America/New_York").toDate(),
            link: `/gallery/${post.id}`,
            categories: post.data.tags,
            content: ReactDOMServer.renderToString(<img src={post.data.thumbnailUrl} alt={post.data.title}/>)
        })),
        // (optional) inject custom xml
        customData: `<language>en-us</language>`,
    });
}