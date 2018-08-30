'use strict'
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const baseDevWebpackConfig = require('../build_common/webpack.common.dev.conf')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

module.exports = merge(baseWebpackConfig, baseDevWebpackConfig, {
  devtool: '#source-map',
  plugins: [
    new FriendlyErrorsPlugin()
  ]
})
