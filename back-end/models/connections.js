// const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const { MONGO_URL } = process.env;

// module.exports = {
//   usersDB: mongoose.createConnection(`${MONGO_URL}/users/users`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }),
// };
const ConnectDB = async () => {
  const uri = 'mongodb://localhost:27017';
  const client = new MongoClient(uri);

  await client.connect();

  const db1 = client.db('database1');
  console.log('Подключены к database1');

  const db2 = client.db('database2');
  console.log('Подключены к database2');

  // Пример операций
  const collection1 = db1.collection('collection1');
  const collection2 = db2.collection('collection2');

  await client.close();
};
