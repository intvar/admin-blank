const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const DEVELOPMENT_MODE = 'development';
const PRODUCTION_MODE = 'production';
const NODE_ENV = process.env.NODE_ENV || DEVELOPMENT_MODE;
const API_URL_ENV = process.env.API_URL_ENV || '/api/v1/';

const plugins = [
  new webpack.DefinePlugin({
    NODE_ENV: JSON.stringify(NODE_ENV),
    API_URL_ENV: JSON.stringify(API_URL_ENV),
    'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
  }),
  // new webpack.optimize.CommonsChunkPlugin({
  //   name: 'common',
  //   filename: '[name].js',
  //   minChunks: 2,
  // }),
  new webpack.NoEmitOnErrorsPlugin(),
  new CopyWebpackPlugin([
    {
      from: path.join(__dirname, '/src/favicons'),
      to: path.join(__dirname, '/dist/assets/favicons'),
    },
  ]),
  new ExtractTextWebpackPlugin('styles.css'),
  new HtmlWebpackPlugin({
    hash: true,
    template: './index.html',
    filename: path.join(__dirname, '/dist/index.html'),
    alwaysWriteToDisk: true,
  }),
  new HtmlWebpackHarddiskPlugin(),
];

if (NODE_ENV === PRODUCTION_MODE) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({ test: /\.jsx?/ }),
    new CleanWebpackPlugin([
      path.join(__dirname, '/dist/*.*'),
      path.join(__dirname, '/dist/assets'),
    ]));
}

module.exports = {
  mode: NODE_ENV,
  context: path.join(__dirname, '/src'),
  entry: {
    'whatwg-fetch': 'whatwg-fetch',
    main: './main',
  },
  output: {
    path: path.join(__dirname, '/dist/assets'),
    filename: '[name].js',
    publicPath: '/assets/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        use: NODE_ENV === PRODUCTION_MODE ? ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }) : ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|svg|gif|ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
    ],
  },
  devtool: NODE_ENV === DEVELOPMENT_MODE ? 'source-map' : false,
  plugins,
  devServer: {
    contentBase: path.join(__dirname, '/dist'),
    compress: false,
    port: 9001,
    historyApiFallback: true,
    hot: true,
    proxy: {
      '/api/**': {
        target: 'http://localhost:3000/',
        secure: false,
        changeOrigin: true,
      },
    },
  },
};
