/* eslint-disable @typescript-eslint/no-var-requires */
import webpack, { Configuration, BannerPlugin, LoaderOptionsPlugin } from 'webpack';
import { merge } from 'webpack-merge';// 文件合并
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import CompressionWebpackPlugin from 'compression-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'

//导入基础文件
import { CommonConfig } from './webpack.common'

const config: Configuration = merge(CommonConfig('production'), {
  plugins: [
    new CleanWebpackPlugin(),
    new CompressionWebpackPlugin(),
    new LoaderOptionsPlugin({
      minimize: true
    }),
    new BannerPlugin('版权所有，翻版必究'),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public",
          globOptions: {
            ignore: ["**/index.html"],
          },
        },
      ],
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: {
      name: 'mainifels'
    },
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin()
    ]
  },
  performance: {
    hints: false,
    maxAssetSize: 4000000, // 整数类型（以字节为单位）
    maxEntrypointSize: 5000000 // 整数类型（以字节为单位）
  }

})

webpack(config, (err: any, state: any) => {
  if (err) {
    console.log(err.stack || err)
  } else if (state.hasErrors()) {
    let err = ''
    state.toString({
      chunks: false,
      colors: true
    }).split(/\r?\n/).forEach((line: any) => {
      err += `    ${line}\n`
    })
    console.warn(err)
  } else {
    console.log(state.toString({
      chunks: false,
      colors: true
    }))
  }
})

