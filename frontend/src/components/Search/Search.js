import React from 'react';
import {EMPTY_ERROR} from '../../utils/Messages';

function Search({
  searchText,
  isShortMovies,
  onSubmit,
  onCheckBoxClicked,
}) {

  const [movieName, setMovieName] = React.useState('');
  const [isShortFilm, setIsShortFilm] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  React.useEffect(() => {
    setMovieName(searchText);
    setIsShortFilm(isShortMovies);
  }, [searchText, isShortMovies]);

  function handleNameChange(e) {
    setMovieName(e.target.value);
  }

  function handleCheckBox(e) {
    onCheckBoxClicked(movieName, e.target.checked);
    setIsShortFilm(e.target.checked);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (movieName) {
      onSubmit(movieName, isShortFilm);
    } else {
      setErrorMessage(EMPTY_ERROR);
    }
  }

  return (
      <form className="search__form" onSubmit={handleSubmit} noValidate={true}>
        <div className="search__error-group">
          <div className="search__input-group">
            <input
                id="movieName-input"
                value={movieName || ''}
                onChange={handleNameChange}
                onFocus={() => errorMessage && setErrorMessage('')}
                className="search__input"
                type="text"
                name="movieName"
                placeholder="Фильм"
            />
            <button className="search__submit animate-opacity" type="submit"/>
          </div>
          <span className="search__error">{errorMessage}</span>
        </div>
        <div className="search__switch-group">
          <label className="search__switch">
            <input className="search__checkbox" type="checkbox"
                   onChange={handleCheckBox}/>
            <input
                id="shortFilm-input"
                checked={isShortFilm}
                onChange={handleCheckBox}
                className="search__checkbox"
                type="checkbox"
                name="shortFilm"
            />
            <span className="search__slider"></span>
          </label>
          <p className="search__switch-text">Короткометражки</p>
        </div>
      </form>
  );
}

export default Search;
