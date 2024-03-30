# WEB_picross

## Prérequis

Il faut télécharger :
- Côté serveur : 
  - Mongoose (API MongoDB) : `npm install mongoose`
  - Express (Framework pour Node.js) : `npm install express`
  - CORS (Package qui permet le Cross-Origin Resource Sharing) : `npm install cors`
- Côté du projet React : `npm install react-router-dom`

Il faut installer la librairie MUI pour pouvoir afficher les composants : `npm install @mui/material @emotion/react @emotion/styled`

Il faut créer une base de donnée "WEB" en exécutant "node createBDD.js".

## Démarrage du jeu

Mettre le serveur sur écoute  : `node server.js`

Dans un autre terminal, lancer le projet react : `npm start`

Dans `mon-projet-react/src/App.js`, remplacer toutes les instances de *componentsV0* par *componentsV1* pour jouer avec la fonctionnalité d'import d'images. Sinon, le jeu générera une grille aléatoirement.

Pour commencer une partie, il faut se connecter ou créer un compte utilisateur. 

### V0

En jouant avec la version 0, il suffit de choisir un niveau de difficulté, qui définit les dimensions de la grille. Puis la difficulté est élevée, plus la grille sera grande. A chaque partie, un motif de solution est généré aléatoirement.

### V1

La version 1 permet à l'utilisateur d'importer l'image de son choix pour la transformer en motif. *Attention, l'image choisie doit être carrée*. Lorsqu'on lance une nouvelle partie, il faut *d'abord* choisir la difficulté *puis* importer son image pour générer un Picross. 

## Règles du jeu

L'objectif est de noircir les cases d'une grille pour former une image.
Le nombre de cases à noircir est indiqué autour du tableau de la manière suivante : en haut le nombre de cases noires dans chaque colonne, et à gauche pour les lignes. Plusieurs nombres peuvent être indiqués pour une même ligne/colonne : c'est le nombre de cases noires à la suite sur la ligne/colonne.

*Ex : si (2·3) est indiqué à côté d'une ligne, cela signifie qu'il faut noircir 2 cases, laisser une ou plusieurs cases vides, puis noircir 3 cases*

Le joueur possède deux options : noircir une case ou poser une croix dans une case qu'il sait blanche. Il peut changer entre ces deux symboles à l'aide du *switch* sous la grille.
Il dispose d'un certain nombre de vies, représentées par les coeurs au-dessus de la grille. Quand il met le mauvais symbole, il perd une vie et le véritable symbole de la case s'affiche en rouge. La partie s'arrête lorsqu'il perd sa dernière vie, ou qu'il parvient à noircir toutes les bonnes cases.
