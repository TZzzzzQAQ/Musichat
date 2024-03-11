import React, {useEffect} from 'react';
import './Galaxy.scss'; // 确保路径正确

const Background = () => {
    useEffect(() => {
        // 动态导入 Galaxy.js 以便使用其中的逻辑
        // 确保路径正确
        import('./Galaxy.js').then((module) => {
            // 如果 Galaxy.js 中有需要立即执行的逻辑，它将在这里被执行
            // 你也可以在这里调用 Galaxy.js 导出的任何函数，例如 module.initCanvas()
        });
    }, []); // 空依赖数组表示这个 effect 只在组件挂载时运行一次

    return <canvas></canvas>;
};

export default Background;
