import React, { useState} from 'react';
import './App.css';
//import lena from './images/Lena.png';

//fonction qui extrait les pixels de l'image choisie
function ImagePixelExtractor({ image }) { 
  const [pixels, setPixels] = useState([]);// Tableau qui contiendra les couleurs des pixels de l'image
  const extractPixels = () => {
    const canvas = document.createElement('canvas');// Création d'un élément canvas
    const context = canvas.getContext('2d');// Récupération du contexte 2D du canvas
    const img = new Image();// Création d'un élément image
    img.crossOrigin = 'Anonymous';// Pour éviter les problèmes de CORS lors du chargement de l'image

    img.onload = () => { // Une fois l'image chargée
      canvas.width = img.width;// On définit la largeur du canvas à celle de l'image
      canvas.height = img.height;// On définit la hauteur du canvas à celle de l'image
      context.drawImage(img, 0, 0, img.width, img.height);// On dessine l'image dans le canvas
      const imageData = context.getImageData(0, 0, img.width, img.height);// On récupère les données de l'image
      const pixelColors = [];

      // Parcours de tous les pixels de l'image et récupération de leur couleur en gamme RGBA
      for (let i = 0; i < imageData.data.length; i += 4) {
        // Récupération des valeurs RGBA de chaque pixel
        const red = imageData.data[i];
        const green = imageData.data[i + 1];
        const blue = imageData.data[i + 2];
        const alpha = imageData.data[i + 3];
        const color = `rgba(${red}, ${green}, ${blue}, ${alpha})`;// Création de la couleur du pixel dans un array rgba
        pixelColors.push(color);// Ajout de la couleur du pixel au tableau pixelColors
      }
      setPixels(pixelColors);// Mise à jour du state pixels avec le tableau pixelColors
      console.log(pixelColors);
    };
    img.src = image;// On définit la source de l'image
  };

  return (
    <div>
      <button onClick={extractPixels}>Extraire les pixels de l'image</button>
      <div>
        {pixels.length > 0 && (
          <p>Nombre total de pixels : {pixels.length}</p>
        )}
        {pixels.map((color, index) => (
          <div key={index} style={{ backgroundColor: color, width: '20px', height: '20px' }}></div>
        ))}
      </div>
    </div>
  );
}

function MoyenneCouleur({ image }) {
  const [moyenne, setMoyenne] = useState([]);
  const extractMoyenne = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'Anonymous';

    img.onload = () => { 
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0, img.width, img.height);
      const imageData = context.getImageData(0, 0, img.width, img.height);
      const pixelColors = [];
      var red = 0;
      var green = 0;
      var blue = 0;
      var alpha = 0;
      // Parcours de tous les pixels de l'image et récupération de leur couleur en gamme RGBA
      for (let i = 0; i < imageData.data.length; i += 4) {
        // Récupération des valeurs RGBA de chaque pixel
        red += imageData.data[i];
        green += imageData.data[i + 1];
        blue += imageData.data[i + 2];
        alpha += imageData.data[i + 3];
      }
      red = red / (imageData.data.length / 4);
      green = green / (imageData.data.length / 4);
      blue = blue / (imageData.data.length / 4);
      alpha = alpha / (imageData.data.length / 4);
      const color = `couleur_moyenne_rgba(${red}, ${green}, ${blue}, ${alpha})`;
      pixelColors.push(color);
      setMoyenne(pixelColors);
      console.log(pixelColors);
    };
    img.src = image;
  };
  return (
    <div>
      <button onClick={extractMoyenne}>Extraire la moyenne de couleur de l'image</button>
      <div>
        {moyenne.length > 0 && (
          <p>Moyenne de couleur : {moyenne}</p>
        )}
      </div>
    </div>
  );
}

function DecoupageImageCarre({ image, taille}) {
  const [decoupage, setDecoupage] = useState([]);
  const extractDecoupage = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => { 
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0, img.width, img.height);// On dessine l'image dans le canvas
      const imageData = context.getImageData(0, 0, img.width, img.height);// On récupère les données de l'image
      const pixelColors = [];
      const TrueFalse = [];

      // Parcours de tous les pixels de l'image et récupération de leur couleur en gamme RGBA
      for (let i = 0; i < imageData.data.length; i += 4) {
        // Récupération des valeurs RGBA de chaque pixel
        const red = imageData.data[i];
        const green = imageData.data[i + 1];
        const blue = imageData.data[i + 2];
        const alpha = imageData.data[i + 3];
        const gray = (red + green + blue) / 3;
        // On vérifie si la couleur est claire ou foncée
        if (gray > 128) {
          const color = `rgba(128, 255, 255, ${alpha})`;
          pixelColors.push(color);
          TrueFalse.push(true);
        }else{
          const color = `rgba(0, 0, 0, ${alpha})`;
          pixelColors.push(color);
          TrueFalse.push(false);
        }
      }
      
      var pixelSquareColors = [];
      const carres = []
      const carresVraiFaux = []
      var TrueFalseSquare = [];
      var compt = 0;

      for (let i = 0; i < img.width; i += taille) {
        for (let j = 0; j < pixelColors.length; j += img.width) {
          compt++;
          const row = pixelColors.slice(j, j + taille);
          pixelSquareColors.push(row);
          if (compt === taille){
            carres.push(pixelSquareColors);
            pixelSquareColors = [];
            compt = 0;
          }
        }
      }
      console.log(carres);

      for (let i = 0; i < img.width; i += taille) {
        for (let j = 0; j < TrueFalse.length; j += img.width) {
          compt++;
          const row = TrueFalse.slice(j, j + taille);
          TrueFalseSquare.push(row);
          if (compt === taille){
            carresVraiFaux.push(TrueFalseSquare);
            TrueFalseSquare = [];
            compt = 0;
          }
        }
      }

      const moyenneTrueFalse = [];
      for (let i = 0; i < carresVraiFaux.length; i++) {
        var sommeVrai = 0;
        var sommeFaux = 0;
        for(let j = 0; j < carresVraiFaux[i].length; j++){
          for(let k = 0; k < carresVraiFaux[i][j].length; k++){
            if(carresVraiFaux[i][j][k] === true){
              sommeVrai++;
            }else{
              sommeFaux++;
            }
          }
        }
        if(sommeVrai > sommeFaux){
          moyenneTrueFalse.push(true);
        }else{
          moyenneTrueFalse.push(false);
        }
      }

      setDecoupage(carres);
      console.log(carres);
      console.log(carresVraiFaux);
      console.log(moyenneTrueFalse);
    }
    img.src = image;
  }
  
  /*useEffect(() => {
    extractDecoupage();
  }, []);*/

  return (
    <div>
      <button onClick={extractDecoupage}>Découper l'image en carrés</button>
      <div>
        {decoupage.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            {decoupage.map((colors, rowIndex) => (
              <div key={rowIndex} style={{ display: 'flex', flexDirection: 'column' }}>
                {colors.map((color, colIndex) => (
                  <div key={colIndex} style={{ backgroundColor: color, width: `${taille}px`, height: `${taille}px`, margin: '2px' }}></div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TrueFalseFunc({ image, taille}) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const img = new Image();
  img.crossOrigin = 'Anonymous';
  img.onload = () => { 
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0, img.width, img.height);// On dessine l'image dans le canvas
    const imageData = context.getImageData(0, 0, img.width, img.height);// On récupère les données de l'image
    const pixelColors = [];
    const TrueFalse = [];

    // Parcours de tous les pixels de l'image et récupération de leur couleur en gamme RGBA
    for (let i = 0; i < imageData.data.length; i += 4) {
      // Récupération des valeurs RGBA de chaque pixel
      const red = imageData.data[i];
      const green = imageData.data[i + 1];
      const blue = imageData.data[i + 2];
      const alpha = imageData.data[i + 3];
      const gray = (red + green + blue) / 3;
      // On vérifie si la couleur est claire ou foncée
      if (gray > 128) {
        const color = `rgba(155, 255, 255, ${alpha})`;
        pixelColors.push(color);
        TrueFalse.push(true);
      }else{
        const color = `rgba(0, 0, 0, ${alpha})`;
        pixelColors.push(color);
        TrueFalse.push(false);
      }
    }
    
    var pixelSquareColors = [];
    const carres = []
    const carresVraiFaux = []
    var TrueFalseSquare = [];
    var compt = 0;

    for (let i = 0; i < img.width; i += taille) {
      for (let j = 0; j < pixelColors.length; j += img.width) {
        compt++;
        const row = pixelColors.slice(j, j + taille);
        pixelSquareColors.push(row);
        if (compt === taille){
          carres.push(pixelSquareColors);
          pixelSquareColors = [];
          compt = 0;
        }
      }
    }
    console.log(carres);

    for (let i = 0; i < img.width; i += taille) {
      for (let j = 0; j < TrueFalse.length; j += img.width) {
        compt++;
        const row = TrueFalse.slice(j, j + taille);
        TrueFalseSquare.push(row);
        if (compt === taille){
          carresVraiFaux.push(TrueFalseSquare);
          TrueFalseSquare = [];
          compt = 0;
        }
      }
    }

    const moyenneTrueFalse = [];
    for (let i = 0; i < carresVraiFaux.length; i++) {
      var sommeVrai = 0;
      var sommeFaux = 0;
      for(let j = 0; j < carresVraiFaux[i].length; j++){
        for(let k = 0; k < carresVraiFaux[i][j].length; k++){
          if(carresVraiFaux[i][j][k] === true){
            sommeVrai++;
          }else{
            sommeFaux++;
          }
        }
      }
      if(sommeVrai > sommeFaux){
        moyenneTrueFalse.push(true);
      }else{
        moyenneTrueFalse.push(false);
      }
    }
    console.log(carres);
    console.log(carresVraiFaux);
    console.log(moyenneTrueFalse);
  }
  img.src = image;
}

function BlackAndWhiteImage({ image }) {
  const [bwImage, setBwImage] = useState(null);

  const convertToBlackAndWhite = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0, img.width, img.height);
      const imageData = context.getImageData(0, 0, img.width, img.height);
      const pixels = imageData.data;

      for (let i = 0; i < pixels.length; i += 4) {
        const red = pixels[i];
        const green = pixels[i + 1];
        const blue = pixels[i + 2];
        const gray = (red + green + blue) / 3;

        pixels[i] = gray;
        pixels[i + 1] = gray;
        pixels[i + 2] = gray;
      }

      context.putImageData(imageData, 0, 0);
      const bwImageUrl = canvas.toDataURL();
      setBwImage(bwImageUrl);
    };

    img.src = image;
  };

  return (
        <div>
          <button onClick={convertToBlackAndWhite}>Convert to Black and White</button>
            <div>
            {bwImage && <img src={bwImage} alt="Black and White" />}
            </div>
        </div>
      );
    }

export default function Lenna() {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

    return (
      <div className="Image-Test">
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {selectedImage && <img src={selectedImage} alt="Selected" />}
        <div className="Traitement-Image">
          <h1>Lenna</h1>
          <ImagePixelExtractor image={selectedImage} />
          <MoyenneCouleur image={selectedImage} />
          <DecoupageImageCarre image={selectedImage} taille={20} />
          <BlackAndWhiteImage image={selectedImage} />
        </div>
      </div>
    );
  }

function UploadPicture({ setPicture, size }) {
  const handleChange = (event) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setPicture(e.target.result);
      TrueFalseFunc(e.target.result, size);
    }
    reader.readAsDataURL(event.target.files[0]);
  }

  return (
    <input type="file" accept="image/*" onChange={handleChange} />
  );
}