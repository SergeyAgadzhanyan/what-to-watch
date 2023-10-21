import React from 'react';
import {useNavigate} from 'react-router-dom';
import {
  hideFooter,
  hideHeader,
  showFooter,
  showHeader,
} from '../../utils/deleteElement';

function NotFoundPage() {
  const navigate = useNavigate();
  React.useEffect(() => {
    hideHeader();
    hideFooter();
    return () => {
      showHeader();
      showFooter();
    };
  }, []);

  function goBack() {
    navigate(-1);
  }

  return (
      <div className="not-found-page">
        <div className="not-found-page__container">
          <div className="not-found-page__content">
            <p className="not-found-page__code">404</p>
            <p className="not-found-page__description">Страница не найдена</p>
          </div>
          <button onClick={goBack}
                  className="not-found-page__link animate-opacity">
            Назад
          </button>
        </div>
      </div>
  );
}

export default NotFoundPage;
