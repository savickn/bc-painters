
const webpack = require('webpack');
const path = require('path');

const NodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function(env) {

  const plugins = [
    //new webpack.DefinePlugin(envVariables),
    new CopyWebpackPlugin([
      { from: 'src/favicon.ico' },
    ]), 
  ];

  const config = {
    context: path.resolve(__dirname),
    mode: env.env,
    target: 'node',
    devtool: 'source-map',
    node: {
      __dirname: false, // if true -> dirname === /, else -> directory of script
      __filename: true,
    },
    externals: NodeExternals(),
    entry: {
      server: [
        path.resolve(__dirname, 'polyfills'),
        path.join(__dirname, 'src/server/index.js'),
      ]
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].bundle.js',
    },
    resolve: {
      modules: ['./node_modules', './src'],
      extensions: ['*', '.js', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader'
            },
          ]
        },
        {
          test: /\.(json)$/,
          loader: 'json-loader'
        }
      ]
    },
    plugins,
  };

  return config;
}
