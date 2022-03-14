
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
const path = require('path');
const { Router } = require(path.resolve(__dirname, 'Routes', 'Routes'));

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log(`DB Connected: ${process.env.MONGODB_URL}`);
}).catch((error) => {
  console.log(`Error: ${error.message}`);
});

const app = express();
app.use (bodyParser.json ({ limit: '10kb' }));
app.use('/api', Router);
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
