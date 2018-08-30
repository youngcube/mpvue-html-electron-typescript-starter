'use strict'
const merge = require('webpack-merge')
const baseWebWebpackConfig = require('../build_web/webpack.base.conf')
module.exports = merge(baseWebWebpackConfig, {
  devtool: '#cheap-module-eval-source-map',
  target: 'electron-renderer'
})
