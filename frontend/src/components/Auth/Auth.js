import React from 'react';
import {useInput} from '../../utils/FormValidation';
import {
  hideFooter,
  hideHeader,
  showFooter,
  showHeader,
} from '../../utils/deleteElement';
import AuthForm from '../AuthForm/AuthForm';
import {getInputErrorMessage} from '../../utils/InputErrorMessage';

function Auth({
  onSubmit,
  isRegister,
}) {
  const name = useInput('', {
    minLength: 2,
    isEmpty: false,
  });
  const email = useInput('', {
    minLength: 5,
    isEmpty: false,
    isEmail: true,
  });
  const password = useInput('', {
    minLength: 5,
    isEmpty: false,
  });

  React.useEffect(() => {
    hideHeader();
    hideFooter();
    return () => {
      showHeader();
      showFooter();
    };
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    isRegister ? onSubmit(name.value, email.value, password.value) :
        onSubmit(email.value, password.value);
  }

  function isValidForm() {
    if (isRegister) {
      return name.isValidInput && password.isValidInput &&
          email.isValidInput;
    }
    return password.isValidInput &&
        email.isValidInput;
  }

  return (
      <section className="form-section">
        <AuthForm
            title={isRegister ? 'Добро пожаловать!' : 'Рады видеть!'}
            buttonText={isRegister ? 'Зарегистрироваться' : 'Войти'}
            questionText={isRegister ? 'Уже зарегистрированы?' : 'Ещё не' +
                ' зарегистрированы?'}
            link={isRegister ? '/signin' : '/signup'}
            linkText={isRegister ? 'Войти' : 'Регистрация'}
            disableButton={!isValidForm()}
            onSubmit={handleSubmit}>
          <div className="form-section__fields">
            {isRegister &&
                <div className="form-section__input-group">
                  <p className="form-section__label">Имя</p>
                  <input
                      id="name-input"
                      value={name.value}
                      className="form-section__input"
                      onChange={name.onChange}
                      onBlur={name.onBlur}
                      type="text"
                      name="name"
                      required
                      minLength="2"
                      maxLength="40"
                  />
                  <span className="form-section__input-error">
                {name.isTouched && getInputErrorMessage(name)}
              </span>
                </div>
            }
            <div className="form-section__input-group">
              <p className="form-section__label">E-mail</p>
              <input
                  id="email-input"
                  value={email.value}
                  className="form-section__input"
                  onChange={email.onChange}
                  onBlur={email.onBlur}
                  type="email"
                  name="email"
                  required
                  minLength="5"
                  maxLength="40"
              />
              <span className="form-section__input-error">{
                  email.isTouched && getInputErrorMessage(email)}
              </span>
            </div>
            <div className="form-section__input-group">
              <p className="form-section__label">Пароль</p>
              <input
                  id="password-input"
                  value={password.value}
                  className="form-section__input form-section__input_red"
                  onChange={password.onChange}
                  onBlur={password.onBlur}
                  type="password"
                  name="password"
                  required
                  minLength="5"
                  maxLength="40"
              />
              <span
                  className="form-section__input-error">
                {password.isTouched && getInputErrorMessage(password)}
              </span>
            </div>
          </div>
        </AuthForm>
      </section>
  );
}

export default Auth;
