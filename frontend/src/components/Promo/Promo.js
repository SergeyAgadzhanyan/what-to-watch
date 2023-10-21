import landingLogo from '../../images/landing-logo.svg';

function Promo() {
  return (
      <section className="promo">
        <img src={landingLogo} alt="Practicum logo"
             className="promo__image"/>
        <h1 className="promo__text">Учебный проект студента факультета
          Веб-разработки.</h1>
      </section>
  );
}

export default Promo;
