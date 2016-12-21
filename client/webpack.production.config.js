var webpack = require('webpack');
var path = require('path');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var CopyWebpackPlugin = require('copy-webpack-plugin');

var staticPath = '../static';
var viewFilename= '../view'

module.exports = {
  devtool: 'cheap-source-map',
  entry: {
      bundle:path.resolve(__dirname, 'app/main.js')
  },
  output: {
    path: path.resolve(__dirname ,staticPath),
    publicPath: '/',
    filename: '/js/[name].js'
  },
  module: {
    loaders:[
      { test: /\.js[x]?$/, exclude: '/node_modules/', include: path.resolve(__dirname, 'app'), loader: 'babel-loader' },
      { test: /\.less$/, include: path.resolve(__dirname, 'app'), loader: 'style!css?module!autoprefixer!less' },
      { test: /\.(woff|woff2)$/,  loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf$/, loader: "file-loader" },
      { test: /\.eot$/, loader: "file-loader" },
      { test: /\.svg$/, loader: "file-loader" }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new uglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false,
      }
    }),
    new CopyWebpackPlugin([
      { from: './app/index.html', to: path.resolve(__dirname, viewFilename) }
    ]),
  ]
};
