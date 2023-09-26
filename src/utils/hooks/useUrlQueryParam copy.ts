/**
 * @author meng
 * @version 1.0
 * @date 2022/12/23
 * @file 自定义hook，返回页面url中，指定键的参数值
 * @note 获取Url中的参数并返回一个对象，例如：{name:meng,age:18}
 */
import { useMemo } from 'react';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';

import { cleanObject } from '../cleanObject';

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  /**
    * @description 返回一个数组中加工后的对象，prev:{}改成Record<string, unknown> 代表任意对象
    * @note Record的内部定义，接收两个泛型参数；Record后面的泛型就是对象键和值的类型
    * @note reduce方法在这里，先给第一个值为空对象，然后遍历数组，把获取的key和值（searchParams.get (key)）放入这个对象中返回
    * @param { keys } -- keys:string 传入数组类型为字符串
    */
  const [searchParams, setSearchParams] = useSearchParams();

  return [
    //因这这里返回的对象每次都不一样，所以要用useMemo解决依赖循环问题
    useMemo(
      () => keys.reduce(
        (prev, key) =>

          ({ ...prev, [key]: searchParams.get(key) || '' }),
        {} as { [key in K]: string }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]),
    (params: Partial<{ [key in K]: unknown }>) => {

      const o = cleanObject({
        //Object.fromEntries() 方法把键值对列表转换为一个对象
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;//默认的 URLSearchParams类型的对象

      return setSearchParams(o);
    }
    //setSearchParams
  ] as const;//as const 返回的是一个元组，这样在导入时可以像原生state一样解构时随意起变量名，例如const[xxx,setxxx]=useState()
};
