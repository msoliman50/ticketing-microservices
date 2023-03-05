import mongoose from 'mongoose';
mongoose.set('strictQuery', false);

import app from './app';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  try {
    await mongoose.connect(`mongodb://auth-mongo-clusterip-srv:27017/auth`, {
      authSource: 'admin'
    });
    console.log('Connected to mongodb');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () =>
    console.log('Auth is working successfully on port 3000!')
  );
};

start();
