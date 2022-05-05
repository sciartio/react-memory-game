import Card from './Card.js';
import confetti from "https://cdn.skypack.dev/canvas-confetti";
import useSound from 'use-sound';
import sound from './correct-answer.mp3';
import { useState } from 'react';

const CardContainer = ( { array, mode } ) => {

    const [ first, setFirst ] = useState(0); 
    const [ count, setCount ] = useState(1); 
    const [ render, setRender ] = useState(0); 
    const [play] = useSound(sound);

    const getCount = () => {
        setCount(prevCount => prevCount + 1); 
        return count;
    }; 

    const getMode = () => {
        if (mode == 0) return 'card-container-0'; 
        else return 'card-container-1'; 
    }; 

    const updateCardById = (id, open) => {
        array[id].open = open; 
        setRender(prevRender => prevRender + 1); 
    };

    const updateCardByCharId = (char_id, open) => {
        for (let i = 0; i < array.length; i++)
            if (array[i].character.char_id == char_id) array[i].open = open; 
        setRender(prevRender => prevRender + 1); 
    };

    const checkComplete = () => {
        for (let i = 0; i < array.length; i++)
            if (array[i].open == false) return;
        confetti();
        play();
    }

    return (

        <section className={ getMode() }>
            { array.map( (e) => 
                (<Card key={e.id} e={e} mode={mode} setFirst={setFirst} first={first} getCount={getCount} 
                    updateCardById={updateCardById} updateCardByCharId={updateCardByCharId} checkComplete={checkComplete} />) ) }
        </section>

    );
};

export default CardContainer;