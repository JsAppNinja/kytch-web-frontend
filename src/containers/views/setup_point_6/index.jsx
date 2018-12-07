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
          <h2 className="heading text-center"><span className="gradient-blue">3327 Seldon Ct</span></h2>
          <p className="text-center">Drag the map so the pin is on your house.</p>
          <p className="text-center"><Link to="setup_point_7">Edit Address</Link></p>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 offset-lg-4">
        </div>
      </div>
    </div>
  </main>
);
