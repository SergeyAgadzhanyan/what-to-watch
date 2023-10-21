import React from 'react';
import MoviesNavigation from '../MoviesNavigation/MoviesNavigation';
import accLogo from '../../images/acc-logo.svg';
import iconHamburger from '../../images/icon_hamburger.svg';
import {useNavigate} from 'react-router-dom';

function HeaderAuth({
  onHamburgerButtonClick,
  isShowNavigationLinks,
  isShowAccountButton,
}) {
  const navigate = useNavigate();

  return (
      <>
        <MoviesNavigation
            isShowNavigationLinks={isShowNavigationLinks} onHamburgerButtonClick={onHamburgerButtonClick}
        />
        <button onClick={() => navigate('/profile')}
                className={`header-auth__account-button animate-opacity ${isShowAccountButton &&
                'header-auth__account-button_show'}`}>
          <img src={accLogo} alt="Account logo"
               className="header-auth__button-img animate-opacity"/>
          Аккаунт
        </button>
        <button className="header-auth__hamburger-button animate-opacity"
                onClick={onHamburgerButtonClick}>
          <img src={iconHamburger} alt="hamburger logo"
               className="header-auth__hamburger-icon animate-opacity"/>
        </button>
      </>
  );
}

export default HeaderAuth;
