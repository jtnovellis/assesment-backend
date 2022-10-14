const mongoose = require('mongoose');

let connection;

async function connect() {
  if (connection) return;
  const { MONGODB_URI, MONGODB_URI_TEST, NODE_ENV } = process.env;
  const mongoUri = NODE_ENV === 'test' ? MONGODB_URI_TEST : MONGODB_URI;
  connection = mongoose.connection;
  connection.once('open', () => {
    console.log('Connection with mongo OK');
  });
  connection.on('disconnected', () => {
    console.log('Disconnected successfull');
  });
  connection.on('error', (error) => {
    console.log('Something went wrong!', error);
  });
  await mongoose.connect(mongoUri);
}

async function disconnected() {
  if (!connection) return;

  await mongoose.disconnect();
}

async function cleanup() {
  for (const collection in connection.collections) {
    await connection.collections[collection].deleteMany({});
  }
}

module.exports = { connect, disconnected, cleanup };
