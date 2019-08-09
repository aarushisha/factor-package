const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db/index.js');
const port = 3000;

const app = express();
app.use(express.static(__dirname + '/public/'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/packages', (req, res) => {

})

app.post('/packages', (req, res) => {
  var data = req.body;
  var name = data.name;
  var files = data.files;
  console.log(files);
  var dueDate = data.dueDate
  var description = data.description;
  var quantities = data.quantities;
  connection.query(`INSERT INTO packages (name, due_date, date_added, description) VALUES ("${name}", STR_TO_DATE("${dueDate}", '%Y-%m-%d'), CURDATE(), "${description}")`, (err, results) => {
    if (err) {
      console.log(err)
    } else {
      console.log('successfully added to packages table!');
      for (var i = 0; i < quantities.length; i++) {
        connection.query(`INSERT INTO quantities (packages_id, quantity) VALUES ((SELECT id FROM packages WHERE name = "${name}"), ${quantities[i]})`, (err, results) => {
          if (err) {
            console.log(err)
          } else {
            console.log('successfully added to quantities table!');
          }
        })
      }
    }
  });
})


app.listen(port, console.log('listening on port ', port));