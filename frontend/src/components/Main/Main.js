import React from 'react';
import Promo from '../Promo/Promo';
import LandingNavigation from '../LandingNavigation/LandingNavigation';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';

function Main() {
  React.useEffect(() => {
    let header = document.querySelector('.header');
    if (header && header.classList.contains('header_black')) {
      header.classList.remove(
          'header_black');
    }
    return () => {
      if (header && !header.classList.contains('header_black')) {
        header.classList.add(
            'header_black');
      }
    };
  });

  return (

      <>
        <Promo/>
        <LandingNavigation/>
        <AboutProject/>
        <Techs/>
        <AboutMe/>
      </>
  );
}

export default Main;
