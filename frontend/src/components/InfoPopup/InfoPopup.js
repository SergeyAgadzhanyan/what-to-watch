import React from 'react';

function InfoPopup({
  isOpen,
  title,
  closePopup,
}) {
  return (
      <>
        <section className={`info-popup ${isOpen && 'info-popup__opened'}`}>
          <div className="info-popup__container">
            <h2 className="info-popup__title">{title}</h2>
            <button className="info-popup__button" onClick={closePopup}>Ok
            </button>
          </div>
        </section>
      </>
  );
}

export default InfoPopup;
