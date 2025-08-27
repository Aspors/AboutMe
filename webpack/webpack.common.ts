export {};
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
// const paths = require("./paths");

module.exports = {
  entry: {
    app: path.resolve(__dirname, "../src/app/index.tsx"),
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].bundle.js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../public"),
          to: "assets",
          globOptions: {
            ignore: ["*.DS_Store"],
          },
          noErrorOnMissing: true,
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
      filename: "index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        exclude: /node_modules/,
        type: "asset/resource",
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        exclude: /node_modules/,
        type: "asset/inline",
      },
    ],
  },
};
