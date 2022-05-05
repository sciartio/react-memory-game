import './App.css';
import CardContainer from './CardContainer.js';
import bb_logo from './bb_logo.png';
import { useState, useEffect } from 'react';

const App = () => {

  const [ mode, setMode ] = useState(0); // 0: 4 x 4, 1: 6 x 5
  const [ array, setArray ] = useState([]);
  const [ characters, setCharacters ] = useState([]);

  const fetchCharacters = async () => {
    const response = await fetch(`https://www.breakingbadapi.com/api/characters`);
    const data = await response.json(); 

    const array = data.filter((o) => o.char_id != 39); // remove Holly White (no picture) 
    setCharacters(array);
    setArray( generateArray(array, mode) );
  };

  useEffect(() => {
      fetchCharacters();
  }, []);

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
    
      let j = Math.floor(Math.random() * (i + 1));
                  
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
        
    return array;
  };

  const duplicate = (array) => {

    let a = array.concat(array); 
    a = shuffle(a); 

    const b = [];

    for (let i = 0; i < a.length; i++)
      b.push( { id: i, character: a[i], open: false } );

    return b;
  };

  const generateArray = (array, mode) => {
    
    if (mode == 0) return duplicate( shuffle(array).slice(0, 8) ); // 4 x 4
    else return duplicate( shuffle(array).slice(0, 15) ); // 6 x 5
  };

  const onRadio = (value) => {
    setArray( generateArray(characters, value) );
    setMode(value);
    
  }

  return (
    <div className="app-container">
      <div className="header">
        <img src={bb_logo} width="50px" atl='' />
        <div className="btn btn-success" onClick={() => {setArray( generateArray(characters, mode) )}}>Restart</div>
        <div className="radio-button" onChange={ (e) => onRadio(e.target.value) }>
          <input type="radio" value="0" name="mode" defaultChecked /> 4 x 4
          <input type="radio" value="1" name="mode" /> 6 x 5
        </div>
      </div>
      <div className="game">
        <CardContainer array={ array } mode={ mode } />
      </div>
    </div>
  );
};

export default App;

