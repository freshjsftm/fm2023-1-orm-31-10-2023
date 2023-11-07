const express = require('express');
const router = require('./routes');
const handleErrors = require('./handleErrors');

const app = express();

app.use(express.json());
//http://localhost:3000
app.use('/api', router);

app.use(handleErrors);

module.exports = app;
