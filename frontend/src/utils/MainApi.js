import Api from './Api';
import {localhostUrl, serverMod, serverUrl} from './ServerConfig';

class MainApi extends Api {
  constructor(url) {
    super(url);
  }

  signUp({
    name,
    email,
    password,
  }) {
    return fetch(this._url + '/signup', {
      method: 'POST',
      headers: {
        authorization: this._auth,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }).then(this._checkResponse);
  }

  signIn({
    email,
    password,
  }) {
    return fetch(this._url + '/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        password,
        email,
      }),
    }).then(this._checkResponse);
  }

  signOut() {
    return fetch(this._url + '/signout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(this._checkResponse);
  }

  update(name, email) {
    return fetch(this._url + '/users/me', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        name,
        email,
      }),
    }).then(this._checkResponse);
  }

  checkToken() {
    return fetch(this._url + '/users/me', {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(this._checkResponse);
  }

  getSavedMovies() {
    return fetch(this._url + '/movies', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(this._checkResponse);
  }

  saveMovie(movie) {
    return fetch(this._url + '/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...movie}),
      credentials: 'include',
    }).then(this._checkResponse);
  }

  deleteMovie(id) {
    return fetch(this._url + '/movies/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(this._checkResponse);
  }
}

const mainApi = new MainApi(
    serverMod === 'dev' ? localhostUrl : serverUrl);
export default mainApi;
