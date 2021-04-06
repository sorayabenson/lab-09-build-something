const express = require('express');
const app = express();

app.use(express.json());

app.use('/ghosts', require('./controllers/ghosts'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
