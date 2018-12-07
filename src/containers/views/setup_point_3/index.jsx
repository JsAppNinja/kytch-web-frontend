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
          <h2 className="heading text-center"><span className="gradient-blue">Enter your Kytch address.</span></h2>
          <p className="text-center">Choose a name that will be useful to you, like "<span className="custom-underline">Main St.</span>" or "<span className="custom-underline">Lathrop 2523</span>."</p>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-4 offset-xl-4">
          <br/>
          <form>
            <div className="form-row">
              <div className="col">
                <div className="form-group is-valid">
                  <input type="text" className="form-control" value="3327 Seldon Ct"/>
                  <span className="add-burst-on-input-focus"></span>
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="col">
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Address 2"/>
                  <span className="add-burst-on-input-focus"></span>
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="col">
                <div className="form-group is-valid">
                  <input type="text" className="form-control" value="Freemont"/>
                  <span className="add-burst-on-input-focus"></span>
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="col-md-6 col-sm-12">
                <div className="form-group is-valid">
                  <input type="text" className="form-control" value="CA"/>
                  <span className="add-burst-on-input-focus"></span>
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <div className="form-group is-valid">
                  <input type="text" className="form-control" value="94539"/>
                  <span className="add-burst-on-input-focus"></span>
                </div>
              </div>
            </div>
            <p className="text-center">Not in USA? | <a href="#">Change country</a></p>
            <div className="button-wrapper text-center">
              <Link className="btn btn-primary text-uppercase" to="setup_point_4">Next</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
);
