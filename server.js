const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db/index.js');
const fileUpload = require('express-fileupload');
const path = require('path');
const cors = require('cors');
const port = 3000;

const app = express();
app.use(express.static(__dirname + '/public/'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(fileUpload({safeFileNames: true, preserveExtension: 4}));

app.get('/attachment', (req, res) => {
  var name = req.originalUrl.split('=')[1];
  res.download(`${__dirname}/public/uploads/${name}`, name, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(res.headersSent);
      console.log('successfully downloaded');
    }
  });
})

app.post('/upload', (req, res) => {
  // console.log(req.files.file);
  if (req.files.file) {
    console.log('file was entered')
    if (Array.isArray(req.files.file) === false) {
      console.log('only one file')
     //is either an object if # of files === 1 or is an array if # of files > 1
      var uploadFile = req.files.file;
      var uploadFileName = req.files.file.name;
      console.log("uploadFile------------------", uploadFile);
      console.log("uploadFileName----------------------", uploadFileName);
      uploadFile.mv(`${__dirname}/public/uploads/${uploadFileName}`, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('successful upload')
        }
      })
    } else {
      console.log('multiple files')
      for (var i = 0; i < req.files.file.length; i++) {
        var uploadFile = req.files.file[i];
        var uploadFileName = req.files.file[i].name;
        uploadFile.mv(`${__dirname}/public/uploads/${uploadFileName}`, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log('successful upload');
          }
        })
      }
    }
  }
//   if (req.files.file.length > 0) {
//   for (var i = 0; i < req.files.file.length; i++) {
//     var uploadFile =  req.files.file[i];
//     console.log('uploadFile', uploadFile);
//     var fileName = req.files.file[i].name;
//     console.log('fileName', fileName);
//     uploadFile.mv(`${__dirname}/public/files/${fileName}`, (err) => {
//       if (err) {
//         console.log(err);
//         return res.status(500);
//       } else {
//         console.log('uploaded file!');
//         // res.json({file: `public/${req.files.file[i].name}`})
        
//       }
//     })
//   }
// }
})

app.get('/packages', (req, res) => {
  connection.query(`SELECT name FROM packages`, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log('successfully getting names of all packages');
      res.send(results);
    }
  })
})

app.post('/package', (req, res) => {
  var name = req.body.name;
  console.log(name);
  //use name to get all packages info, quantities info, attachment names
  connection.query(`SELECT packages.name, packages.due_date, packages.date_added, packages.description, attachments.file_name, quantities.quantity FROM packages LEFT JOIN attachments ON attachments.packages_id = packages.id LEFT JOIN quantities ON quantities.packages_id = packages.id WHERE packages.name = "${name}"`, (err, results) => {
    if (err) {
      console.log(errr)
    } else {
      console.log('successfully retrieved package information');
      res.send(results);
    }
  })
})

app.post('/packages', (req, res) => {
  var data = req.body;
  console.log('data ', data);
  var name = data.name;
  var files = data.files;
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
      for (var j = 0; j < files.length; j++) {
        connection.query(`INSERT INTO attachments (packages_id, file_name) VALUES ((SELECT id FROM packages WHERE name = "${name}"), "${files[j]}")`, (err, results) => {
          if (err) {
            console.log(err)
          } else {
            console.log('successfully added to attachments table!')
          }
        })
      }
    }
  });
})


app.listen(port, console.log('listening on port ', port));