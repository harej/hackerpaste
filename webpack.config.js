const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: 'development',
  devServer: {
    port: 9000
  },

    plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html"
    }),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "static", to: path.resolve(__dirname, 'build/static')},
        { from: "manifest.json", to: path.resolve(__dirname, "build") },
        { from: "index.html", to: path.resolve(__dirname, 'build')},
      ],
    }),
  ],
  module: {
    rules:[
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '',
              modules: {
                namedExport: true
              }
            }
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          'file-loader'
        ]
      },
    ]
  },
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build/dist'),
    filename: 'bundle.js'
  },
  resolve: {
  	fallback: {
  		"crypto": require.resolve("crypto-browserify"),
  		"stream": require.resolve("stream-browserify"),
  		"buffer": require.resolve("buffer/")
  	}
  }
};
