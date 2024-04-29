import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {visualizer} from 'rollup-plugin-visualizer';  // 使用具名导入

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
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        }
    }
});
