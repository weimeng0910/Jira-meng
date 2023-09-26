import webpack, { Configuration } from 'webpack'
import CopyWebpackPlugin from 'copy-webpack-plugin';
//一个实验性的 Webpack 插件，用于为 React 组件启用“快速刷新”（
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
//TypeScript类型检查 webpack 插件
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import WebpackDevServer from 'webpack-dev-server'
import ESLintPlugin from 'eslint-webpack-plugin';
import { merge } from 'webpack-merge' // 文件合并
//导入基础文件
import { CommonConfig } from './webpack.common'

const openBrowser = require('../util/openBrowser')

// dev环境下相关配置文件
const config: Configuration = merge(CommonConfig('development'), {
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          globOptions: {
            ignore: ['**/index.html']
          }
        }
      ]
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false
    }),

    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      exclude: 'node_modules',
      context: 'src'
    }),
    new ReactRefreshWebpackPlugin()
  ]
})
const host: string = '127.0.0.1'
const port: string = '3000'
const devserver = new WebpackDevServer({

  headers: { 'Access-Control-Allow-Origin': '*' },
  // 本地服务器配置
  hot: true, // 热更新
  setupExitSignals: true,
  // 启动GZIP压缩
  compress: true,
  host: host,
  // 设置端口号
  port: port,
  //open: true,
  historyApiFallback: true,
  //指定客户端尝试重新连接的确切次数
  //client: {
  //  reconnect: false,
  //},
}, webpack(config)
);
devserver.start().then(() => {
  // 启动界面
  openBrowser(`http://${host}:${port}`)
})
