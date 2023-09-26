# Webpack：TypeScript + Jest + Sass + ESLint

#🌈 🚀 React18 Hook + typescript4 + Jest 🚀

# 前言

从零配置基于 webpack5.74.0 搭建 React 应用模板，方便快速的进行开发，React（React Hook + React-router + Axios ）ESLint 等项目开发规范等。

# 技术栈

涉及的技术栈均采用当前最新的版本和语法：

-   使用 Webpack5.7.1 构建项目（不使用 create-react-app、umi 等脚手架）；
-   使用 Babel8 配置转换 ES6、React、Mobx 等语法；
-   使用 TypeScript 进行严格类型检查；
-   使用 ESLint 代码规范校验，Prettier stylelint 代码自动格式化工具，EditorConfig 代码风格统一工具
-   React 版本 V18.0.0，全部采用函数化 Hooks 特性开发项目组件；l
-   采用 React-router6 工具 配置项目路由；
-   采用 Redux + Hooks 和 URl 实现项目数据状态管理；
-   封装 Axios 库实现与后台 http 请求交互；

## 目录结构

```
├── config                   // webpack配置
│   ├── webpack.common.js   // webpack通用配置
│   ├── webpack.dev.js      // webpack开发环境配置
│   └── webpack.prod.js     // webpack生产环境配置
│   └── paths.js            // webpack路径配置
├── dist                    // 打包输出目录
├── public                  // 项目公开目录
├── text                    // 测试目录
├── src                     // src开发目录
│   ├── assets              // svg图片
│   ├── _tests_             // Jest测试
│   ├── mocks               // server，Jwt
│   ├── components          // 公共组件
│   │    ├── lib            // Emotion配制的CSS样式组件
│   ├── routers             // 项目路由配置
│   ├── views               // 具体业务页面
│   ├── context             // 全局用户信息
│   ├── types               // 全局公共类型定义
│   ├── utils               // 工具库/通用函数
│   ├── typings.d.ts        // css modules 类型声明文件
│   ├── index.html          // 入口html页面
│   └── index.tsx           // 项目入口文件
├── .babel.config.js         // babel配置,依赖什么样的插件
├── .browserslistrc         // 浏览器过滤规则配置,babel依赖这个文件，同样css也依赖
├── .editorconfig            // 项目格式配置
├── .eslintrc.json          // ESLint配置
├── .eslintignore           // ESLint配置屏蔽不需要检测的文件或目录
├── .prettierrc.js          // Prettier 代码自动格式化配置
├── .prettierignore         // Prettier 代码自动格式化配置屏蔽不必要的文件
├── .editorconfig            // EditorConfig 代码风格统一配置
├── .jest.config.js          // jest代码测试配置
├── .stylelintrc.js         // stylelint是CSS 规范校验工具配置
├── .gitignore              // git 忽略配置
├── .postcssrc.js           // postcss配置,依赖什么样的插件
├── tsconfig.json            // typescript配置
├── package.json            // 依赖包配置
└── README.md               // 项目说明


```

### 本地 node 服务器

### 配制 json-serve

优点：
1、配制简单,json-server 可以瞬间起动 REST API Server 2.增删改查真实模拟

缺点：与接口管理工具相比，无法随后端 API 的修改而自动修改

```

yarn add json-server

```

## 使用 dotenv 加载.env---全局环境变量

```

yarn add -D dotenv-webpack

```

dotenv 是一个零依赖模块，它将环境变量从 .env 文件加载到 process.env 中。dotenv 提供许多的方法，最常用的是 dotenv.config()。
最常用的是配制.env 文件，可以配制上线所需要的 API 接口的 URL,凡是在 .env 设置的全局变量，一律都是使用 process.env.XXX 將其读取，這邊唯一要注意的是 .env 设置的全局变量都是属于字符串，在某些情況下我们得自己处理转型的问題。

一、 .env 文件说明

.env --- 全局默认配置文件，在所有的环境中被载入

.env.development --- 指定开发环境的配置文件

.env.production --- 指定生产环境的配置文件，当 build 运行会触发此文件

二、在根目录下建立两个文件，我们在这里只建立.env 和.env.development 两个文件

```
 webpack-demo/
 │
+└─── .env
+└─── env.development

```

先在.env 文件中声明环境变量，然后无论你想在哪里使用变量 .env 都可用下面的方式

```
process.env.REACT_APP_YOURVARIABLE
```

全局默认配置文件，无论什么环境都会加载合并,我们在这里设置上线运行时的 URl 地址

```
REACT_APP_API_URL=online.com

```

在.env.development 文件中设置开发时的 URl 地址，参考如下

```
REACT_APP_API_URL=http://localhost:5000

```

三.将全局变量文件在 github 中隐藏

目前，我们只是将全局变量的 API 请求地址写到.env 文件内，为了达到隐藏目的，可将其新增至.gitignore 内，这样可以避免 GitHub 内存在任何型态的全局变量

```
.env
.env.development

```

四、dotenv-webpack 可传参选项
可参考 dotenv-webpack Options 可传参列表，以下为常用参数配置：
path: String
配置全局变理位置，默认为./.env

systemvars:Boolean
充许加载所有系统变量

在 webpack.common.js，内容如下

```
const Dotenv = require("dotenv-webpack");

module.exports = {
  plugins: [
    new Dotenv({
      path:
        process.env.NODE_ENV === "development"
          ? "./.env.development"
          : "./.env.production",
      systemvars: true, // 允許讀取 process.env 下的任意系統變量
    }),
  ],
};
```

### 为项目添加 UI 库-Antd

安装 Antd 依赖

```
yarn add antd
```

### 前后端分离之 JWT+Mock Service Worker

#### Mock Service Worker 进行 mock 数据

```
yarn add msw
```

### React 中 css-in-js Emotion 安装和使用

1.安装

```
yarn add @emotion/react @emotion/styled
```

2.安装插件
vscode 安装插件，vscode-styled-components 3.使用 css 道具
emotion 提供一个 css 可以接受嵌套选择器和媒体查询的道具。它可以支持对象或标记的模板文字。

在代码编辑器中打开 App.js 文件并修改它以将<div>s 与 cssprop 一起使用

/\*_ @jsxImportSource @emotion/react _/加上这个注释才可以在 div 中用 css 属性

```
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

function App() {
  return (
    <div>
      <div css={css({
        margin: 10,
        padding: 10,
        backgroundColor: '#eee',
      })}>
        This is an example of <code>`css`</code> using an object.
      </div>
      <div css={css`
        margin: 10px;
        padding: 10px;
        background-color: #eee;
      `}>
        This is an example of <code>`css`</code> using a tagged template literal.
      </div>
    </div>
  );
}

export default App;
```

### React 项目中 webpack 加载 svg

1.使用 SVG 作为组件

```
yarn add  new-url-loader -D
yarn add -D @svgr/webpack
```

3.安装 VSCode Extension: SVG Gallery

#### 安装 Day.js 处理时间

Day.js 是一个轻量的处理时间和日期的 JavaScript 库，和 Moment.js 的 API 设计保持完全一样。

```
yarn add dayjs
```

#### 安装 jwt-decode

```
yarn add jwt-decode
```

代码示例

```
// ES6
import jwt_decode from "jwt-decode";
decoded = jwt_decode(token)
console.log(decoded);
// { name: 'Tom', age: 23, iat: 1584088910, exp: 1584096110 }
```

#### 安装 react-helmet

文档头部的所有更改,这个包可以在 React 中更改头部

```
yarn add react-helmet

```

#### 安装 react-router,react-router-dom

说明：react-router 已经更新到 6.4,但因为项目中只用来做纯粹的路由组件，所以使用 6.3.0

```
yarn add react-router@6.3.0 react-router-dom@6.3.0

```

### 使用 Why Did You Render 调试 React 性能问题

当我们启用了 why render 插件开发的时候，如果组件里有不必要的 re-render 问题时，控制台里会有相关的信息提示（不管是页面加载的时候还是交互的时候都可能会有提示）

```
yarn add --dev @welldone-software/why-did-you-render
```

### 使用 React-query 使 React 应用程序中的获取、缓存、同步和更新服务器状态变得轻而易举

```
yarn add react-query
```

### 使用 React-beautiful-dnd 来对看板和任务组件拖拽

```
yarn add react-beautiful-dnd
yarn add @typescript/react-beautiful-dnd -D
```

### 使用 React Testing Library 和 Jest 完成单元测试

```
yarn add mws -D
yarn add @testing-library/react-hooks -D
yarn add @testing-library/jest-dom @testing-library/react @testing-library/user-event @types/testing-library__jest-dom -D
yarn add babel-jest @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript -D
yarn add @testing-library/user-event -D
yarn add identity-obj-proxy -D

```
