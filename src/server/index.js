/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { Server } from 'http';

import app from './app';
import startDb from './db';

import config from './config/environment';

// run the server (currently local)
const startup = async () => {
  try {
    const server = Server(app);

    // connect to DB
    await startDb();

    // listen on server
    await server.listen(config.port);
    console.log(`Express is running on port ${config.port}`);
    
  } catch(err) {
    console.log(err);
  }
}

startup();

export default {};




