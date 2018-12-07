/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';
import ConfirmSignInForm from './components/ConfirmSignInForm';

import img from '../../../shared/img/kytch-logo-white.png';

export default class ConfirmSignIn extends Component {

  static propTypes = {
    authState: PropTypes.string,
    onStateChange: PropTypes.func,
  }

  static defaultProps = {
    authState: '',
    onStateChange: () => {}
  }

  state = {
    authError: {}
  }
  
  _validAuthStates = ['confirmSignIn'];

  checkContact = async (user) => {
    try {
      const data = await Auth.verifiedContact(user);
      if (Object.keys(data.unverified).length === 0) {
        this.props.onStateChange('signedIn', user);
      } else {
        user = Object.assign(user, data);
        this.props.onStateChange('verifyContact', user);
      }
    } catch(err) {
      console.log(err);
      this.setState({ authError: err });
    }
  };

  onSubmit = async (values) => {
    const { code } = values;
    const user = this.props.authData;
    var mfaType = user.challengeName === 'SOFTWARE_TOKEN_MFA' ? 'SOFTWARE_TOKEN_MFA' : null;
    try {
      await Auth.confirmSignIn(user, code, mfaType);
      this.checkContact(user);
    } catch(err) {
      console.log(err);
      this.setState({ authError: err });
    }
  }

  render() {
    if (!this._validAuthStates.includes(this.props.authState)) {
      return '';
    }
    const { authData } = this.props;
    const { challengeParam: { CODE_DELIVERY_DELIVERY_MEDIUM, CODE_DELIVERY_DESTINATION }} = authData;
    return (
      <div className="page-login">
        <div className="main-container">
          <div className="logo-wrapper">
            <a className="navbar-brand mx-auto" href="#">
              <img src={img} alt="" />
            </a>
          </div>
          <main>
            <div className="container">
              <h2 className="heading text-center">Enter verification code</h2>
              <p className="intro-text">To sign into your Kytch Account, enter the code sent to your phone number ending in: {CODE_DELIVERY_DESTINATION.substr(-4)}</p>
              <ConfirmSignInForm onSubmit={this.onSubmit} {...this.props} {...this.state} />
              <div className="fixed-bottom text-center">
                <div className="cta-wrapper fixed-bottom text-center">
                  <a className="text-uppercase" href="">Get a kitch kit for your kitchen</a>
                  <span className="add-burst-on-input-focus"></span>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
}
