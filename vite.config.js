import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// 독립 레포: 차시 MD는 저장소 루트의 materials/
const infoCourseRoot = path.resolve(__dirname, 'materials');

// GitHub Pages: https://sweet1203.github.io/3-2programming/
const repoBase = '/3-2programming/';

// https://vitejs.dev/config/
export default defineConfig({
  base: repoBase,
  plugins: [react()],
  resolve: {
    alias: {
      '@infoCourse': infoCourseRoot,
    },
  },
  server: {
    fs: {
      allow: [infoCourseRoot],
    },
  },
});
