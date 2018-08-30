'use strict'
const path = require('path')
const utils = require('../build_common/utils')
const config = require('../config/config.web')
const vueLoaderConfig = require('../build_common/vue-loader.conf')
const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const commonWebpackConfig = require('../build_common/webpack.common.base.conf')
const {
  VueLoaderPlugin
} = require('vue-loader')
const platform = (process.env.PLATFORM === 'wechat') ? 'wechat' : 'web'

module.exports = merge(commonWebpackConfig, {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: ['babel-polyfill', './src/main-web.ts']
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ?
      config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  resolve: {
    alias: {
      '@': utils.resolve('src'),
      vue: 'vue/dist/vue.js',
      flyio: 'flyio/dist/npm/fly',
      wx: utils.resolve('src/utils/wx'),
      //为了兼容小程序，这里不导入wx，而是导入一次vue
      '@minapp/wx': 'vue'
    },
  },
  plugins: [
    new VueLoaderPlugin(),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: true,
    }),
    // copy custom static assets
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../static/common'),
      to: 'static/assets',
      ignore: ['.*']
    }, {
      from: path.resolve(__dirname, `../static/${platform}`),
      to: 'static/assets',
      ignore: ['.*']
    }]),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      title: '动态替换标题',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
  ],
  module: {
    rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        include: [utils.resolve('src'), utils.resolve('test'), utils.resolve('node_modules/webpack-dev-server/client'), utils.resolve('node_modules/vue-echarts'), utils.resolve('node_modules/resize-detector')],
        exclude: [utils.resolve('src/libs')],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          "babel-loader",
          {
            loader: 'ts-loader',
            options: {
              appendTsxSuffixTo: [/\.vue$/],
              appendTsSuffixTo: [/\.vue$/],
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.ts$/,
        loader: 'string-replace-loader',
        options: {
          multiple: [{
              search: "import { wxp } from '@minapp/wx/wxp'",
              replace: "let wxp"
            },
            {
              search: "import store from '@/store/index'",
              replace: "let store"
            }
          ]
        },
      },
    ]
  },
})