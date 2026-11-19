import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Secara otomatis mendeteksi nama repo jika di-build di GitHub Actions,
  // atau menggunakan /AksesEmbegeh/ pada mode produksi.
  const repoName = process.env.GITHUB_REPOSITORY
    ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`
    : '/AksesEmbegeh/';

  return {
    base: mode === 'production' ? (process.env.VITE_BASE_URL || repoName) : '/',
    plugins: [react()],
    server: {
      watch: {
        usePolling: true,
        interval: 1000,
        ignored: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg', '**/gambar/**', '**/dist/**', '**/.git/**']
      },
      proxy: {
        // Proxy untuk n8n lokal (http://localhost:5678)
        // Mencegah isu CORS dan resolusi IPv4/IPv6 localhost di browser
        '/n8n-local': {
          target: 'http://127.0.0.1:5678',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/n8n-local/, ''),
          secure: false,
        }
      }
    }
  };
});
