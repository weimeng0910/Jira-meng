import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

import { cleanObject } from '../cleanObject';

/**
 * 通过这个hook来set search param
 * 把输入框的内容映射到url地址上
 * 封装的 custom hook 来手动的更改当前的 url，从而实现了 url 与数据与页面相匹配
 */
export const useSetUrlSearchParam = () => {

  //useSearchParams 这个 hook ，它返回一个 searchParams 和 setSearchParams，从用法上来看有点像 useState
  const [searchParams, setSearchParam] = useSearchParams();
  //params 的类型是一个对象 {} ，它的 : 左侧也就是 key 被指定为 string ，右侧 unknown 指定 value 的类型
  return (params: { [key in string]: unknown }) => {
    const o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit;
    return setSearchParam(o);
  };
};

/**
 * 返回页面 url 中的 query ，同时利用 useSetUrlSearchParam 返回的方法来设置 url
 * 接收一个 keys 的数组，也就是 query 中的键名的数组，返回一个数组，
 * 第一个元素是一个对象保存着 key-value ，第二个元素是一个方法，也就是修改 url 的方法
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  //定义实用的方法来处理URL的查询字符串
  const [searchParams] = useSearchParams();
  //用自定义的方法来设置url中的参数
  const setSearchParams = useSetUrlSearchParam();
  //const [stateKeys] = useState(keys);
  //return [
  //  useMemo(
  //    () =>
  //      subset(Object.fromEntries(searchParams), stateKeys) as {
  //        [key in K]: string;
  //      },
  //    [searchParams, stateKeys]
  //  ),
  //  (params: Partial<{ [key in K]: unknown }>) => setSearchParams(params),
  //] as const;
  return [
    useMemo(
      () => keys.reduce((prev, key) => ({ ...prev, [key]: searchParams.get(key) || '' }), {} as { [key in K]: string }),
      [keys, searchParams]
    ),
    (params: Partial<{ [key in K]: unknown }>) => setSearchParams(params)
  ] as const;
};


