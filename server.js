const db = require('./config/connection');
const routes = require('./routes');
const express = require('express');

const PORT = process.env.port || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server is running on port ${PORT}`);
  });
});