import {Link} from 'react-router-dom';
import arrowIcon from '../../images/link-icon.svg';

function Portfolio() {
  return (
      <div className="portfolio">
        <p className="portfolio__title">Портфолио</p>
        <div className="portfolio__links">
          <Link to="https://github.com/GulshatG/mesto"
                className="portfolio__link-group animate-opacity"
                target="_blank" rel="noopener noreferrer">
            <p className="portfolio__link-title animate-opacity">
              Статичный сайт
            </p>
            <img src={arrowIcon} alt="arrow icon"
                 className="portfolio__link-button"/>
          </Link>
          <Link to="https://github.com/GulshatG/react-mesto-api-full-gha"
                className="portfolio__link-group animate-opacity"
                target="_blank" rel="noopener noreferrer">
            <p className="portfolio__link-title">
              Адаптивный сайт
            </p>
            <img src={arrowIcon} alt="arrow icon"
                 className="portfolio__link-button"/>
          </Link>
          <Link to="https://github.com/GulshatG/how-to-learn"
                className="portfolio__link-group animate-opacity"
                target="_blank" rel="noopener noreferrer">
            <p className="portfolio__link-title">
              Одностраничное приложение
            </p>
            <img src={arrowIcon} alt="arrow icon"
                 className="portfolio__link-button"/>
          </Link>
        </div>
      </div>
  );
}

export default Portfolio;
