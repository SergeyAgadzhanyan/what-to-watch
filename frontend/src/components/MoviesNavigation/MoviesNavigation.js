import {Link, useLocation} from 'react-router-dom';
import React from 'react';

function MoviesNavigation({
  isShowNavigationLinks,
}) {
  const currentLocation = useLocation();

  function isActiveLink(link) {
    return link === currentLocation.pathname;
  }

  return (
      <div className={`movies-navigation ${isShowNavigationLinks &&
      'movies-navigation_show'}`}>
        <Link to="/"
              className={`movies-navigation__link ${isActiveLink('/') &&
              'movies-navigation__link_active'} movies-navigation__link_hidden animate-opacity`}>Главная</Link>
        <Link to="/movies"
              className={`movies-navigation__link ${isActiveLink('/movies') &&
              'movies-navigation__link_active'} animate-opacity`}>Фильмы</Link>
        <Link to="/saved-movies"
              className={`movies-navigation__link ${isActiveLink(
                  '/saved-movies') &&
              'movies-navigation__link_active'} animate-opacity`}>Сохранённые
          фильмы</Link>
      </div>
  );
}

export default MoviesNavigation;
