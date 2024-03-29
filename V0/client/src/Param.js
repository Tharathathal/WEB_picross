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
          {/* Implement your picture upload logic */}
        </label>
      </div>
    );
  }

export default GetParam;
