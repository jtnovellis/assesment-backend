const mongoose = require('mongoose');

const optionsConnection = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const mongoUri =
  'mongodb+srv://jtnovellis:TWRPQ6qx8YB4buc7@cluster0.zoo63qq.mongodb.net/favs?retryWrites=true&w=majority';
let connection;
async function connect() {
  if (connection) return;
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
  await mongoose.connect(mongoUri, optionsConnection);
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
