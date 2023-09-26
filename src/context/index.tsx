/**
 * @author meng
 * @version 1.0
 * @date 2022/11/23
 * 存储全局用户信息
 */
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { AuthProvider } from './AuthContext';

const AppProviders = ({ children }: { children: ReactNode }) => {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>{children}</AuthProvider>
            <ReactQueryDevtools
                initialIsOpen
                position='bottom-right'
            />
        </QueryClientProvider>
    );
};

export { AppProviders };
