const webpack = require('webpack')

const environment = JSON.stringify(process.env.NODE_ENV || 'development')

console.log('ENVIRONMENT', environment)

const config = {
  devtool: '#source-map',
  entry: {
    app: './src/main.js',
    vendor: ['whatwg-fetch', 'openseadragon', 'react', 'react-dom', 'redux', 'react-redux']
  },
  output: {
    filename: './static/dist/app.bundle.js'
  },
  module: {
    loaders: [
      // {
      //   test: /\.json$/,
      //   loader: 'json-loader',
      //   exclude: /node_modules/,
      // },
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': environment
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: './static/dist/vendor.bundle.js' })
  ]
}

if (environment === 'production') {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin())
}

module.exports = config