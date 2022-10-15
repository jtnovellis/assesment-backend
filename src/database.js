const mongoose = require('mongoose');

async function connectDB() {
  const { MONGODB_URI, MONGODB_URI_TEST, NODE_ENV } = process.env;
  const mongoUri = NODE_ENV === 'test' ? MONGODB_URI_TEST : MONGODB_URI;
  const optionsConnection = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    await mongoose.connect(mongoUri, optionsConnection);
    console.log('Database connected successfuly');
  } catch (err) {
    console.log('Database connection failed');
  }
}

module.exports = { connectDB };
