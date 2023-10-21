import React from 'react';

function MoviesCard({
  movie,
  onLikeClicked,
  showSavedMovies,
}) {
  function likeClicked() {
    onLikeClicked(movie);
  }

  function cardClicked() {
    console.log('card clicked');
  }

  return (
      <div className="movies-card">
        <a href={movie.trailerLink} target="_blank">
          <img onClick={cardClicked} className="movies-card__image"
               src={movie.image}
               alt="movie image"/>
        </a>
        <div className="movie-card__name-group">
          <p className="movies-card__name">{movie.nameRU}</p>
          <button onClick={likeClicked}
                  className={`animate-opacity movies-card__like 
                  ${(!showSavedMovies && movie.isSaved) &&
                  'movies-card__like_active'}
                  ${showSavedMovies && 'movies-card__like_delete'}`
                  }/>
        </div>
        <p className="movies-card__duration">
          {
            `${Math.floor(movie.duration / 60)}ч${movie.duration %
            60}м`
          }
        </p>
      </div>
  );
}

export default MoviesCard;
