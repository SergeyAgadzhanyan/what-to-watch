export function filterMovies(text, isShort, movies, savedMovies) {
  return _filterByNameAndSort(text, isShort, movies).map((m) => {
    const movieId = m['id'];
    delete m['id'];
    delete m['created_at'];
    delete m['updated_at'];
    let isSaved = false;
    let _id = '';
    savedMovies.every((sv) => {
      if (sv['movieId'] === movieId) {
        _id = sv['_id'];
        isSaved = true;
        return false;
      }
      return true;
    });
    if (_id) m._id = _id;

    return {
      ...m,
      movieId,
      isSaved,
      'image': `https://api.nomoreparties.co${m.image.url}`,
      'thumbnail': `https://api.nomoreparties.co${m.image.formats.thumbnail.url}`,
    };
  });
}

export function filterSavedMovies(text, isShort, movies) {
  return _addLikesToAllMovies(
      _filterByNameAndSort(text, isShort, movies).map((m) => {
        m.isSaved = true;
        return m;
      }));
}

export function sortSavedMovies(movies) {
  return _addLikesToAllMovies(movies.sort((a, b) => a['nameRU'].toLowerCase().
      trim().localeCompare(b['nameRU'].toLowerCase().trim())));
}

function _addLikesToAllMovies(movies) {
  return movies.map((m) => {
    m.isSaved = true;
    return m;
  });
}

function _filterByNameAndSort(text, isShort, movies) {
  return movies.filter((m) => {

    if (!m['nameRU'].toLowerCase().includes(text.toLowerCase()) &&
        !m['nameEN'].toLowerCase().includes(text.toLowerCase())) {
      return false;
    }
    return !(isShort && m['duration'] > 40);
  }).sort((a, b) => a['nameRU'].toLowerCase().
      trim().localeCompare(b['nameRU'].toLowerCase().trim()));
}

