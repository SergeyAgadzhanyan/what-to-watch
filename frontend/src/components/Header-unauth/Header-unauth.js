import React from 'react';
import {Link, useNavigate} from 'react-router-dom';

function HeaderUnauth() {
  const navigate = useNavigate();
  return (
      <div className="header-unauth__links">
        <Link to="/signup"
              className="header-unauth__link-registration animate-opacity">
          Регистрация
        </Link>
        <button onClick={() => navigate('/signin')}
                className="header-unauth__button-login animate-opacity">Войти
        </button>
      </div>
  );
}

export default HeaderUnauth;
