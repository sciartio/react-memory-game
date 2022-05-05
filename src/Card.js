import bb_logo from './bb_logo.png';
import { useState } from 'react';

const Card = ( {e, mode, setFirst, first, getCount, updateCardById, updateCardByCharId, checkComplete } ) => {

  const getClassName = () => {
    if (!e.open) return 'card-inner';
    else return 'card-inner open';
  };

  const getMode = () => {
    if (mode == 0) return 'card-0'; 
    else return 'card-1'; 
}; 

  const cardOpen = () => {
    updateCardById(e.id, true); 
    if (getCount() % 2 == 0) { 
      if ( first != e.character.char_id ) { 
        setTimeout(() => { 
          updateCardByCharId(first, false); 
          updateCardByCharId(e.character.char_id, false); 
        }, 1000); 
      }
      else { 
        checkComplete(); 
      }
    }
    else { 
      setFirst(e.character.char_id);
    }
  };

  return (
    <div className={getMode()}>
      <div className={getClassName()} onClick={() => { if (!e.open) cardOpen() }} >
        <div className='card-front'>
          <img src={bb_logo} alt='' />
        </div>
        <div className='card-back'>
          <img src={e.character.img} alt='' />
        </div>
      </div>
    </div>
  );
};

export default Card;
