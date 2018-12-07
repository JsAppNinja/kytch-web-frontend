/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import hero00Image from '../../../shared/img/hero-00.jpg';

export default () => (
  <main>
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="hero-wrapper extend-width">
            <img className="img-fluid" src={hero00Image} alt="" />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <h2 className="heading">
            <span className="gradient-blue">Let’s get started.</span>
          </h2>
          <p>
            Adding a new device to your Kytch Account is the first step&nbsp;
            in bringing your Kytch products together in one place.&nbsp;
            We&apos;ll start by asking some questions about your kitchen.
          </p>
          <p>To find out more about why we ask for this and how we use your information, go to &nbsp;
            <a href="">kitch.com/privacy</a>
            &nbsp;where you can access our <a href="">Privacy Statement</a>.</p>
          <div className="button-wrapper text-center mt-5">
            <Link className="btn btn-primary btn-min-width-long text-uppercase" to="setup_point_1">Continue</Link>
          </div>
        </div>
      </div>
    </div>
  </main>
);
