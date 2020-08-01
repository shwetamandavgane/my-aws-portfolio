const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['*', '.js', '.jsx','.css','.scss']
  },
  optimization: {
    minimize: false
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['es2015','react']
        }
      }
    },
    {
      test: /\.s[ac]ss$/i,
      use: [
                  // to inject the result into the DOM as a style block
                'style-loader',
                'css-loader',
                'sass-loader'  // to convert SASS to CSS

            ],
      },
  ],
},
};
