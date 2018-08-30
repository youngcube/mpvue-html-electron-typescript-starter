'use strict'
const utils = require('../build_common/utils')
const webpack = require('webpack')
const env = require('../config/dev.env')
const merge = require('webpack-merge')
const isWx = (process.env.PLATFORM === 'wechat')
module.exports = {
  module: {
    rules: utils.styleLoaders({
      sourceMap: true,
      extract: isWx,
    })
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': merge(env)
    }),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}
