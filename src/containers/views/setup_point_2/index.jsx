/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import hero00Image from '../../../shared/img/hero-00.jpg';

export default () => (
  <main>
    <div className="container">
      <div className="row">
        <div className="col">
          <br/>
          <br/>
          <h2 className="heading text-center"><span className="gradient-blue">What do you want to call your Kytch?</span></h2>
          <p className="text-center">Choose a name that will be useful to you, like "<span className="custom-underline">Main St.</span>" or "<span className="custom-underline">Lathrop 2523</span>."</p>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-4 offset-xl-4">
          <br/>
          <form className="">
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Enter name"/>
              <span className="add-burst-on-input-focus"></span>
            </div>
            <div className="button-wrapper text-center">
              <Link className="btn btn-primary text-uppercase" to="setup_point_3">Next</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
);
