const app = require('express')();

app.get('/', (req, res) => {
  res.json('Hello World');
});

app.listen(8000, () => {
  console.log('Start Server');
});
