/**
 * @author meng
 * @version 1.0
 * @date 2023/01/11
 * @file 创建一个自定义hook，用于处理只触发一次挂载。
 */
import { EffectCallback, useEffect } from 'react';

function useEffectOnce(effect: EffectCallback) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, []);
}

export default useEffectOnce;

//export const useMount = (callback: () => void) => {
//  useEffect(() => {
//    callback();
//    // todo 依赖项里加上callback会造成无限循环， 这个和useCallback以及useMemo有关
//    // eslint-disable-next-line react-hooks/exhaustive-deps
//  }, []);
//};
