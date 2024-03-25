
import path from 'path';
import secrets from '../secrets';

// Production specific configuration
// =================================
export default {
  // Server IP ??
  ip:       process.env.IP ||
            undefined,

  // Server port
  port:     process.env.PORT ||
            8080,

  // references directory that contains 'server.bundle.js'
  root:     path.normalize(__dirname),

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://127.0.0.1/bc-paint' //secrets.mongoAtlas
  }
};