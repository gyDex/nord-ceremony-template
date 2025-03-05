
const path = require("path");

module.exports = {
  target: 'web',
  entry: {
    main: "./src/js/index.js",
  },
  output: {
    filename: "dist/[name].bundle.js",
    path: path.resolve(__dirname, "dist/js"),
  },
  module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
              `style-loader`, 
              {
                  loader:'css-loader',
                  options: { importLoaders: 1 },
              }, 
              {
                loader: "postcss-loader",
                options: {
                  postcssOptions: {
                    plugins: [
                      [
                        "autoprefixer",
                      ],
                    ],
                  },
                },
              },
          ],
          exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
      }, 
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
    ],
  },
  mode: process.env.NODE_ENV == "production" ? "production" : "development",
};