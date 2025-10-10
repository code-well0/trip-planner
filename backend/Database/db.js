import mongoose from 'mongoose'

const mongodb = async function () {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

export default mongodb;