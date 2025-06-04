const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 4000;

app.use(cors({
  origin: 'http://localhost:3000'
}));

// Stockage des fichiers avec multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, '../audiofiles/'),
  filename: (req, file, cb) => {
    const filename = `audio_${Date.now()}.webm`;
    cb(null, filename);
  }
});
const upload = multer({ storage });

// Upload audio
app.post('/api/upload', upload.single('audio'), (req, res) => {

  console.log("requete recu");
  if (!req.file) {
    return res.status(400).json({ error: 'Aucun fichier reçu' });
  }

  res.status(200).json({ message: 'Fichier reçu' });
});

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});