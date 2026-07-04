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
    site: 'https://beta.septentrion.dev'
});