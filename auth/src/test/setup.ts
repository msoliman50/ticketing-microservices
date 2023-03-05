import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
mongoose.set('strictQuery', false);

import app from '../app';

let mongoServer: MongoMemoryServer;
beforeAll(async () => {
  process.env.JWT_KEY = 'sfjhgsdf';
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri, {
    authSource: 'admin'
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoServer.stop();
  await mongoose.disconnect();
});
