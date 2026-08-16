// @ts-check
import {defineConfig, fontProviders} from 'astro/config';
import react from '@astrojs/react';
import DevOnlyRoute from "./src/integrations/devOnlyRoute.ts"

// https://astro.build/config
export default defineConfig({
    integrations: [react(), DevOnlyRoute()],
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
        objectFit: "scale-down",
        domains: ["alcorsiteartbucket.s3.amazonaws.com"],

    },
    prefetch: {
        prefetchAll: true
    },
    experimental: {
        incrementalBuild: true
    }
});