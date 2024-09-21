/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose';

// const MONGODB_URI ="mongodb://localhost:27017";
const MONGODB_URI ="mongodb+srv://suriyaraja408:gITeBrIdbTf3lC90@itemscluster.oda4g.mongodb.net/?retryWrites=true&w=majority&appName=itemsCluster";

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
