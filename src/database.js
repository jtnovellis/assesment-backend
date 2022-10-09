const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI;
  try {
    await mongoose.connect(mongoURI);
    console.log('Connection with MongoDB Altas is OK');
  } catch (err) {
    console.error('Something happened connecting with MongoDB');
    process.exit(1);
  }
};

module.exports = { connectDB };
