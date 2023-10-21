import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Load from '../Load/Load';

function MoviesCardList({
  movies,
  onLikeClicked,
  showSavedMovies,
}) {

  const [cardLength, setCardLength] = React.useState(0);

  React.useEffect(() => {
    if (!showSavedMovies) {
      let length = getCardLength(window.innerWidth);
      setCardLength(length);
    }
  }, [showSavedMovies]);

  React.useEffect(() => {
    if (!showSavedMovies) {
      function handleResize() {
        let length = getCardLength(window.innerWidth);
        if (cardLength.length !== length) setCardLength(length);
      }

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  });

  function loadClicked() {
    let count;
    let w = window.innerWidth;
    if (w <= 989) {
      count = 2;
    } else if (w <= 1279) {
      count = 3;
    } else {
      count = 4;
    }
    setCardLength(cardLength + count);
  }

  function getCardLength(width) {
    let cardLength;
    if (width <= 767) {
      cardLength = 5;
    } else if (width <= 989) {
      cardLength = 8;
    } else if (width <= 1279) {
      cardLength = 12;
    } else {
      cardLength = 16;
    }
    return cardLength;
  }

  return (
      <>
        <div className="movies-card-list">
          {showSavedMovies ? (
              (movies.length !== 0 && movies[0].movieId) &&
              movies.map((m) => (
                  <MoviesCard key={m.movieId} showSavedMovies={showSavedMovies}
                              onLikeClicked={onLikeClicked} movie={m}/>
              ))
          ) : (
              (movies.length !== 0 && movies[0].movieId) &&
              movies.slice(0, cardLength).map((m) => (

                  <MoviesCard key={m.movieId} onLikeClicked={onLikeClicked}
                              movie={m}/>
              ))
          )}

        </div>
        {(!showSavedMovies && cardLength < movies.length) &&
            <Load onClick={loadClicked}/>
        }

      </>
  );

}

export default MoviesCardList;
