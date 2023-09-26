/**
 * @author meng
 * @version 1.0
 * @date 2022/11/23
 * @file 存储全局用户信息
 */
import { useCallback, useContext, createContext, useMemo, ReactNode } from 'react';
import { useQueryClient } from 'react-query';

import { http } from '@/api/http';
import { FullPageErrorFallback, FullPageLoading } from '@/components/lib/lib';
import { AuthForm, UserData } from '@/types/user';
import * as authJira from '@/utils/authJiraProvider';
import { useAsync } from '@/utils/hooks/useAsync';
import useEffectOnce from '@/utils/hooks/useMount';

// 获得token
async function getUserByToken() {
    let user = null;
    const token = await authJira.getToken();
    if (token) {
        const data = await http({ url: 'me', method: 'get', token });
        user = data.user;
    }
    return user;
}

const AuthContext = createContext<
    | {
          userData: UserData | null;
          login: (from: AuthForm) => Promise<void>;
          register: (from: AuthForm) => Promise<void>;
          logout: () => Promise<void>;
      }
    | undefined
>(undefined);
// context 对象接受一个名为 displayName 的 property，类型为字符串。React DevTools 使用该字符串来确定 context 要显示的内容
AuthContext.displayName = 'AuthContext'; // "MyDisplayName.Provider" 在 DevTools 中

export const AuthProvider = (props: { children: ReactNode }) => {
    // 定义状态
    //const [userData, setUserData] = useState<UserData | null>(null);
    const {
        run,
        isLoading,
        data: userData,
        error,
        isIdle,
        isError,
        setData: setUserData
    } = useAsync<UserData | null>();
    // point free 消除user => setUserData(user)中的user参数
    // const login = (form: AuthForm) => authJira.login(form).then(user => setUserData(user));
    const queryClient = useQueryClient();
    // 登陆页面获得用户名和密吗后，传给authJira生成toke
    const login = useCallback(
        (form: AuthForm) => authJira.login(form).then(setUserData),
        [setUserData]
    );
    // 注册页面获得用户名和密吗后，传给authJira生成toke
    const register = useCallback(
        (form: AuthForm) => authJira.register(form).then(setUserData),
        [setUserData]
    );
    // 登陆退出后，传给authJira移除toke
    const logout = useCallback(
        () =>
            // eslint-disable-next-line promise/always-return
            authJira.logout().then(() => {
                setUserData(null);
                queryClient.clear();
            }),
        [queryClient, setUserData]
    );
    //加载用户token
    useEffectOnce(() => {
        run(getUserByToken())
            .then(setUserData)
            // eslint-disable-next-line @typescript-eslint/no-shadow
            .catch(error => error);
        //getUserByToken()
        //    .then(user => setUserData(user))
        //    .catch(error => {
        //        console.log(error);
        //    });
    });
    const value = useMemo(
        () => ({ userData, login, register, logout }),
        [userData, login, logout, register]
    );
    if (isIdle || isLoading) {
        return <FullPageLoading />;
    }
    if (isError) {
        return <FullPageErrorFallback error={error} />;
    }
    return (
        <AuthContext.Provider
            value={value}
            {...props}
        />
    );
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth()and <AuthContext.provider> 一起使用');
    }
    return context;
};
