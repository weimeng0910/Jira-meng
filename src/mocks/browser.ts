/* browser: 使用handlers中的API代码，初始化配置 Service Worker */
import { setupWorker } from 'msw';

import { handlers } from './handlers';

// This configures a Service Worker with the given request handlers.
export const mocker = setupWorker(...handlers);
