import React from 'react';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import {CurrentUserContext} from '../../context/CurrentUserContext';
import BurgerPopup from '../BurgerPopup/BurgerPopup';
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import Movies from '../Movies/Movies';
import Header from '../Header/Header';
import Profile from '../Profile/Profile';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import MainApi from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import InfoPopup from '../InfoPopup/InfoPopup';
import {
  FAIL_LOGIN,
  FAIL_REGISTER,
  SUCCESS_PROFILE_UPDATE,
} from '../../utils/Messages';
import Auth from '../Auth/Auth';

function App() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [savedMovies, setSavedMovies] = React.useState([{}]);
  const [isBurgerPopup, setIsBurgerPopup] = React.useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = React.useState(false);
  const [infoText, setInfoText] = React.useState('');
  const [isShowNavigationLinks, setIsShowNavigationLinks] = React.useState(
      false);
  const [isShowAccountButton, setIsShowAccountButton] = React.useState(false);
  const [isSetHigh, setIsSetHigh] = React.useState(false);
  const rout = useLocation().pathname;
  React.useEffect(() => {
    MainApi.checkToken().then((res) => {
      setCurrentUser({...res.data});
      setIsLoggedIn(true);
      if (rout !== '/') {
        if (rout === '/signin' || rout === '/signup') {
          navigate('/movies', {replace: true});
        } else {
          navigate(rout, {replace: true});
        }
      }
    }).catch(() => console.log('unauth'));
  }, []);
  React.useEffect(() => {
    if (isLoggedIn) {
      MainApi.getSavedMovies().then((res) => {
        setSavedMovies({...res.data});
      }).catch((e) => console.log(e));
    }
  }, [isLoggedIn]);

  function closePopup() {
    setIsInfoPopupOpen(false);
    setInfoText('');
  }

  function handleUpdateProfile(name, email) {
    MainApi.update(name, email).then((res) => {
      setCurrentUser({...res.data});
      setInfoText(SUCCESS_PROFILE_UPDATE);
      setIsInfoPopupOpen(true);
    });
  }

  function handleHamburgerButtonClicked() {
    setIsBurgerPopup(!isBurgerPopup);
    setIsShowNavigationLinks(!isShowNavigationLinks);
    setIsShowAccountButton(!isShowAccountButton);
    setIsSetHigh(!isSetHigh);
  }

  function handleSignUpSubmit(name, email, password) {
    MainApi.signUp({
      name,
      email,
      password,
    }).then((res) => {
      setIsLoggedIn(true);
      setCurrentUser({...res.data});
      navigate('/movies');
    }).catch((e) => {
      console.log(e);
      setInfoText(FAIL_REGISTER);
      setIsInfoPopupOpen(true);
    });
  }

  function handleSignOut() {
    MainApi.signOut().then(() => {
      setIsLoggedIn(false);
      setCurrentUser({});
      localStorage.clear();
      navigate('/');
      console.log('sign outed');
    }).catch((e) => console.log(e));
  }

  function handleSignInSubmit(email, password) {
    MainApi.signIn({
      email,
      password,
    }).then((res) => {
      setIsLoggedIn(true);
      setCurrentUser({...res});
      navigate('/movies');
    }).catch((e) => {
      console.log('err ' + e);
      setInfoText(FAIL_LOGIN);
      setIsInfoPopupOpen(true);
    });
  }

  return (
      <CurrentUserContext.Provider value={currentUser}>
        <div className={`app ${isSetHigh && 'app__fix-height'}`}>
          <Header
              onHamburgerButtonClick={handleHamburgerButtonClicked}
              isShowNavigationLinks={isShowNavigationLinks}
              isShowAccountButton={isShowAccountButton}
              isLoggedIn={isLoggedIn}
          />
          <main>
            <Routes>

              <Route
                  path="/"
                  element=
                      {
                        <>
                          <Main/>
                        </>
                      }
              />
              <Route
                  path="/signup"
                  element={<Auth isRegister={true}
                                 onSubmit={handleSignUpSubmit}/>}
              />
              <Route
                  path="/signin"
                  element={<Auth isRegister={false}
                                 onSubmit={handleSignInSubmit}/>}
              />

              <Route
                  path="/movies"
                  element={
                    <ProtectedRoute
                        isLoggedIn={isLoggedIn}
                        element={Movies}
                        isOpenPopup={isBurgerPopup}
                        closePopup={handleHamburgerButtonClicked}
                        showSavedMovies={false}
                    />}
              />
              <Route
                  path="/saved-movies"
                  element={
                    <ProtectedRoute
                        isLoggedIn={isLoggedIn}
                        element={Movies}
                        showSavedMovies={true}
                        isOpenPopup={isBurgerPopup}
                        closePopup={handleHamburgerButtonClicked}
                    />
                  }
              />
              <Route

                  path="/profile"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn} element={Profile}
                                    onUpdate={handleUpdateProfile}
                                    onSignOut={handleSignOut}/>
                  }
              />
              <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
          </main>
          <Footer/>
          <BurgerPopup
              isOpen={isBurgerPopup}
              onClose={handleHamburgerButtonClicked}
          />
          <InfoPopup isOpen={isInfoPopupOpen} title={infoText}
                     closePopup={closePopup}/>
        </div>
      </CurrentUserContext.Provider>
  );
}

export default App;
