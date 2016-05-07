var webpack = require('webpack');

module.exports = {
  devtool: '#source-map',
  entry: {
    app: './src/main.js',
    vendor: ['openseadragon']
  },
  output: {
    filename: './static/dist/app.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-object-rest-spread'],
          cacheDirectory: true,
        },
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', './static/dist/vendor.bundle.js')
  ]
};