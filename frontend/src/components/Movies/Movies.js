import React from 'react';
import Search from '../Search/Search';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import movieApi from '../../utils/MoviesApi';
import Preload from '../Preload/Preload';
import {
  filterMovies,
  filterSavedMovies,
  sortSavedMovies,
} from '../../utils/FilterMovies';
import MoviesInformationText
  from '../MoviesInformationText/MoviesInformationText';
import mainApi from '../../utils/MainApi';

function Movies({
  isOpenPopup,
  closePopup,
  showSavedMovies,
}) {
  const [showPreload, setShowPreload] = React.useState(false);
  const [isNotFound, setIsNotFound] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [movies, setMovies] = React.useState([{}]);
  const [searchText, setSearchText] = React.useState('');
  const [isShortMovies, setIsShortMovies] = React.useState(false);
  React.useEffect(() => {
    return () => {
      if (isOpenPopup) closePopup();
    };
  });
  React.useEffect(() => {

    if (!showSavedMovies) {
      const localSearchText = localStorage.getItem('searchTex');
      const localIsShortMovies = localStorage.getItem('isShortMovies');
      const localMovies = localStorage.getItem('movies');
      if (localSearchText && localIsShortMovies && localMovies) {
        setSearchText(localSearchText);
        setIsShortMovies(localIsShortMovies === 'true');
        if (JSON.parse(localMovies).length === 0) {
          setIsNotFound(true);
        } else {
          setMovies(JSON.parse(localMovies));
        }
      }
    } else {
      mainApi.getSavedMovies().
          then((res) => {
            setSearchText('');
            setIsShortMovies(false);
            setMovies(sortSavedMovies([...res.data]));
          });
    }
  }, [showSavedMovies]);

  function getAndFilterMovies(movieName, isShortFilm) {
    if (localStorage.getItem('allMovies')) {
      const m = JSON.parse(localStorage.getItem('allMovies'));
      mainApi.getSavedMovies().then((sv) => {
        _filterMovies(movieName, isShortFilm, m, sv);
      }).catch((e) => {
        console.log(e);
        setIsError(true);
      });
    }
    Promise.all([movieApi.getCards(), mainApi.getSavedMovies()]).
        then(([m, sv]) => {
          localStorage.setItem('allMovies', JSON.stringify(m));
          _filterMovies(movieName, isShortFilm, m, sv);
        }).
        catch((e) => {
          console.log(e);
          setIsError(true);
        });
  }

  function _filterMovies(movieName, isShortFilm, m, sv) {
    let filteredMovies = filterMovies(movieName, isShortFilm, [...m],
        [...sv.data]);
    filteredMovies.length === 0 ? setIsNotFound(true) : setIsNotFound(
        false);
    setShowPreload(false);
    setIsError(false);
    localStorage.setItem('searchTex', movieName);
    localStorage.setItem('isShortMovies', isShortFilm);
    localStorage.setItem('movies', JSON.stringify(filteredMovies));
    setMovies(filteredMovies);
  }

  function handleLikeClicked(movie) {

    if (!movie.isSaved && !movie._id) {
      delete movie['isSaved'];
      mainApi.saveMovie(movie).then((movieFromDb) => {
        console.log('saved');
        let moviesArrayWithIdFromDb = movies.map((m) => {
          if (m['movieId'] === movie['movieId']) {
            m._id = movieFromDb.data['_id'];
            m.isSaved = true;
          }
          return m;
        });
        setMovies(moviesArrayWithIdFromDb);
      }).catch(() => {
        console.log('err save');
        //убираем лайк
        setMovies([...movies]);
      });
    } else {
      mainApi.deleteMovie(movie._id).
          then(() => {
            console.log('deleted');
            if (showSavedMovies) {
              setMovies(
                  [...movies.filter((m) => m['movieId'] !== movie['movieId'])]);
            } else {
              setMovies(movies.map((m) => {
                if (m['movieId'] === movie['movieId']) {
                  delete movie['_id'];
                  m.isSaved = false;
                }
                return m;
              }));
            }
          }).catch(() => {
        console.log('can not delete saved movie');
        setMovies([...movies]);
      });
    }
  }

  function getAndFilterSavedMovies(movieName, isShortFilm) {
    mainApi.getSavedMovies().
        then((res) => {
          let filteredMovies = filterSavedMovies(movieName, isShortFilm,
              [...res.data]);
          filteredMovies.length === 0 ? setIsNotFound(true) : setIsNotFound(
              false);
          setShowPreload(false);
          setIsError(false);
          setMovies(filteredMovies);
        });
  }

  function handleCheckBoxClicked(movieName, isShortFilm) {
    if (movies.length !== 0) handleSearchSubmit(movieName, isShortFilm);
  }

  function handleSearchSubmit(movieName, isShortFilm) {
    setShowPreload(true);
    if (!showSavedMovies) {
      getAndFilterMovies(movieName, isShortFilm);
    } else {
      getAndFilterSavedMovies(movieName, isShortFilm);
    }
  }

  return (
      <div className="movies">
        <Search onCheckBoxClicked={handleCheckBoxClicked}
                searchText={searchText} isShortMovies={isShortMovies}
                onSubmit={handleSearchSubmit}/>
        <div className="movies-container">
          {
            showPreload ? <Preload/> :
                <>
                  {(isNotFound || isError) ? <MoviesInformationText
                          isError={isError}/> :
                      <MoviesCardList showSavedMovies={showSavedMovies}
                                      movies={movies}
                                      onLikeClicked={handleLikeClicked}/>
                  }
                </>
          }
        </div>
      </div>
  );
}

export default Movies;
