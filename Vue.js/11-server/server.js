const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
const data = require('./data.json');

app.use(cors());

app.get('/promotions', function (req, res) {
  res.json(data);
});

app.use(express.json());
app.post('/api', function (req, res) {
  data = req.body.data;

  res.status(200).send();
});

app.listen(PORT, function () {
  console.log('start serwera na porcie ' + PORT);
});
