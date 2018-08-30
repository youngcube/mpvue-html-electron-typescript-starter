'use strict'
const path = require('path')
const webpack = require('webpack')
const utils = require('../build_common/utils')
const config = require('../config/config.wechat')
const vueLoaderConfig = require('../build_common/vue-loader.conf')
const MpvuePlugin = require('webpack-mpvue-asset-plugin')
const glob = require('glob')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const relative = require('relative')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const commonWebpackConfig = require('../build_common/webpack.common.base.conf')
const platform = (process.env.PLATFORM === 'wechat') ? 'wechat' : 'web'

function getEntry(rootSrc, gb = '/pages/**/main.ts') {
  var map = {}
  glob.sync(rootSrc + gb)
    .forEach(file => {
      var key = relative(rootSrc, file).replace('.ts', '')
      map[key] = file
    })
  return map
}

function getAppJsonEntry(rootSrc) {
  var pages = []
  glob.sync(rootSrc + '/pages/**/main.ts')
    .forEach(file => {
      var key = relative(rootSrc, file).replace('.ts', '')
      if (process.platform === 'win32') {
        key = key.replace(/\\/g, '/')
      }
      // 只有index是首页
      if (key.includes('index')) {
        pages.unshift(key)
      } else {
        pages.push(key)
      }
    })
  return JSON.stringify(pages)
}

const appEntry = {
  app: utils.resolve('./src/main.ts'),
}
const pagesEntry = getEntry(utils.resolve('./src'))
const entry = Object.assign({}, appEntry, pagesEntry)

module.exports = merge(commonWebpackConfig, {
  entry: entry, // 如果要自定义生成的 dist 目录里面的文件路径，
  // 可以将 entry 写成 {'toPath': 'fromPath'} 的形式，
  // toPath 为相对于 dist 的路径, 例：index/demo，则生成的文件地址为 dist/index/demo.js
  target: require('mpvue-webpack-target'),
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('[name].js'),
    chunkFilename: utils.assetsPath('[id].js')
  },
  resolve: {
    alias: {
      vue: 'mpvue',
      '@': utils.resolve('src'),
      flyio: 'flyio/dist/npm/wx',
      wx: utils.resolve('src/utils/wx'),
    },
    symlinks: false,
  },
  plugins: [
    new MpvuePlugin(),
    // extract css into its own file
    new ExtractTextPlugin({
      // filename: utils.assetsPath('css/[name].[contenthash].css')
      filename: utils.assetsPath('[name].wxss')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common/vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf('node_modules') >= 0
        ) || count > 1
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common/manifest',
      chunks: ['common/vendor']
    }),
    new CopyWebpackPlugin([{
      from: '**/app.json',
      to: '',
      transform: function (content, path) {
        return content
          .toString()
          .replace('<!-- @MainTitle -->', 'mpvue-html-electron-typescript-starter')
          .replace('"<!-- @WxPages -->"', getAppJsonEntry(utils.resolve('./src')))
      },
      force: true,
    }], {
      context: 'src/'
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../static/common'),
      to: path.resolve(__dirname, '../dist-wechat/static/assets'),
      ignore: ['.*']
    }, {
      from: path.resolve(__dirname, `../static/${platform}`),
      to: path.resolve(__dirname, '../dist-wechat/static/assets'),
      ignore: ['.*']
    }]),
  ],
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'mpvue-loader',
        options: vueLoaderConfig,
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'mpvue-loader',
            options: {
              checkMPEntry: true,
            },
          },
          {
            loader: 'ts-loader',
            options: {
              appendTsxSuffixTo: [/\.vue$/],
              appendTsSuffixTo: [/\.vue$/],
            },
          },
        ],
      },
      {
        test: /\.js$/,
        include: [utils.resolve('src'), utils.resolve('test')],
        exclude: [utils.resolve('src/libs')],
        use: [
          'babel-loader',
          {
            loader: 'mpvue-loader',
            options: {
              checkMPEntry: true,
            },
          },
        ],
      },
    ],
  },
})