/**
 * @author meng
 * @version 1.0
 * @date 2023/01/11
 * @file 创建一个自定义hook，用于返回组件的挂载状态，如果还没挂载或者已经卸载，返回false,反之返回true。
 */
import { useRef, useEffect } from 'react';

export const useMountedRef = () => {

  //useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）
  //返回的 ref 对象在组件的整个生命周期内保持不变。

  const isMounted = useRef(false);

  useEffect(() => {
    //挂载时返回true
    isMounted.current = true;

    return () => {
      //卸载时返回false
      isMounted.current = false;
    };
  }, []);

  return isMounted;
  // return useCallback(() => isMounted.current, []);
};
