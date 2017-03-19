const webpack = require('webpack')

const environment = JSON.stringify(process.env.NODE_ENV || 'development')

console.log('ENVIRONMENT', environment)

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
      'process.env.NODE_ENV': environment
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: './static/dist/vendor.bundle.js' })
  ]
}

if (environment === 'production') {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin())
} else {
  config.plugins.unshift(new webpack.HotModuleReplacementPlugin())
  config.entry = ['webpack-dev-server/client?http://127.0.0.1:58080', 'webpack/hot/only-dev-server', './src/main.js']
}

module.exports = config