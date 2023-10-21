import React from 'react';
import {MOVIES_NOT_FOUND, SERVER_ERROR} from '../../utils/Messages';

function MoviesInformationText({isError}) {
  return (
      <section className="movies-information-text">
        <h2 className="movies-information-text__text">
          {isError ? SERVER_ERROR : MOVIES_NOT_FOUND}
        </h2>
      </section>
  );
}

export default MoviesInformationText;
