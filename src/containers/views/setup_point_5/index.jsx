/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';

import hero02Image from '../../../shared/img/hero-02.jpg';
import progressImage from '../../../shared/img/icon-circle-process-gradient-blue-time-128x128-@2x.png';
import blueLeafImage from '../../../shared/img/icon-circle-gradient-blue-leaf-128x128-@2x.png';

export default () => (
  <main>
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="hero-wrapper extend-width">
            <img className="img-fluid" src={hero02Image} alt=""/>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <h2 className="heading"><span className="gradient-blue">Do you want to use phone's <br className="d-none d-sm-block"/>location for Kytch Assist?</span></h2>				
          <ul className="ul-features-with-big-icons list-unstyled">
            <li>
              <div className="item-wrapper">
                <span className="icon-wrapper"><img src={progressImage} alt=""/></span>
                <span className="text-wrapper">Helps your Kytch products know whether you're working or away.</span> 
              </div>
            </li>
            <li>
              <div className="item-wrapper">
                <span className="icon-wrapper"><img src={blueLeafImage} alt=""/></span>
                <span className="text-wrapper">Lets your products adjust automatically.</span> 
              </div>
            </li>
          </ul>
          <p><a href="#">Learn more</a></p>
          <p>Already using another phone? Choose OK to use this one instead.</p>
          <div className="buttons-wrapper two-buttons d-sm-flex justify-content-sm-between mt-5">
            <Link className="btn btn-secondary text-uppercase" to="setup_point_6">Not now</Link>
            <Link className="btn btn-primary text-uppercase" to="#">Ok</Link>
          </div>
        </div>
      </div>
    </div>
  </main>
);
