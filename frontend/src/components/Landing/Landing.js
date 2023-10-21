import React from 'react';
import Promo from '../Promo/Promo';
import LandingNavigation from '../LandingNavigation/LandingNavigation';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';

function Landing(props) {
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

export default Landing;
