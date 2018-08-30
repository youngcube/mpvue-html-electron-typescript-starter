'use strict'
const path = require('path')
module.exports = {
  build: {
    index: path.resolve(__dirname, '../dist-wechat/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist-wechat'),
    assetsSubDirectory: '',
    assetsPublicPath: '/',
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    assetsSubDirectory: '',
    assetsPublicPath: '/',
  }
}