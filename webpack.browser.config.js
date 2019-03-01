const path = require('path');
const {
  resolve
} = path;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");
var WebpackChunkHash = require('webpack-chunk-hash');

module.exports = (env = {}) => {
  const IS_PRODUCTION_MODE = !env.dev;
  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: '[name].[hash].bundle.js',
      chunkFilename: '[name].[hash].bundle.js'
    },
    devtool: 'inline-source-map',
    optimization: {
      minimize: IS_PRODUCTION_MODE,
      splitChunks: {
        // include all types of chunks
        chunks: 'all'
      }
    },
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      hot: true,
      compress: true,
      port: 9000,
      proxy: {
        '/api': 'http://localhost:3000'
      }
    },
    module: {
      rules: [{
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.html$/,
          use: [{
            loader: "html-loader"
          }]
        }, {
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader', // translates CSS into CommonJS
            'sass-loader' // compiles Sass to CSS, using Node Sass by default
          ]
        }
      ]
    },
    plugins: [new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html"
      }),
      new MiniCssExtractPlugin({

        filename: '[name].[hash].css',
        chunkFilename: '[id].[hash].css'
      }),
      new WebpackChunkHash({algorithm: 'md5'})
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.scss'],
      alias: {
        components: resolve(__dirname, 'src')
      }
    }
  }
};
