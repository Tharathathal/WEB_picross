const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/WEB';

// Connexion à MongoDB
mongoose.connect(url)
    .then(() => console.log('Connecté à MongoDB avec Mongoose'))
    .catch(err => console.error('Erreur de connexion à MongoDB:', err));

// Définition d'un schéma pour notre collection
const userSchema = new mongoose.Schema({
    username: { type: String },
    password: { type: String },
    game: { type: Number},
    score: { type: Number }
  }, {
    timestamps: { createdAt: true, updatedAt: false }
  });


// Création d'un modèle basé sur le schéma
const User = mongoose.model('User', userSchema, 'Users'); 

// Création et insertion de documents
async function createDocuments() {
    try {
        // Création des documents
        const user1 = new User({username: 'NinjaFurtif', password: 'furtif123', game: "5", score: "100"});
        const user2 = new User({username: 'PizzaLover', password: 'amourPizza', game: "2", score: "150"});
        const user3 = new User({username: 'ChatGlissant', password: 'glisseChat', game: "8", score: "200"});
        const user4 = new User({username: 'DogeCoinFan', password: 'doge2024', game: "3", score: "250"});
        const user5 = new User({username: 'MemeMaster', password: 'masterMeme', game: "7", score: "300"});
        const user6 = new User({username: 'TacoTuesday', password: 'tacoMardi', game: "1", score: "350"});
        const user7 = new User({username: 'LicorneMagique', password: 'magieLicorne', game: "6", score: "400"});
        const user8 = new User({username: 'ZombieDanseur', password: 'danseZombie', game: "4", score: "450"});
        const user9 = new User({username: 'PirateSouriant', password: 'sourirePirate', game: "9", score: "500"});
        const user10 = new User({username: 'AstronautePerdu', password: 'espace2024', game: "10", score: "550"});

        // Insertion des documents dans la base de données
        const resultat = await User.insertMany([user1, user2, user3, user4, user5, user6, user7, user8, user9, user10]);

        // Fermeture de la connexion à la base de données
        await mongoose.connection.close();
        console.log('Connexion à MongoDB fermée');
    } catch (err) {
        console.error('Erreur lors de l\'insertion des documents:', err);
    }
}

createDocuments();
