import React from 'react';
import {CurrentUserContext} from '../../context/CurrentUserContext';
import HelloTitle from '../Hello-title/Hello-title';
import {hideFooter, showFooter} from '../../utils/deleteElement';
import {useInput} from '../../utils/FormValidation';

function Profile({
  onUpdate,
  onSignOut,
}) {

  const currentUser = React.useContext(CurrentUserContext);
  const name = useInput(currentUser.name, {
    minLength: 2,
    isEmpty: false,
  });
  const email = useInput(currentUser.email, {
    minLength: 5,
    isEmpty: false,
    isEmail: true,
  });
  React.useEffect(() => {
    hideFooter();
    return () => {
      showFooter();
    };
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdate(name.value, email.value);
  }


  function isDisableButton() {
    return email.value === currentUser.email && name.value ===
        currentUser.name;
  }

  return (
      <section className="profile">
        <HelloTitle text={`Привет, ${currentUser.name}!`}/>
        <form className="profile__form" onSubmit={handleSubmit}>
          <div className="profile__input-group">
            <p className="profile__input-info">Имя</p>
            <input
                id="name-input"
                value={name.value || ''}
                className="profile__input-value"
                onChange={name.onChange}
                type="text"
                name="name"
                placeholder="Имя"
                required
                minLength="2"
                maxLength="40"
            />
          </div>
          <div className="profile__input-group">
            <p className="profile__input-info">E-mail</p>
            <input
                id="email-input"
                value={email.value || ''}
                className="profile__input-value"
                onChange={email.onChange}
                type="text"
                name="email"
                placeholder="Email"
                required
                minLength="5"
                maxLength="40"
            />
          </div>
          <button disabled={isDisableButton()}
                  className={`profile__edite ${!isDisableButton() &&
                  'animate-opacity'}`}
                  type="submit">Редактировать
          </button>
        </form>
        <button className="profile__logout animate-opacity"
                onClick={onSignOut}>Выйти из аккаунта
        </button>
      </section>
  );
}

export default Profile;
