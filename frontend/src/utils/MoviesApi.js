import Api from './Api';

class MoviesApi extends Api {
  constructor(url) {
    super(url);
  }

  getCards() {
    return fetch(this._url).then(this._checkResponse);
  }
}

const movieApi = new MoviesApi('https://api.nomoreparties.co/beatfilm-movies');
export default movieApi;
