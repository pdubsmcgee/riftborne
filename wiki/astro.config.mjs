import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  outDir: '../dist-wiki',
  site: 'https://riftbornewiki.317society.com',
  trailingSlash: 'always',
  build: {
    format: 'directory'
  },
  integrations: [sitemap()]
});
