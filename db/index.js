const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: ''
})

connection.connect((err => {
  if (err) {
    console.log('error connecting to mysql: ', err)
  } else {
    console.log('successfully connnected')
  }
}));

connection.query('CREATE DATABASE IF NOT EXISTS factor_packages', (err, results) => {
  if (err) {
    console.log('error in creating db', err)
  } else {
    console.log('successfully created db')
  }
});

connection.query('USE factor_packages', (err, results) => {
  if (err) {
    console.log('error in using db', err)
  } else {
    console.log('successfully using db')
  }
});

connection.query('CREATE TABLE IF NOT EXISTS packages (id int NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100), due_date DATE, date_added TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, description LONGTEXT)', function(err, results) {
  if (err) {
    console.log('error in creating packages table', err)
  } else {
    console.log('successfully created packages table');
  }
});

connection.query('CREATE TABLE IF NOT EXISTS attachments (id int NOT NULL AUTO_INCREMENT PRIMARY KEY, packages_id int NOT NULL, INDEX pack_id (packages_id), file_name VARCHAR(100), FOREIGN KEY (packages_id) REFERENCES packages(id))', function(err, results) {
  if (err) {
    console.log('error in creating attachments table', err)
  } else {
    console.log('successfully created attachments table');
  }
});

connection.query('CREATE TABLE IF NOT EXISTS quantities (id int NOT NULL AUTO_INCREMENT PRIMARY KEY, packages_id int NOT NULL, quantity INT, INDEX pack_id (packages_id), FOREIGN KEY (packages_id) REFERENCES packages(id))', function(err, results) {
  if (err) {
    console.log('error in crerating quantitites table', err)
  } else {
    console.log('successfully created quantitites table');
  }
});

module.exports = connection;