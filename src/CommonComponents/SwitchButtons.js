import React from 'react';
import './CommonComponents.css';
import { useState } from 'react';

const SwitchButtons = ({ val, setVal }) => {
  const handleSwitchClick = (index) => {
    const updatedVal = val.map((item, i) => {
      if (index === i) {
        return { ...item, active: true };
      } else {
        return { ...item, active: false };
      }
    });
    setVal(updatedVal);
  };

  return (
    <div className='switchContainer' style={{maxWidth:val[0].size === 16 ? "173px" : "154px"}}>
      {val?.map((item, index) => (
        <div
          key={index}
          onClick={() => handleSwitchClick(index)}
          className='switchBtn'
          style={{
            borderBottom: item.active === true ? '2px solid #0078D2' : '',
          }}
        >
          <span style={{fontSize:item.size}}>{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default SwitchButtons;