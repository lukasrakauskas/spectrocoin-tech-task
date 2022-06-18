import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    cors: false,
    proxy: {
      '^/scapi/.*': {
        target: 'https://spectrocoin.com',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});
