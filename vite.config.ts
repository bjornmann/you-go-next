import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Unfonts from 'unplugin-fonts/vite'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Unfonts({
      custom: {
        families: [
          {
            name: 'Unicorns',
            local:'Unicorns',
            src: './src/assets/unicorn.woff',
          }
        ],
        display: 'auto',
        preload: true,
        prefetch: false,
        injectTo: 'head-prepend',
      },
    }),
  ],
})
