// @ts-check
import { defineConfig } from 'astro/config';

import db from '@astrojs/db';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.hensing1.website',
  compressHTML: false,
  integrations: [db()]
});