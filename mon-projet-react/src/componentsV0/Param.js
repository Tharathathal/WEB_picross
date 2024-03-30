import React, { useState } from 'react';
import { Radio, RadioGroup, FormControl, FormControlLabel, FormLabel } from '@mui/material';

function GetParam({ setSize, setPicture, setSquaresColor, setSquaresState, setErrors, setNumbers }) {
    const [value, setValue] = useState("");
    
    const handleChange = (event) => {
        setValue(event.target.value); // Update the state with the selected value
        setSize(parseInt(event.target.value)); // Convert the selected value to an integer and set the size
        setPicture(Array(parseInt(event.target.value)).fill(null).map(() => Math.random() < 0.5)); //Set random picture
        setSquaresColor(Array(parseInt(event.target.value)).fill(null));
        setSquaresState(Array(parseInt(event.target.value)).fill(null));
        setErrors(Array(parseInt(event.target.value)).fill(null));
        setNumbers(Array(2 * Math.sqrt(parseInt(event.target.value))).fill(null));
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
      </div>
    );
  }

export default GetParam;