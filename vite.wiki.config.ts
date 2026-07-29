import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

export default defineConfig({
  root: 'wiki',
  plugins: [react()],
  publicDir: 'public',
  build: {
    outDir: resolve(__dirname, 'dist-wiki'),
    emptyOutDir: true
  }
});
