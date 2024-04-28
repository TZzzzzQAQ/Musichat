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
            open: true,  // 打包后自动打开页面
            gzipSize: true,  // 查看 gzip 压缩大小
            brotliSize: true  // 查看 brotli 压缩大小
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        }
    }
});
