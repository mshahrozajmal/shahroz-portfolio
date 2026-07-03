import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// Source lives in src-app/. The production build is emitted to the repo root so
// the deployed layout and URL (mshahrozajmal.github.io/shahroz-portfolio) stay
// byte-identical. emptyOutDir:false keeps the images and backup files at root.
export default defineConfig({
  base: '/shahroz-portfolio/',
  plugins: [react()],
  build: {
    outDir: resolve(__dirname, '..'),
    emptyOutDir: false,
    assetsDir: 'assets',
  },
})
