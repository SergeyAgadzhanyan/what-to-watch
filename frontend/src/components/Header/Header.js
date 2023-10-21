import React from 'react';
import logo from '../../images/logo.svg';
import HeaderAuth from '../Header-auth/Header-auth';
import HeaderUnauth from '../Header-unauth/Header-unauth';
import {Link} from 'react-router-dom';

function Header(props) {
  return (
      <header className="header header_black">
        <div className="header__links-group">
          <Link to="/" className="header__link-icon">
            <img src={logo} alt="logo"/>
          </Link>
          {
            props.isLoggedIn ?
                <HeaderAuth {...props}/> : <HeaderUnauth/>}
        </div>
      </header>
  );
}

export default Header;
