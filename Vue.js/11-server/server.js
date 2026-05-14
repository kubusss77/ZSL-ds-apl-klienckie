const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;
let data = require('./data.json');
const usersFilePath = path.join(__dirname, 'users.json');

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

const readUsersData = async () => {
  try {
    const fileData = await fs.readFile(usersFilePath, 'utf8');
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === 'ENOENT') {
      const initialData = { users: [] };
      await fs.writeFile(usersFilePath, JSON.stringify(initialData, null, 2), 'utf8');
      return initialData;
    }

    throw error;
  }
};

const saveUsersData = async (usersData) => {
  await fs.writeFile(usersFilePath, JSON.stringify(usersData, null, 2), 'utf8');
};

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

app.post('/createUser', async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ status: 'error', message: 'Missing required fields' });
  }

  try {
    const usersData = await readUsersData();
    const normalizedEmail = String(email).trim().toLowerCase();
    const alreadyExists = usersData.users.some((user) => user.email === normalizedEmail);

    if (alreadyExists) {
      return res.json({ status: 'exists' });
    }

    usersData.users.push({
      id: Date.now().toString(),
      email: normalizedEmail,
      password: String(password),
    });

    await saveUsersData(usersData);
    return res.json({ status: 'registered' });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: 'Server error' });
  }
});

app.post('/api', function (req, res) {
  data = req.body.data;

  res.status(200).send();
});

app.listen(PORT, function () {
  console.log('start serwera na porcie ' + PORT);
});
