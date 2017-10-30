const path = require("path")
const webpack = require("webpack")


module.exports = {
  context: path.resolve(__dirname, "./src"),
  entry: { "index": "./index.js" },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/assets/",
  },


  devServer: {
    contentBase: path.resolve(__dirname, "./src"),
    historyApiFallback: true, // Make all requests fall through to index.html
  },

  module: {
    rules: [{
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: "babel-loader",
          options: {
            presets: ["es2015", "stage-0", "react"],
          },
        }, ],
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
      },
      {
        test: /\.scss$/,
        exclude: [/node_modules/],
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            query: "importLoaders=1&modules&localIdentName=[local]__[name]__[path]__[hash:base64:5]"
          },
          { loader: "sass-loader" },
        ],
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: "file-loader",
        // query: {
        //   name: "static/assets/media/[name].[hash:8].[ext]",
        // },
      },
      {
        test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
        loader: "url-loader",
        // query: {
        //   limit: 10000,
        //   name: "static/assets/media/[name].[hash:8].[ext]",
        // },
      },
      { test: /\.json$/, loader: "json-loader", },
    ],
  },

  resolve: {
    modules: [
      path.resolve("./src"),
      path.resolve("./node_modules"),
    ],
  },


  plugins: [
    new webpack.ProvidePlugin({
      jQuery: "jquery",
      $: "jquery",
      jquery: "jquery",
    }),
  ],
}
