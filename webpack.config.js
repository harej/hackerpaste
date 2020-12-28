const path = require('path');

module.exports = {
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
