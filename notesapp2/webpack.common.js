const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', // Ubah mode ke development jika menggunakan webpack-dev-server
  entry: './src/index.js', // Ubah path entry point sesuai struktur proyek
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Ubah path template HTML sesuai struktur proyek
      filename: 'index.html',
    }),
  ],
};
