const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
app.use(cors());
const PORT = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
  res.redirect(`/recording/${req.body.nbPhrases || 5}`);
});

app.get('/recording/:nbPhrases', (req, res) => {
  const nbPhrases = parseInt(req.params.nbPhrases, 10) || 5;
  res.render('recording', { nbPhrases });
});

app.listen(PORT, () => {
  console.log(`Frontend sur http://localhost:${PORT}`);
});
