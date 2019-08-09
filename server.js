const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db/index.js');
const port = 3000;

const app = express();
app.use(express.static(__dirname + '/public/'));

app.post('/packages', (req, res) => {
  console.log(req.body)
})


app.listen(port, console.log('listening on port ', port));