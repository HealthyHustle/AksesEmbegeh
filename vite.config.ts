import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Secara otomatis mendeteksi nama repo jika di-build di GitHub Actions,
  // atau menggunakan /AksesEmbegeh/ pada mode produksi.
  const repoName = process.env.GITHUB_REPOSITORY
    ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`
    : '/AksesEmbegeh/';

  return {
    base: mode === 'production' ? (process.env.VITE_BASE_URL || repoName) : '/',
    plugins: [
      react(),
      {
        name: 'dev-rewrite',
        configureServer(server) {
          server.middlewares.use((req, _res, next) => {
            if (req.url === '/' || req.url === '/index.html') {
              req.url = '/index.source.html';
            }
            next();
          });
        }
      },
      {
        name: 'post-build-sync',
        closeBundle() {
          // Sinkronisasi otomatis bundle produksi ke root repository
          // Memastikan GitHub Pages bekerja 100% baik pada branch main maupun gh-pages
          const distSourceHtml = path.resolve('dist/index.source.html');
          const distIndexHtml = path.resolve('dist/index.html');
          const finalDistHtml = fs.existsSync(distSourceHtml) ? distSourceHtml : distIndexHtml;

          if (fs.existsSync(finalDistHtml)) {
            const htmlContent = fs.readFileSync(finalDistHtml, 'utf-8');
            fs.writeFileSync(path.resolve('index.html'), htmlContent);
            fs.writeFileSync(path.resolve('404.html'), htmlContent);
            fs.writeFileSync(distIndexHtml, htmlContent);
            fs.writeFileSync(path.resolve('dist/404.html'), htmlContent);
          }

          const distAssets = path.resolve('dist/assets');
          const rootAssets = path.resolve('assets');
          if (fs.existsSync(distAssets)) {
            if (!fs.existsSync(rootAssets)) fs.mkdirSync(rootAssets, { recursive: true });
            const files = fs.readdirSync(distAssets);
            for (const file of files) {
              fs.copyFileSync(path.join(distAssets, file), path.join(rootAssets, file));
            }
          }

          if (fs.existsSync(path.resolve('public/.nojekyll'))) {
            fs.copyFileSync(path.resolve('public/.nojekyll'), path.resolve('.nojekyll'));
            fs.copyFileSync(path.resolve('public/.nojekyll'), path.resolve('dist/.nojekyll'));
          }
        }
      }
    ],
    build: {
      rollupOptions: {
        input: './index.source.html'
      }
    },
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
