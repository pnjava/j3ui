const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const Dotenv = require("dotenv-webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "dbhds",
    projectName: "tacts",
    webpackConfigEnv,
    argv,
    outputSystemJS: true,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    externals: {
      react: "react",
      "react-dom": "react-dom",
      "@dbhds/utilities": "@dbhds/utilities",
    },
    module: {
      rules: [
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
          generator: {
            filename: "assets/[name][hash][ext]",
          },
        },
      ],
    },
    plugins: [
      new Dotenv({
        path: path.resolve(__dirname, ".env"),
        safe: false,
        systemvars: true,
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "src/assets"),
            to: path.resolve(__dirname, "dist/assets"),
            globOptions: {
              ignore: ["**/*.DS_Store"],
            },
          },
        ],
      }),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, "dist"),
      },
      historyApiFallback: true,
    },
  });
};
