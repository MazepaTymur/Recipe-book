const { default: mongoose } = require('mongoose');

const app = require('express')();

const apiRouter = require('./routers/apiRouter');

const { PORT, MONGO_URL } = process.env;

app.use('/', apiRouter);

app.listen(PORT, () => {
  console.log(`Start Server ${PORT}`);
  ConnectDB();
});

const ConnectDB = () => {
  mongoose
    .set('debug', true)
    .set('strictQuery', true)
    .connect(MONGO_URL)
    .then(() => console.log('connected MongoDB'))
    .catch((error) => {
      console.error('MongoDB connection error:', error.message);
    });
};
const _Error = (err, res) => {
  const statusCode = err.status || 500;
  const errorMessage = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    message: errorMessage,
    status: statusCode,
  });
}
