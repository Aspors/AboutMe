export {};
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.module\.(sa|sc|c)ss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              importLoaders: 2,
              esModule: false,
              modules: {
                localIdentName: "[name]__[local]--[hash:base64:5]",
              },
            },
          },
          { loader: "postcss-loader", options: { sourceMap: true } },
          { loader: "sass-loader", options: { sourceMap: true } },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /\.module\.(sa|sc|c)ss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              importLoaders: 2,
            },
          },
          { loader: "postcss-loader", options: { sourceMap: true } },
          { loader: "sass-loader", options: { sourceMap: true } },
        ],
      },
    ],
  },
});
