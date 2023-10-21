import React from 'react';

function BurgerPopup({
  isOpen,
  onClose,
}) {
  return (
      <div className={`burger-popup ${isOpen && 'burger-popup_open'}`}>
        <div className="burger-popup__container">
          <button className="burger-popup__close-icon" onClick={onClose}/>
        </div>
      </div>
  );
}

export default BurgerPopup;
