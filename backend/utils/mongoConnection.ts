import 'dotenv/config';
import mongodb, { MongoClient } from 'mongodb';

const DB_CONNECTION_STRING = process.env.MONGODB || '';

if (!DB_CONNECTION_STRING) {
  throw new Error('Please add your Mongo URI to .env.local');
}

let cachedClient: mongodb.MongoClient | null = null;
let cachedDb: mongodb.Db | null = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    // load from cache
    return {
      client: cachedClient,
      db: cachedDb,
    };
  }

  // Connect to cluster
  let client = new MongoClient(DB_CONNECTION_STRING);
  await client.connect();
  let db = client.db('directory');

  // set cache
  cachedClient = client;
  cachedDb = db;

  return {
    client: cachedClient,
    db: cachedDb,
  };
}
