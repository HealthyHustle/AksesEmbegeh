import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
      interval: 1000,
      ignored: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg', '**/gambar/**', '**/dist/**', '**/.git/**']
    },
    proxy: {
      '/n8n-proxy': {
        target: 'https://babah123.app.n8n.cloud',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/n8n-proxy/, ''),
        secure: false,
      }
    }
  }
});
