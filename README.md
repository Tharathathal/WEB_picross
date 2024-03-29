# WEB_picross

## Prérequis

Il faut posséder MongoDB. Pour un test optimal du projet, nous conseillons d'importer une base de donnée dans "WEB.Users.json". Pour cela, télécharger l'outil en ligne de commande "mongoimport" qui fait partie des MongoDB Database Tools : https://www.mongodb.com/try/download/database-tools 
Puis exécuter : "mongoimport --db WEB --collection users --file ./WEB.Users.json --jsonArray", ce qui créera une bdd "WEB". Celle-ci comporte des utilisateurs (ainsi que leurs informations).

Il faut télécharger :
- Côté serveur : 
  - Mongoose (API MongoDB) : `npm install mongoose`
  - Express (Framework pour Node.js) : `npm install express`
  - CORS (Package qui permet le Cross-Origin Resource Sharing) : `npm install cors`
- Côté du projet React : `npm install react-router-dom`

Il faut installer la librairie MUI pour pouvoir afficher les composants : `npm install @mui/material @emotion/react @emotion/styled`

## Démarrage du jeu

Mettre le serveur sur écoute  : `node server.js`

Dans un autre terminal, lancer le projet react : `npm start`

Pour commencer une partie, il faut se connecter ou créer un compte utilisateur. Il faut ensuite choisir la difficulté et importer son image pour générer un Picross.

## Règles du jeu

L'objectif est de noircir les cases d'une grille pour former une image.
Le nombre de cases à noircir est indiqué autour du tableau de la manière suivante : en haut le nombre de cases noires dans chaque colonne, et à gauche pour les lignes. Plusieurs nombres peuvent être indiqués pour une même ligne/colonne : c'est le nombre de cases noires à la suite sur la ligne/colonne.

*Ex : si (2·3) est indiqué à côté d'une ligne, cela signifie qu'il faut noircir 2 cases, laisser une ou plusieurs cases vides, puis noircir 3 cases*

Le joueur possède deux options : noircir une case ou poser une croix dans une case qu'il sait blanche. Il peut changer entre ces deux symboles à l'aide du *switch* sous la grille.
Il dispose d'un certain nombre de vies, représentées par les coeurs au-dessus de la grille. Quand il met le mauvais symbole, il perd une vie et le véritable symbole de la case s'affiche en rouge. La partie s'arrête lorsqu'il perd sa dernière vie, ou qu'il parvient à noircir toutes les bonnes cases.
