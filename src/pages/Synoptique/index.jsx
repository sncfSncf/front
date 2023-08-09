import React from 'react';
import image from '../../exemples/images/synoptique.png';

export default function Synopsys() {
  return (
    <div className="parent historique synop">
      <img src={image} alt="site sncf" style={{ width: '80%',  objectFit: 'cover', marginTop:'10px' }} />
    </div>
  );
}
