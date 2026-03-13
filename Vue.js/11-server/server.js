const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
const data = require('./data.json');

app.use(cors());

app.get('/promotions', function (req, res) {
  res.json(data.promotions);
});

app.get('/promotion/:id', function (req, res) {
  const promotion = data.promotions.find((p) => p.id == req.params.id);
  if (!promotion) {
    res.status(404).send();
    return;
  }

  res.json(promotion);
});

app.get('/product/:id', function (req, res) {
  const product = data.products.find((p) => p.id == req.params.id);
  if (!product) {
    res.status(404).send();
    return;
  }
  res.json(product);
});

app.use(express.json());
app.post('/api', function (req, res) {
  data = req.body.data;

  res.status(200).send();
});

app.listen(PORT, function () {
  console.log('start serwera na porcie ' + PORT);
});
