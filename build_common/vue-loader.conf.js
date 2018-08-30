'use strict'
const utils = require('./utils')
const isProduction = (process.env.NODE_ENV === 'production')
const isWx = (process.env.PLATFORM === 'wechat')

module.exports = {
  loaders: Object.assign(utils.cssLoaders({
    sourceMap: !isProduction,
    extract: isWx ? true : isProduction,
  }), {
    ts: [
      'babel-loader',
      {
        loader: 'ts-loader',
        options: {
          appendTsxSuffixTo: [/\.vue$/],
          appendTsSuffixTo: [/\.vue$/]
        }
      }
    ]
  }),
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}