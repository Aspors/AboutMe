export {};
const { merge } = require("webpack-merge");
const common = require("./webpack.common.ts");
const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const prodPlugins = [
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, "../public/index.html"),
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    },
  }),
  new CompressionPlugin({
    test: /\.(js|css|html|svg|ttf|woff2?)$/i,
    algorithm: "brotliCompress",
    compressionOptions: { level: 11 },
    filename: "[path][base].br",
  }),
  new CompressionPlugin({
    test: /\.(js|css|html|svg|ttf|woff2?)$/i,
    algorithm: "gzip",
    compressionOptions: { level: 9 },
    filename: "[path][base].gz",
  }),
];

module.exports = merge(common, {
  mode: "production",
  plugins: prodPlugins,
  output: {
    filename: "js/[name].[contenthash].js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/",
    assetModuleFilename: "assets/[hash][ext][query]",
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.module\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              sourceMap: false,
              esModule: false,
            },
          },
          {
            loader: "postcss-loader",
            options: { sourceMap: false },
          },
          {
            loader: "sass-loader",
            options: { sourceMap: false },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /\.module\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { importLoaders: 2, sourceMap: false, esModule: false },
          },
          { loader: "postcss-loader", options: { sourceMap: false } },
          { loader: "sass-loader", options: { sourceMap: false } },
        ],
      },
    ],
  },

  optimization: {
    splitChunks: { chunks: "all" },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: false,
        terserOptions: {
          ecma: 2020,
          parse: {},
          compress: {
            passes: 2,
            drop_console: true,
            drop_debugger: true,
            pure_funcs: [
              "console.log",
              "console.info",
              "console.debug",
              "console.warn",
              "console.error",
            ],

            toplevel: true,
          },
          mangle: {
            toplevel: true,
          },
          format: {
            comments: false,
          },
          keep_classnames: false,
          keep_fnames: false,
        },
      }),
      new CssMinimizerPlugin(),
    ],
  },

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});
