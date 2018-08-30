'use strict'
const utils = require('../build_common/utils')
const webpack = require('webpack')
const env = require('../config/prod.env')
const merge = require('webpack-merge')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const safeParser = require('postcss-safe-parser')

module.exports = {
  module: {
    rules: utils.styleLoaders({
      sourceMap: false,
      extract: true
    })
  },
  devtool: false,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': merge(env)
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: false,
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        parser: safeParser,
        discardComments: {
          removeAll: true
        }
      }
    }),
    // keep module.id stable when vender modules does not change
    new webpack.HashedModuleIdsPlugin(),
  ],

}