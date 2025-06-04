const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware static
app.use('/js', express.static(path.join(__dirname, 'public')));

// Vue EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Exemple : récupération depuis un backend API (à adapter)
app.get('/', async (req, res) => {
  const recordings = [];

  res.render('index', { recordings });
});

app.listen(PORT, () => {
  console.log(`Frontend sur http://localhost:${PORT}`);
});
