import path from 'path';
import _ from 'lodash';

function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// configuration shared between all envs
let all = {
    env: process.env.NODE_ENV,

    // references root folder 'myReact'
    root: path.normalize(`${__dirname}/../../../..`),

    port: process.env.PORT || 3001,

    ip: process.env.IP || '0.0.0.0',

    seedDB: false,

    secrets: {
      session: process.env.SESSION || '1ccc96a857269d08c0c70c9f12df8187', //|| env.SESSION_SECRET,
      googleAPI: process.env.GOOGLE_API, //|| env.googleAPI, 
      mongoURI: process.env.mongoURI,
      //serverEmail: process.env.EADDRESS || env.HOME_EMAIL,
      //emailPassword: process.env.EPASS || env.PASSWORD,
    },

    userRoles: ['guest', 'user', 'admin'],

    mongo: {
      options: {
        db: {
          safe: true
        }
      }
    },

    /*google: {
      clientID:     process.env.GOOGLE_ID || 'id',
      clientSecret: process.env.GOOGLE_SECRET || 'secret',
      callbackURL:  (process.env.DOMAIN || '') + '/auth/google/callback'
    }*/
  };


// combine generic config with env-specific config
export default _.merge(all, require(`./${process.env.NODE_ENV}.js`).default || {});
