const router = require('express').Router()
const multer = require("multer");
const path = require("path");
const fs = require('fs');
const mime = require('mime-types');


// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, req.user.id + Date.now() + " " + file.originalname);
  }
});

// Set up multer middleware
const upload = multer({ storage: storage });



// Route for file uploads
router.post('/upload', upload.single('file'), (req, res) => {
  res.status(200).json({ message: 'File uploaded successfully' });
});



// Route for getting all uploaded files
router.get('/files', (req, res) => {
  const directoryPath = path.join(__dirname, '../uploads');
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return res.status(500).send({ message: 'Unable to read files' });
    }
    return res.status(200).send(files);
  });
});

// Route for downloading a file
router.get('/download/:filename', (req, res) => {
  const file = path.join(__dirname, '../uploads', req.params.filename);
  const contentType = mime.lookup(file) || 'application/octet-stream';
  res.set('Content-Type', contentType);
  res.sendFile(file);
});

module.exports = router