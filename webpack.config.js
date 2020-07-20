const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
//console.log("isDev", isDev);

const optimization = () => {
  const config = { splitChunks: { chunks: "all" } };

  if (!isDev)
    config.minimizer = [
      new TerserWebpackPlugin(),
      new OptimizeCssAssetsWebpackPlugin(),
    ]

  return config;
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;



/////////////////////////// EXPORTS
module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: {
    main: ["@babel/polyfill", "./index.jsx"],
    analytics: "./analytics.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: filename(`js`)
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"]
  },
  optimization: optimization(),
  devServer: {
    clientLogLevel: "silent",
    port: 2500,
    contentBase: path.resolve(__dirname, "dist"),
    compress: true,
    hot: isDev,
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./index.html", minify: { collapseWhitespace: !isDev } }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({ patterns: [{ from: "./assets/favicon.ico" }] }),
    new MiniCssExtractPlugin({ filename: filename(`css`) })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { hmr: isDev, reloadAll: true }
          }
          , 'css-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|ttf)$/,
        use: 'file-loader'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"]
          }
        }
      }
    ],
  }
}