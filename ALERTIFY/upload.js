const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Set up storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Serve static files (including CSS and uploads)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

// Serve HTML page with buttons for upload and download
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
  res.send('File uploaded successfully!');
});

// Handle file download with a new name
app.get('/download', (req, res) => {
  const sourceFile = path.join(__dirname, 'download', 'a.csv');
  const destinationFileName = 'a.csv';

  console.log('Source File Path:', sourceFile);

  if (fs.existsSync(sourceFile)) {
    const readStream = fs.createReadStream(sourceFile);

    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${destinationFileName}"`);

    readStream.pipe(res);
  } else {
    res.status(404).send('File not found');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
