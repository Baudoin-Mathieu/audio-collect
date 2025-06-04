const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
app.use(cors());
const PORT = 3000;

app.use(express.static('public'));

// Vue EJS
app.set('view engine', 'ejs');
app.set('views', 'views');


app.get('/',(req, res) => {
  res.render('index');
});

app.get('/informations', (req, res) => {
  res.render('informations');
});

app.post('/informations', (req, res) => {
  // Enregistrement des infos du formulaire
  res.redirect('/recording');
});

app.get('/recording', (req, res) => {
  res.render('recording');
});

app.listen(PORT, () => {
  console.log(`Frontend sur http://localhost:${PORT}`);
});
