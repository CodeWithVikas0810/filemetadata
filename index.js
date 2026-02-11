var express = require('express');
var cors = require('cors');
const multer = require('multer')
const upload = multer({
  storage: multer.memoryStorage()
})
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {

  if (!req.file) {
    return res.status(400).json({
      error: "No file uploaded"
    })
  }
  // const originalName = req.file.originalname;
  // const type = req.file.mimetype;
  // const size = req.file.size;

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  })
  console.log(req.file)
})

module.exports = app

const port = process.env.PORT || 4000;

app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});