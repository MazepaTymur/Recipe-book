<<<<<<< Updated upstream
const app = require('express')();

app.get('/', (req, res) => {
  res.json('Hello World');
});

app.listen(8000, () => {
  console.log('Start Server');
=======
const express = require('express');
// const mongoose = require('mongoose');
const app = express();
const { PORT, MONGO_URL } = process.env;

const apiRouter = require('./routers/apiRouter');

// const ConnectDB = () => {
  // mongoose
  //   .set('debug', true)
  //   .set('strictQuery', true)
  //   .connect(MONGO_URL+'/users')
  //   .then(() => console.log('connected MongoDB'))
  //   .catch((err) => {
  //     console.error('MongoDB connection error:', err.message);
  //   });
// };
const _Error = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const errorMessage = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    message: errorMessage,
    status: statusCode,
  });
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', apiRouter);
app.use(_Error);

app.listen(PORT, () => {
  console.log(`Start Server ${PORT}`);
  ConnectDB();
>>>>>>> Stashed changes
});
