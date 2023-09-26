/**
 * @author meng
 * @version 1.0
 * @date 2022/12/5
 * Boundary 错误边界
 */
import React, { Component } from 'react';

//错误边界的实现一定要用class Component
/**
 * 错误边界目前只在 Class Component 中实现了，没有在 hooks 中实现
 *（因为Error Boundaries的实现借助了this.setState可以传递callback的特性，
 * useState无法传入回调，所以无法完全对标）
 * 如果一个 class 组件中定义了 getDerivedStateFromError() 或 componentDidCatch()
 * 这两个生命周期方法中的任意一个（或两个）时，那么它就变成一个错误边界
 */
//<any,any>这个泛型传入children，fallbackRender
//type PropsWithChildren<P = unknown> = P & { children?: ReactNode | undefined };
//PropsWithChildren相当于Object.assign
type Props = React.PropsWithChildren<{ fallbackRender: FallbackRender }>;
type FallbackRender = (props: { error: Error | null }) => React.ReactElement;
// eslint-disable-next-line react/prefer-stateless-function
export class ErrorBoundary extends Component<Props, { error: Error | null }> {
    state = { error: null };

    // 当子组件抛出异常，这里会接收到并且调用
    static getDerivedStateFromError(error: Error) {
        return { error };
    }

    render() {
        const { error } = this.state;
        const { fallbackRender, children } = this.props;
        if (error) {
            return fallbackRender({ error });
        }
        return children;
    }
}
