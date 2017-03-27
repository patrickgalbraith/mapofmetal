const webpack = require('webpack')

const environment = JSON.stringify(process.env.NODE_ENV || 'production').trim()

console.log('WEBPACK_ENV', 'prod')

const config = {
  devtool: '#source-map',
  entry: {
    app: './src/main.js',
    vendor: ['babel-polyfill', 'whatwg-fetch', 'openseadragon', 'react', 'react-dom', 'redux', 'react-redux']
  },
  output: {
    filename: './static/dist/app.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: './static/dist/vendor.bundle.js' }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      warnings: false
    })
  ]
}

module.exports = config