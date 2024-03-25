
const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlHardDiskPlugin = require('html-webpack-harddisk-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const loaders = require('./webpack.loaders'); 

const prodRules = [
  {
    test: /\.(m?js|jsx)$/,
    resolve: {
      fullySpecified: false,
    },
    exclude: [
      /node_modules/, 
      /\*\.config.js/,
      path.resolve(__dirname, 'src/server')
    ],
    loader: 'babel-loader',
  },
  {
    test: /\.(css|scss|sass)$/,
    exclude: /node_modules/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
      },
      loaders.cssLoaderForGlobals,
      'sass-loader',
    ]
  }, 
  loaders.urlLoader, 
  loaders.jsonLoader, 
  loaders.fileLoader, 
];

const devRules = [
  {
    test: /\.(m?js|jsx)$/,
    resolve: {
      fullySpecified: false,
    },
    exclude: [
      /node_modules/, 
      /\*\.config.js/,
      path.resolve(__dirname, 'src/server')
    ],
    loader: 'babel-loader',
  },
  {
    test: /\.(css|scss|sass)$/,
    use: [
      'style-loader',
      loaders.cssLoaderForGlobals,
      'sass-loader',
    ]
  },
  loaders.urlLoader, 
  loaders.jsonLoader, 
  loaders.fileLoader, 
];

module.exports = function(env) {
  console.log('Webpack ENV Variables --> ', env);
  console.log('webpack dirname --> ', __dirname);

  // configure plugins 
  var plugins = [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new HtmlWebpackPlugin({
      template: './src/client/template.html',
      filename: 'index.html',
      alwaysWriteToDisk: true,
    }),
    new HtmlHardDiskPlugin()
  ];

  if(env.env === 'development') {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  };

  if(env.env === 'production') {
    plugins.push(new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].[chunkhash].css"
    }));
  };
  
  const config = {
    context: path.resolve(__dirname),
    mode: env.env, 
    target: 'web', 
    devtool: 'source-map', 
    entry: {
      app: [
        path.resolve(__dirname, 'polyfills.js'),
        path.resolve(__dirname, 'src/client/index.js'),
      ]
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
      filename: '[name].bundle.js',
      chunkFilename: '[name].[chunkhash].js',
    },
    resolve: {
      modules: [
        './node_modules',
        './src/client',
      ],
      /*alias: {
        process: "process/browser",
        path: require.resolve("path-browserify")
      },*/
      fallback: {
        'crypto': false,
        'path': require.resolve('path-browserify'),
      },
      extensions: ['*', '.js', '.jsx'],
    },
    plugins,
    devServer: {
      static: path.join(__dirname, 'dist'),
      historyApiFallback: true,
      port: 3000,
      open: true,
    },
  };


  if(env.env === 'development') {
    // adds support for HMR
    config.entry.app.unshift("webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000");

    config.module = {
      rules: devRules, 
    };
  }

  if(env.env === 'production') {
    config.optimization = {
      minimize: true,
      splitChunks: {
        cacheGroups: {
          vendors: false,
          defaults: false,
          vendor: {
            name: 'vendor', 
            chunks: 'all',
            test: /node_modules/,
            priority: 20
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'async',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true
          }
        }
      },
      noEmitOnErrors: true,
      nodeEnv: 'production'
    };

    // used to serve from CDN in production mode
    //config.output.publicPath = 'https://cdnName.com'

    config.module = {
      rules: prodRules, 
    };
  }

  return config;
}
