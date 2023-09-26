/**
 * @author meng
 * @version 1.0
 * @date 2022/11/28
 * @file 创建一个自定义hook，用于处理页面title。
 */
import { useEffect, useRef } from 'react';

export const useDocumentTitle = (title: string, keepOnUmount = true) => {
  //获取页面最初的title,useRef保存的值在整个生命周期中都不变
  const oldTitle = useRef(document.title).current;
  //组件挂载时设置页面title
  useEffect(() => {
    document.title = title;
  }, [title]);
  //组件卸载时设置title
  useEffect(() => () => {
    if (!keepOnUmount) {
      // 不加依赖项读到的oldTitle是最初的
      document.title = oldTitle;
    }
  }, [keepOnUmount, oldTitle]);
};
