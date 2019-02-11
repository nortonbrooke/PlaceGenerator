const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('trust proxy', true);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res) {
  res.header('Access-Control-Allow-Origin', 'https://maps.googleapis.com/*');
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT);