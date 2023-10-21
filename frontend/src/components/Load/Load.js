import React from 'react';

function Load({onClick}) {
  return (
      <div className="load">
        <button className="load__button animate-opacity" onClick={onClick}>
          Ещё
        </button>
      </div>
  );
}

export default Load;
