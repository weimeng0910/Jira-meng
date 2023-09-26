/**
 * @author meng
 * @version 1.0
 * @date 2022/12/23
 * @file 检查react中重复render
 */
/// <reference types="@welldone-software/why-did-you-render" />
import React from 'react';
//引入检查render的库
//import whyDidYouRender from '@welldone-software/why-did-you-render';

//如果是开发环境下运行
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line unicorn/prefer-module
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    //这里设为true则检查所有的文件，我们设为false，因为我们清楚那个文件有过度渲染
    trackAllPureComponents: false,
  });
}
