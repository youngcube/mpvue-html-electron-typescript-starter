'use strict'
const utils = require('../build_common/utils')
const webpack = require('webpack')
const config = require('../config/config.web')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const baseDevWebpackConfig = require('../build_common/webpack.common.dev.conf')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = 'localhost'
const PORT = 3000

const devWebpackConfig = merge(baseWebpackConfig, baseDevWebpackConfig, {
  // cheap-module-eval-source-map is faster for development
  devtool: 'cheap-module-eval-source-map',

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [{
        from: /.*/,
        to: path.posix.join(config.dev.assetsPublicPath, 'index.html')
      }, ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST,
    port: PORT,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    publicPath: config.dev.assetsPublicPath,
    proxy: {},
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: false,
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = PORT
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: utils.createNotifierCallback()
      }))

      resolve(devWebpackConfig)
    }
  })
})