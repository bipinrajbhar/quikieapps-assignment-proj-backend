const config = require('./config');
const express = require('express');
const cors = require('cors');
const { json, urlencoded } = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');

const app = express();

mongoose.connect(config.databaseURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use('/api/v1/auth', userRoutes);

const port = config.port;

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
