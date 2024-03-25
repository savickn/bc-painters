
import Express from 'express';

import configureExpress from './express';
import registerRoutes from './routes';

const app = new Express();

// compile with webpack with HMR
if (process.env.NODE_ENV === 'development') {
  console.log(`loading dev middleware`);

  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpack = require('webpack');

  const webpackConfig = require('../../webpack.config.client')({
    env: process.env.NODE_ENV
  });
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    writeToDisk: true,
  }));
  app.use(webpackHotMiddleware(compiler));
}

// configure express
configureExpress(app);

// attach APIs
registerRoutes(app);

export default app;


