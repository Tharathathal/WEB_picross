import React, { useState } from 'react';
import { Radio, RadioGroup, FormControl, FormControlLabel, FormLabel } from '@mui/material';

function GetParam({ setSize, setPicture }) {
    const [value, setValue] = useState("");
    
    const handleChange = (event) => {
        setValue(event.target.value); // Update the state with the selected value
        setSize(parseInt(event.target.value)); // Convert the selected value to an integer and set the size
        setPicture(Array(parseInt(event.target.value)).fill(null).map(() => Math.random() < 0.5)); //Set random picture
      }

    return (
      <div>
        <h2>Select Picross Options</h2>
          <FormControl>
            <FormLabel id="difficulty-control">Difficulty Level</FormLabel>
            <RadioGroup
                aria-labelledby="difficulty-control"
                name="difficulty-control"
                value={value}
                onChange={handleChange}
            >
                <FormControlLabel value="9" control={<Radio />} label="Easy" />
                <FormControlLabel value="25" control={<Radio />} label="Normal" />
                <FormControlLabel value="64" control={<Radio />} label="Hard" />
            </RadioGroup>
            </FormControl>
        <br />
        <label>
          Upload Picture:
          {<UploadPicture setPicture={setPicture} size={Math.sqrt(parseInt(value))} />}
        </label>
      </div>
    );
  }

export default GetParam;

function UploadPicture({ setPicture, size }) {
  const [selectedImage, setSelectedImage] = useState(null);

    const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setSelectedImage(reader.result);
      setPicture(TrueFalseFunc({ image: reader.result, taille: size }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="Image-Test">
    <input type="file" accept="image/*" onChange={handleImageUpload} />
    {selectedImage && <img src={selectedImage} alt="Selected" />}
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
      if (gray > 190) {
        const color = `rgba(255, 255, 255, ${alpha})`;
        pixelColors.push(color);
        TrueFalse.push(true);
      }else{
        const color = `rgba(0, 0, 0, ${alpha})`;
        pixelColors.push(color);
        TrueFalse.push(false);
      }
    }
    
    taille = Math.trunc(Math.sqrt(pixelColors.length/taille));
    console.log(taille);
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
    return moyenneTrueFalse;
  }
  img.src = image;
}

