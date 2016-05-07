var webpack = require('webpack');

module.exports = {
  devtool: '#source-map',
  entry: {
    app: './src/main.js',
    vendor: ['jquery', 'openseadragon']
  },
  output: {
    filename: './static/dist/app.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015'],
          cacheDirectory: true,
        },
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', './static/dist/vendor.bundle.js')
  ]
};