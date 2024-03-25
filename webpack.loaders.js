

// for importing CSS globally
const cssLoaderForGlobals = {
  loader: 'css-loader',
  options: {
    sourceMap: false,
  }
};


// for transpiling ES6 JavaScript
const babelLoader = {
  test: /\.(m?js|jsx)$/,
  resolve: {
    fullySpecified: false,
  },
  exclude: [
    /node_modules/, 
    /\*\.config.js/,
  ],
  loader: 'babel-loader',
};

// for loading images
const urlLoader = {
  test: /\.(png|jp(e)?g|svg|gif)$/i,
  loader: 'url-loader',
  options: {
    limit: 10000,
    fallback: 'file-loader',
    name: '[name]-[hash].[ext]',
    outputPath: 'images/',
  }
};

// for loading JSON (when is this used??)
const jsonLoader = {
  test: /\.json$/,
  loader: 'json-loader',
};

// for loading fonts/etc
const fileLoader = {
  test: /\.(eot|svg|ttf|woff|woff2)$/,
  loader: 'file-loader'
};

module.exports = {
  cssLoaderForGlobals, 
  babelLoader, 
  urlLoader, 
  jsonLoader, 
  fileLoader, 
};

