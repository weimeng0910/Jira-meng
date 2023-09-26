/**
 * @author meng
 * @version 1.0
 * @date 2022/11/28
 * @file 创建一个自定义hook，用于处理所有异步数据获取和更新状态。
 * @file 防止组件乱七八糟地使用useState调用以跟踪异步函数的状态
 */
import { useState, useCallback, useReducer } from 'react';

import { useMountedRef } from './useMountedRef';

/**
 * @type 定义一个类型，返回的值可能是 value error status status prop 是：“idle”，“pending”，“success”，“error”。
 */

interface State<T> {
  error: Error | null;
  data: T | null;
  //代表四个状态，异步未发生，加载，错误，成功
  stat: 'idle' | 'loading' | 'error' | 'success'
}

/**
 * @state 定义一个初始默认状态，异步还未发生时的状态
 */

const defaultInitialState: State<null> = {
  stat: 'idle',
  data: null,
  error: null
};

/**
 * @config 定义一个异常的初始值，抛出异常成为可选，error的配置
 */

const defaultInitConfig = {
  throwOnError: false,
};

/**
 * @function 抽像useSafeDispatch,传入dispatch，判读组件是否挂载时使用dispatch
 */
//
const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();
  return useCallback(
    //在现代 JavaScript 中避免 void 0,要用undefined来删除不必要的void 0
    (...args: T[]) => (mountedRef.current ? dispatch(...args) : undefined),
    [mountedRef, dispatch]
  );
};

/**
 * @hook 加载异步的自定义hook，useAsync
 *
 */

export const useAsync = <T>(
  initialState?: State<T>,//initialState是传入的state，优先级高于默认的状态
  initialConifg?: typeof defaultInitConfig//传入的异常状态
) => {
  const config = { ...defaultInitConfig, ...initialConifg };
  //定义reducer
  const asyncReducer = (state: State<T>, action: Partial<State<T>>) => ({
    ...state,
    ...action
  });
  //使用useReducer来接收处理数据的asyncReducer和初始的数据
  const [state, dispatch] = useReducer(asyncReducer, {

    ...defaultInitialState,

    ...initialState
  });
  //使用抽像的dipatch
  const safeDispatch = useSafeDispatch(dispatch);

  //定义retry的状态,useState直接传入函数的含义是：惰性初始化；要用state保存函数，不能直接传入函数
  const [retry, setRetry] = useState(() => () => { });

  //定义设置数据的方法，调用这个方法时候，说明请求成功，返回数据data
  const setData = useCallback((data: T) => safeDispatch({
    data,
    stat: 'success',
    error: null
  }), [safeDispatch]);
  //设置错误的方法，请求完成后发生错误，调用这个方法
  const setError = useCallback((error: Error) => safeDispatch({
    error,
    stat: 'error',
    data: null

  }), [safeDispatch]);
  //run 用来触发异步请求的方法，设置hook的消费者传入的异步
  const run = useCallback(async (promise: Promise<T>, runConfig?: { retry: () => Promise<T> }) => {
    //如果没有传入promise或者没有then，就表示传入的不是异步函数
    if (!promise || !promise.then) {
      throw new Error('请传入promise类型数据');
    }
    //设置retry状态
    setRetry(() => () => {
      if (runConfig?.retry) {
        run(runConfig?.retry(), runConfig);
      }
    });

    safeDispatch({ stat: 'loading' });
    return promise
      .then(data => {
        //如果页面挂载则设置数据
        setData(data);
        return data;
      })
      // catch 会消化异常导致不再抛出，如果不主动抛出，外面是接收不到异常的
      .catch(error => {
        setError(error);

        if (config.throwOnError)
          // eslint-disable-next-line promise/no-return-wrap, unicorn/no-useless-promise-resolve-reject
          return Promise.reject(error);
        return error;
      });
  }, [config.throwOnError, setData, setError, safeDispatch]);

  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    run,
    setData,
    setError,
    //retry被调用时，重新运行run函数，让state被刷新，重新驱动页面刷新
    retry,
    ...state
  };
};
