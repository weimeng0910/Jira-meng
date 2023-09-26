/**
 * @author meng
 * @version 1.0
 * @date 2022/11/28
 * @file 创建一个自定义hook，用于处理react 事件池。
 * @file useDebounce 的原理和防抖动函数实现的原理是一样的
 */
import { useEffect, useState } from 'react';

export const useDebounce = <T>(value: T, delay?: number): T => {
  //定义一个内部的变量用来更新value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    //每次在value值变化时都会设置一个新的定时器
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay || 500);
    //每次在上一个useEffect处理完以后再运行，清理上次定时器的任务
    return () =>
      clearTimeout(timeout);

  }, [value, delay]);

  return debouncedValue;
};
//延迟执行最后一个指令
// function debounce(fn, delay = 5000) {
//   //初始化变量
//   let timerId;
//   return function (...args) {
//     //如果timerId有值，则取消timerId，所以第一次运行时timerId是undefined,所以会返回下面的句柄
//     if (timerId) {
//       //闭包，使用外部变量
//       clearTimeout(timerId);
//     }
//     timerId = setTimeout(() => {
//       fn(...args);
//       timerId = null;
//     }, delay);
//   };
// }
// const log = debounce(() => console.log('call'));
// log();
// log();
// log();
// 思路：首次运行log()时,判断变量是否为真，此时为undefied,则把把定时器赋值给变量，第二次执行log();时，发现tiemerId是值是tiemeId1，重新设定定时器tiemeId2，第三次调用log()时，重新设置定时器为timerId3,等待指行，如果多次调用则会依次反复，当我们停止下来时，没有执行清除定时器，超过一定时间后触发回调函数。
/**
 * 注意，自定义hook一定是在他的内部需要使用别的hook，不需要别的hook就定义成函数就可以
 */
