/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';

import hero03Image from '../../../../shared/img/hero-03.jpg';

export default () => (
  <main>
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="hero-wrapper extend-width"><img className="img-fluid" src={hero03Image} alt=""/></div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <h2 className="heading"><span className="gradient-blue">Share your Kytch. Not your account.</span></h2>				
          <p>Your team members don't have to share a login or password to use the app. Invite your team to get their own Kytch Account so they can control Kytch products and get the same notifications you do.</p>
          <p><a href="#">Learn more</a></p>
          <div className="buttons-wrapper two-buttons d-sm-flex justify-content-sm-between mt-5">
            <Link className="btn btn-secondary btn-min-width-long text-uppercase" to="#">Not now</Link>
            <Link className="btn btn-primary btn-min-width-long text-uppercase" to="/team/account_list">Get Started</Link>
          </div>
        </div>
      </div>
    </div>
  </main>
);
