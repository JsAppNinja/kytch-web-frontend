/* eslint-disable */
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import get from 'lodash.get';

import logo from '../../../shared/img/kytch-logo.png';

export default class TopBar extends PureComponent {

  signOut = (e) => {
    e.stopPropagation();
    console.log('SignOut');
    Auth.signOut()
    .then(() => {
      this.props.onStateChange('signIn');
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    const props = this.props;
    return (
      <header className="main-header">
        <nav className="navbar navbar-left navbar-expand-xl">
          <button className="menu-toggler" onClick={this.props.toggleLeftMenu}>
            <span className="hamburger-box">
              <span className="hamburger-inner" />
            </span>
          </button>
          <div className="main-menu-left">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#">Product</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Technology</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Blog</a>
              </li>
            </ul>
          </div>
        </nav>
        <a className="navbar-brand" href="#"><img src={logo} alt="" /></a>
        <nav className="navbar navbar-right navbar-expand-xl">
          <button className="right-menu-toggler" onClick={this.props.toggleRightMenu}>
            <i className="icon icon-user"></i>
          </button>
          <div className="main-menu-right">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link has-icon" href="#">
                  <i className="icon icon-support icon-left" />
                  <span className="text-wrapper">Help</span>
                </a>
              </li>
              {/* <li className="nav-item">
                <a className="nav-link has-icon" href="#">
                  <i className="icon icon-user icon-left" />
                  <span className="text-wrapper">{get(props, 'authData.attributes.email', '')}</span>
                </a>
              </li> */}
              <li className="nav-item">
                <Link className="nav-link has-icon" to="#" onClick={this.signOut}>
                  <i className="icon icon-user icon-left" />
                  <span className="text-wrapper">Sign Out</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}