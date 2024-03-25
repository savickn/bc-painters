#!/usr/bin/env node


if(process.env.NODE_ENV === 'production') {
  require('./dist/server.bundle.js');

} else {
  require('@babel/register');
  require('@babel/polyfill'); //basically for generators
  require('./src/server/index.js');
}

