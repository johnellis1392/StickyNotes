const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")


const srcPath = path.resolve(__dirname, "src")
const distPath = path.resolve(__dirname, "dist")
const publicPath = "/assets/"


module.exports = {
  context: srcPath,

  // Webpack Build Entrypoints
  // NOTE: Can include multiple entrypoints
  entry: {
    "index": "./index.js",
  },

  output: {
    filename: "[name].bundle.js",
    path: distPath,
    publicPath,
  },


  devServer: {
    // contentBase: distPath, // Base directory for static files
    // watchContentBase: true,
    contentBase: false,
    index: "index.html",
    publicPath,

    host: "localhost",
    port: 8081,

    // hot: true,
    compress: true,

    // Make all requests fall through to index.html
    historyApiFallback: {
      rewrites: [
        { from: /./, to: "/assets/index.html" },
      ],
    },



    // Whitelisted Host Apis
    allowedHosts: ["localhost:3000"],

    // Proxy request url's
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        secure: false,
        pathRewrite: {
          "^/api": "/api",
        },
      }
    },
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

    // Have Webpack generate our index.html
    // NOTE: Need the index.html template here; rendering
    // directly to <body/> is discouraged by react, so we
    // need our index.html template to provide a container div.
    new HtmlWebpackPlugin({
      title: "Sticky Notes",
      template: "index.html",
      filename: "index.html",
      inject: "body",
      favicon: "public/favicon.ico",
      publicPath,
    })
  ],
}
