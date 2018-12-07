/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <main>
    <div className="container">
      <div className="row">
        <div className="col-lg-6 offset-lg-3">
          <br/>
          <br/>
          <h2 className="heading text-center"><span className="gradient-blue">Choose what emails you'd like to receive from Kytch.</span></h2>
          <br/>
          <form>
            <div className="wrapper add-gradient-border">
              <div className="form-group mb-0">
                <h5 className="heading color-black">News and marketing</h5>
                <div className="form-check">
                  <input className="styled-checkbox" id="subscribeToNews" type="checkbox" value="option1"/>
                  <label className="form-check-label" for="subscribeToNews">Receive announcements, welcome emails, surveys, product info, and special offers.</label>
                </div>
              </div>
            </div>
            <br/>
            <div className="wrapper add-gradient-border">
              <div className="form-group mb-0">
                <h5 className="heading color-black">Kytch Report</h5>
                <div className="form-check">
                  <input className="styled-checkbox" id="subscribeToReports" type="checkbox" value="option2"/>
                  <label className="form-check-label" for="subscribeToReports">Get a monthly summary of your energy use, safety events, special offers, and more for your Kytch devices.</label>
                </div>
                <a href="#">Learn more</a>
              </div>
            </div>
            <br/>
            <div className="button-wrapper text-center">
              <Link className="btn btn-primary text-uppercase" to="setup_point_5">Next</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
);
