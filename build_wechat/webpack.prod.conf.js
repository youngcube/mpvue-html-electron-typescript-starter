'use strict'
const config = require('../config/config.wechat')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const baseProdWebpackConfig = require('../build_common/webpack.common.prod.conf')

const webpackConfig = merge(baseWebpackConfig, baseProdWebpackConfig)

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
