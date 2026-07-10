// @ts-check
import {defineConfig, fontProviders} from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
    integrations: [react()],
    fonts: [
        {
            provider: fontProviders.fontsource(),
            name: "Outfit",
            cssVariable: "--font-body",
        }],
    site: "https://www.septentrion.dev",
    // TODO Switch to always trailing slash later
    trailingSlash: "never",
    image: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'alcorsiteartbucket.s3.amazonaws.com'
            }
        ],
        objectFit: "contain"
    },
    prefetch: {
        prefetchAll: true
    }
});