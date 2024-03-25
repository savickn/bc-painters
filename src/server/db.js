
import mongoose from 'mongoose';

import seedDatabase from './seed';
import config from './config/environment';

// connect to MongoDB
export default async function() {
  mongoose.Promise = global.Promise;

  try {
    console.log(config.mongo.uri);
    await mongoose.connect(config.mongo.uri);
    console.log('Connected to MongoDB');

    // seed database
    await seedDatabase();

  } catch(err) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw err;
  }
}
