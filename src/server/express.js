
import express from 'express';
import path from 'path';
import compression from 'compression';
import favicon from 'serve-favicon';
//import morgan from 'morgan';
//import methodOverride from 'method-override';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import config from './config/environment';
 
// configure Express middleware
export default async function(app) { 
  let env = app.get('env'); 
  
  app.use(compression());
  app.use(bodyParser.json({ limit: '20mb' }));
  app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
  app.use(cookieParser());
  //app.use(morgan('dev'));

  /* ASSETS */
  
  // refers to folder containing images / etc (should be different for production)
  app.set('staticDir', path.resolve(config.root, 'src/server/public'));
  app.use(express.static(app.get('staticDir'))); // serves images from 'public dir'

  // refers to root folder of application (must contain 'index.html')
  app.set('appPath', path.resolve(config.root));
  app.use(express.static(app.get('appPath'))); // serves static files from 'dist' dir 


  if(env === 'production') {
    app.set('appPath', path.resolve(config.root));
    app.use(favicon(path.resolve(config.root, 'favicon.ico'))); 
  }

  if(env === 'development') {
    app.set('appPath', path.resolve(config.root, 'dist'));
    app.use(favicon(path.resolve(config.root, 'src/favicon.ico'))); 
  }

  //console.log('dirname --> ', path.resolve(__dirname));
  //console.log(`root --> ${path.resolve(config.root)}`);
  //console.log(`appPath --> ${app.get('appPath')}`);
}
