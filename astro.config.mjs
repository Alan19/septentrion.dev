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
    // TODO Change these fields when it is out of beta
    outDir: './dist/beta',
    base: '/beta',
    site: "https://www.septentrion.dev/beta",
    trailingSlash: "never"
});