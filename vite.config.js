import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// 독립 레포: 차시 MD는 저장소 루트의 materials/
const infoCourseRoot = path.resolve(__dirname, 'materials');

// https://vitejs.dev/config/
export default defineConfig({
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
