import { createRoot } from 'react-dom/client';

import { App } from './App';
import { AppProviders } from './context';
import { mocker } from '@/mocks/browser';

// 开发环境开启mock服务
if (process.env.NODE_ENV === 'development') {
    //const { mocker } = require('./mocks/browser');
    mocker.start({
        // 对于没有 mock 的接口直接通过，避免异常
        onUnhandledRequest: 'bypass'
    });
}
const rootElement = document.querySelector('#root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = createRoot(rootElement);

root.render(
    <AppProviders>
        <App />
    </AppProviders>
);
