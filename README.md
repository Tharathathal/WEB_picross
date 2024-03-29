# WEB_picross

## Prérequis

Il faut posséder MongoDB et créer une BDD "à la main" pour simuler une base d'utilisateur ou inscrire des joueurs. Il faut télécharger :
- Côté serveur : 
  - Mongoose (API MongoDB) : `npm install mongoose`
  - Express (Framework pour Node.js) : `npm install express`
  - CORS (Package qui permet le Cross-Origin Resource Sharing) : `npm install cors`
- Côté du projet React : `npm install react-router-dom`

Il faut installer la librairie MUI pour pouvoir afficher les composants : `npm install @mui/material @emotion/react @emotion/styled`

## Démarrage du jeu

Mettre le serveur sur écoute  : `node server.js`

Dans un autre terminal, lancer le projet react : `npm start`

Dans `Picross/mon-projet-react/src/App.js`, remplacer toutes les instances de *componentsV0* par *componentsV1* pour jouer avec la fonctionnalité d'import d'images. Sinon, le jeu générera une grille aléatoirement.

Pour commencer une partie, il faut se connecter ou créer un compte utilisateur. Il faut ensuite choisir la difficulté et importer son image pour générer un Picross.

## Règles du jeu

L'objectif est de noircir les cases d'une grille pour former une image.
Le nombre de cases à noircir est indiqué autour du tableau de la manière suivante : en haut le nombre de cases noires dans chaque colonne, et à gauche pour les lignes. Plusieurs nombres peuvent être indiqués pour une même ligne/colonne : c'est le nombre de cases noires à la suite sur la ligne/colonne.

*Ex : si (2·3) est indiqué à côté d'une ligne, cela signifie qu'il faut noircir 2 cases, laisser une ou plusieurs cases vides, puis noircir 3 cases*

Le joueur possède deux options : noircir une case ou poser une croix dans une case qu'il sait blanche. Il peut changer entre ces deux symboles à l'aide du *switch* sous la grille.
Il dispose d'un certain nombre de vies, représentées par les coeurs au-dessus de la grille. Quand il met le mauvais symbole, il perd une vie et le véritable symbole de la case s'affiche en rouge. La partie s'arrête lorsqu'il perd sa dernière vie, ou qu'il parvient à noircir toutes les bonnes cases.
