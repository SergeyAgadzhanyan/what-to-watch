import {Link} from 'react-router-dom';

function Footer() {
  return (
      <footer className="footer">
        <p className="footer__description">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <div className="footer__content-group">
          <p className="footer__year">© 2020</p>
          <div className="footer__links">
            <Link to="https://practicum.yandex.ru/"
                  className="footer__link animate-opacity">Яндекс.Практикум</Link>
            <Link to="https://github.com/GulshatG"
                  className="footer__link animate-opacity">Github</Link>
          </div>
        </div>
      </footer>
  );
}

export default Footer;
