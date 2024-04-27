// server.js
const express = require('express');
const multer = require('multer');
const db = require('./db');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

app.use(express.json());

app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Handle file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({ storage: storage });

// API endpoint to handle form submission
app.post('/submit', upload.single('file'), (req, res) => {
  const { challengeName, challengeDescription } = req.body;
  const filePath = req.file.path;

  const sql = 'INSERT INTO challenges (name, description, file_path) VALUES (?, ?, ?)';
  db.query(sql, [challengeName, challengeDescription, filePath], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error submitting challenge');
    } else {
      res.status(200).send('Challenge submitted successfully');
    }
  });
});

// API to fetch all challenges
app.get('/challenges', (req, res) => {
  const sql = 'SELECT * FROM challenges';
  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching challenges');
    }
    else {
      res.json(result);
    }
  })
})

// API to delete a challenge
app.delete('/challenge/:id', (req, res) => {
  const challengeId = req.params.id;

  const sql = 'DELETE FROM challenges WHERE id = ?';
  db.query(sql, [challengeId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error deleting challenge');
    } else {
      res.status(200).send('Challenge deleted successfully');
    }
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
