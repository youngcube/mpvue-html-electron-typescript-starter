'use strict'
const path = require('path')
const {
  dependencies
} = require('../package.json')

module.exports = {
  entry: {
    main: ['babel-polyfill', './src/main-electron.ts']
  },
  externals: [
    ...Object.keys(dependencies || {})
  ],
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '../dist-electron/electron')
  },
  module: {
    rules: [{
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          "babel-loader",
          {
            loader: 'ts-loader',
          }
        ]
      }
    ],
  },
  target: 'electron-main',
}
