import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {visualizer} from 'rollup-plugin-visualizer';

const __dirname = path.resolve();

export default defineConfig({
    base: '/Musichat',
    plugins: [
        react(),
        visualizer({
            open: true,
            gzipSize: true,
            brotliSize: true
        })
    ],
    test: {
        globals: true,
        environment: "jsdom"
      },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        }
    }
});
