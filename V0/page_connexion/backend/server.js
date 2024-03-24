const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/WEB')
  .then(() => console.log('Connexion à MongoDB réussie.'))
  .catch(err => console.error('Erreur de connexion à MongoDB', err));


const userSchema = new mongoose.Schema({
    username: { type: String },
    password: { type: String },
    game: { type: Number},
    score: { type: Number }
  }, {
    timestamps: { createdAt: true, updatedAt: false }
  });

// Méthodes du schéma pour récup infos utilisateur -- A placer avant model !!
userSchema.methods.getId = function () {
    return this._id;
}

userSchema.methods.getPassword = function() {
    return this.password;
}

userSchema.methods.getGame = function () {
    return this.game;
}

userSchema.methods.getScore = function () {
    return this.score;
}

userSchema.methods.getDate = function () {
  return this.createdAt;
}

// Création du modèle User basé sur le schéma
const User = mongoose.model('User', userSchema, 'Users'); // (nom du modèle, schéma, nom de la collection (opt))


const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

//gérer les requêtes POST à `/login`
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(`Try to connect to ${username}`)
  let response;
  const user = await User.findOne({ username : username });
  if (!user) {
    response = "nothing";
  } else {
    const real_password = user.getPassword();
    if (real_password == password) {
      response = "yes"
    } else {
      response = "no"
    }
  }
  // Répondre au client
  res.status(200).json({ message: response });
});

//gérer les requêtes POST à `/signup`
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  console.log(`Try to create an account : ${username}`)
  let response;
  const user = await User.findOne({ username : username });
  if (user != null) {
    response = "change";
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


// Démarrage du serveur
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
