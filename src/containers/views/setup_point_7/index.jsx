/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <main>
    <div className="container">
      <div className="row">
        <div className="col">
          <br/>
          <br/>
          <h2 className="heading text-center">Enter your Kytch address.</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-4 offset-xl-4">
          <br/>
          <form className="form-grey-theme">
            <div className="form-row">
              <div className="col">
                <div className="form-group is-valid">
                  <input type="text" className="form-control" defaultValue="3327 Seldon Ct"/>
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
                  <input type="text" className="form-control" defaultValue="Freemont"/>
                  <span className="add-burst-on-input-focus"></span>
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="col-md-6 col-sm-12">
                <div className="form-group is-valid">
                  <input type="text" className="form-control" defaultValue="CA"/>
                  <span className="add-burst-on-input-focus"></span>
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <div className="form-group is-valid">
                  <input type="text" className="form-control" defaultValue="94539"/>
                  <span className="add-burst-on-input-focus"></span>
                </div>
              </div>
            </div>
            <p className="text-center">Not in USA? | <Link to="setup_point_8">Change country</Link></p>
            <div className="button-wrapper text-center">
              <Link className="btn btn-secondary text-uppercase" to="#">Next</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
);
