import React from 'react';
import logo from '../../images/logo.svg';
import HelloTitle from '../Hello-title/Hello-title';
import {Link} from 'react-router-dom';

function AuthForm({
  title,
  children,
  buttonText,
  questionText,
  link,
  linkText,
  disableButton,
  onSubmit,
}) {

  return (
      <div className="auth-form">
        <Link to="/">
          <img className="auth-form__logo" src={logo} alt="logo"/>
        </Link>
        <HelloTitle text={title}/>
        <form className="auth-form__form" onSubmit={onSubmit}>
          {children}
          <div className="auth-form__button-group">

            <button disabled={disableButton}
                    className={`auth-form__button ${!disableButton &&
                    'animate-opacity'}`}
                    type="submit">{buttonText}</button>
            <div className="auth-form__question-group">
              <p className="auth-form__question">{questionText}</p>
              <Link className="auth-form__link animate-opacity"
                    to={link}>{linkText}</Link>
            </div>
          </div>
        </form>
      </div>
  );
}

export default AuthForm;
