const express = require('express');
const mongoose = require('mongoose');
const app = express();
const { PORT, MONGO_URL } = process.env;

const apiRouter = require('./routers/apiRouter');

const _connectDB = () => {
  mongoose
    .set('debug', false)
    .set('strictQuery', true)
    .connect(MONGO_URL + '/RecipeBook')
    .then(() => console.log('+ MongoDB success'))
    .catch((error) => {
      console.log('err', error.message);
      process.exit(1);
    });
};
const _Error = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const errorMessage = err.message || 'Internal Server Error.';

  res.status(statusCode).json({
    message: errorMessage,
    status: statusCode,
  });
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', apiRouter);
app.use(_Error);

app.listen(PORT, async () => {
  await _connectDB();
  console.log(`Start Server ${PORT}`);
});
