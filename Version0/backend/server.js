const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/WEB')
  .then(() => console.log('Connexion à MongoDB réussie.'))
  .catch(err => console.error('Erreur de connexion à MongoDB', err));


// définition du schema dans la BDD
const userSchema = new mongoose.Schema({
    username: { type: String },
    password: { type: String },
    game: { type: Number},
    score: { type: Number }
  }, {
    timestamps: { createdAt: true, updatedAt: false }
  });

// Création du modèle User basé sur le schéma
const User = mongoose.model('User', userSchema, 'Users'); // (nom du modèle, schéma, nom de la collection (opt))



//instance express --> gère les routes/requêtes http 
const app = express();
const port = 5000;

//autorise les requêtes cross-origin
app.use(cors());
//les requêtes sont en json
app.use(express.json());

// gérer les requêtes à /login 
app.post('/login', async (req, res) => {
  const { username, password } = req.body; // réception
  let response;
  const user = await User.findOne({ username : username });
  if (!user) {
    response = "nothing"; // si utilisateur introuvable
  } else {
    const real_password = user.password;
    if (real_password == password) {
      response = "yes" // si mdp convient
    } else {
      response = "no" // si mauvais mdp
    }
  }
  // Réponse
  res.status(200).json({ message: response });
});

//gérer les requêtes POST à `/signup`
app.post('/signup', async (req, res) => {
  const { username, password } = req.body; // réception
  let response;
  const user = await User.findOne({ username : username });
  if (user != null) {
    response = "change"; // si username déjà pris
  } else {
    const newUser = new User({
      username: username,
      password: password,
      game : 0,
      score : 0 
    });
    try {
      await newUser.save();
      console.log("New account created :", username);
      response = "yes";
    } catch (error) {
      console.error("Erreur when subscribing :", error);
      response = "no";
    }
  }  
  // Répondre au client
  res.status(200).json({ message: response });
});

//gérer les requêtes POST à `/:username`
app.post('/userspace', async (req, res) => {
  const { username } = req.body;
  const user = await User.findOne({ username : username });


  const createdAt = user.createdAt; // Utilisez directement `createdAt` sans méthode
  const rep_game = user.game; // Accès direct à `game`
  const rep_score = user.score; // Accès direct à `score`

  // Répondre au client
  res.status(200).json({ date: createdAt.toLocaleDateString(), game : rep_game, score : rep_score });
});

//incrémenter nb de parties quand New Game
app.post('/userspace0', async (req, res) => {
  const { username } = req.body;
  const user = await User.findOne({ username : username });

  user.game += 1;

  const updatedUser = await user.save();
  res.json({ game: updatedUser.game });
});



// Démarrage du serveur
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
