// server.js
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// MongoDB Connection
const MONGO_URI = 'mongodb://localhost:27017/social_media_bulk_uploader';
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Social Media Bulk Uploader API');
});


// Multer Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  const upload = multer({ storage });
  
  // Routes
  app.post('/api/videos', upload.single('video'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No video file provided' });
    }
  
    // Add video processing logic here (e.g., uploading to social media platforms)
  
    return res.status(200).json({ message: 'Video uploaded successfully' });
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
