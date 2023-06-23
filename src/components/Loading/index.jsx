import React from 'react';
import loadingGif from '../../exemples/images/loading-gif.gif'

function Loading() {
  return (
    <div style={{ textAlign: 'center', paddingTop: '20px',margin:'auto' }}>
      <img src={loadingGif} alt="Loading..." />
    </div>
  );
}

export default Loading;