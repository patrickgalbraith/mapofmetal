const webpack = require('webpack')

const ENV  = JSON.stringify(process.env.NODE_ENV || 'development')
const PORT = process.env.PORT || 58080

console.log('WEBPACK_ENV', 'dev')

const config = {
  devtool: '#source-map',
  entry: {
    app: ['webpack-dev-server/client?http://127.0.0.1:'+PORT, 'webpack/hot/only-dev-server', './src/main.js'],
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': ENV
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: './static/dist/vendor.bundle.js' })
  ]
}

module.exports = config