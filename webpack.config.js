const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  plugins: [
    new MiniCssExtractPlugin(),
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
      }
    ]
  },
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
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
