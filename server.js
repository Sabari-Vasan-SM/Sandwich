const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static('public'));

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // upload folder
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });

// Handle upload route
app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  // Example: Read file content (if it's a text file)
  if (file.mimetype === 'text/plain') {
    const content = fs.readFileSync(file.path, 'utf8');
    console.log('📄 File Content:\n', content);
  }

  res.send(`✅ File "${file.originalname}" uploaded and processed successfully!`);
});

// Start server
app.listen(PORT, () => {
  console.log(`🥪 Sandwich server running at http://localhost:${PORT}`);
});
