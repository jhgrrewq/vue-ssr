const path = require('path')
const ExtractPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

const VueServerPlugin = require('vue-server-renderer/server-plugin')

let config

config = merge(baseConfig, {
  // 这允许 webpack 以 Node 适用方式(Node-appropriate fashion)处理动态导入(dynamic import)，
  // 并且还会在编译 Vue 组件时，告知 `vue-loader` 输送面向服务器代码(server-oriented code)
  target: 'node',
  // entry 指向应用的 server-entry 文件
  entry: path.join(__dirname, '../src/server-entry.js'),
  // 对 bundle renderer 提供 source map 支持
  devtool: 'source-map',
  output: {
    // 此处告知 server bundle 使用 Node 风格导出模块(Node-style exports)
    libraryTarget: 'commonjs2',
    filename: 'server-entry.js', // 每个输出 bundle 名称
    path: path.join(__dirname, '../server-build') // 输出目录绝对地址
  },
  // 外置化应用程序依赖模块。可以使服务器构建速度更快，并生成较小的 bundle 文件
  externals: Object.keys(require('../package.json').dependencies),
  module: {
    rules: [
      {
        test: /\.scss/,
        use: ExtractPlugin.extract({
          fallback: 'vue-style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'sass-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractPlugin('styles.[contentHash:8].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    // 这是将服务器的整个输出
    // 构建为单个 JSON 文件的插件
    // 默认文件名为 `vue-ssr-server-bundle.json`
    new VueServerPlugin()
    // 可指定 filename
    // new VueServerPlugin({
    //   filename: 'xxxx'
    // })
  ]
})

module.exports = config
