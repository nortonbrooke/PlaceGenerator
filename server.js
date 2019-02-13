const express = require('express');
const path = require('path');
var cors = require('cors')
const app = express();

const PORT = process.env.PORT || 3000;

app.set('trust proxy', true);

const whitelist = ['https://maps.googleapis.com']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', cors(corsOptions), function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT);