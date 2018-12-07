/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import softphoneServeImage from '../../../shared/img/products/softserve-equipment.jpg';
import grillsImage from '../../../shared/img/products/grills.jpg';
import ovensImage from '../../../shared/img/products/ovens.jpg';
import fryersImage from '../../../shared/img/products/fryers.jpg';

export default () => (
  <main>
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="sequence-block text-center">
            <Link to="#" className="nav-link-back has-icon">
              <i className="icon icon-angle-left-blue icon-left" />
              <span className="text-wrapper">Back</span>
            </Link>
            <h2 className="heading"><span className="gradient-blue">Choose the product you’re setting up.</span></h2>
            <form>
              <ul className="ul-product-list list-unstyled">
                <li>
                  <div className="product-item">
                    <input type="radio" className="input-hidden" name="choose-product" id="product-softserve" />
                    <label htmlFor="product-softserve">
                      <img src={softphoneServeImage} alt="" />
                      <span className="product-name">Soft Serve Equipment</span>
                    </label>
                  </div>
                </li>
                <li>
                  <div className="product-item">
                    <input type="radio" className="input-hidden" name="choose-product" id="product-grills" />
                    <label htmlFor="product-grills">
                      <img src={grillsImage} alt="" />
                      <span className="product-name">Grills</span>
                    </label>
                  </div>
                </li>
                <li>
                  <div className="product-item">
                    <input type="radio" className="input-hidden" name="choose-product" id="product-ovens" />
                    <label htmlFor="product-ovens">
                      <img src={ovensImage} alt="" />
                      <span className="product-name">Ovens</span>
                    </label>
                  </div>
                </li>
                <li>
                  <div className="product-item">
                    <input type="radio" className="input-hidden" name="choose-product" id="product-fryers" />
                    <label htmlFor="product-fryers">
                      <img src={fryersImage} alt="" />
                      <span className="product-name">Fryers</span>
                    </label>
                  </div>
                </li>
              </ul>
              <div className="btn-wrapper d-inline-block mx-auto">
                <Link className="btn btn-primary has-icon text-uppercase" to="/setup_point_0">
                  <span className="ml-auto">Next</span>
                  <i className="icon icon-angle-right-white icon-right mr-auto" />
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
);
