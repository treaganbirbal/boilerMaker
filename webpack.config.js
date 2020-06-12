module.exports = {
    entry: './client/index.js',
    mode: 'development',
    output: {
      path: __dirname,
      filename: './public/bundle.js'
    },
    devtool: 'source-maps',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          option: {
            preset: ['react', 'es2015']
          }
        },
         {test: /\.css$/,
           use: [
            'style-loader',
            'css-loader'
           ]
          }
      ]
    }
  };