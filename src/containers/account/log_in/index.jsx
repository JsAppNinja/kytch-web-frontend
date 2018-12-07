import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';
import { Link } from 'react-router-dom';

import LogInForm from './components/LogInForm';
import img from '../../../shared/img/kytch-logo-white.png';

export default class LogIn extends Component {
  static propTypes = {
    authState: PropTypes.string,
    onStateChange: PropTypes.func,
  }

  static defaultProps = {
    authState: '',
    onStateChange: () => {},
  }

  constructor(props) {
    super(props);
    this.state = {
      authError: {},
    };
    this.validAuthStates = ['signIn', 'signedOut', 'signedUp'];
  }

  onSubmit = async (values) => {
    let { email, password } = values; // eslint-disable-line
    email = email ? email.toLowerCase() : email;
    try {
      const user = await Auth.signIn(email ? email.toLowerCase() : email, password);
      if (user.challengeName === 'SMS_MFA' || user.challengeName === 'SOFTWARE_TOKEN_MFA') {
        console.log(`confirm user with ${user.challengeName}`);
        this.props.onStateChange('confirmSignIn', user);
      } else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        console.log('require new password', user.challengeParam);
        this.props.onStateChange('requireNewPassword', user);
      } else if (user.challengeName === 'MFA_SETUP') {
        console.log('TOTP setup', user.challengeParam);
        this.props.onStateChange('TOTPSetup', user);
      } else {
        this.checkContact(user);
      }
    } catch (err) {
      console.log(err);
      this.setState({ authError: err });
      if (err.code === 'UserNotConfirmedException') {
        this.props.onStateChange('confirmSignUp', email);
      }
    }
  }

  checkContact = (user) => {
    Auth.verifiedContact(user)
      .then((data) => {
        if (data.verified) {
          this.props.onStateChange('signedIn', user);
        } else {
          this.props.onStateChange('verifyContact', Object.assign(user, data));
        }
      });
  };

  render() {
    if (!this.validAuthStates.includes(this.props.authState)) {
      return '';
    }
    return (
      <div className="page-login">
        <div className="main-container">
          <div className="logo-wrapper">
            <Link className="navbar-brand mx-auto" to="/">
              <img src={img} alt="" />
            </Link>
          </div>
          <main>
            <div className="container">
              <h2 className="heading text-center">Easy as Kytch</h2>
              <LogInForm onSubmit={this.onSubmit} {...this.props} {...this.state} />
              <div className="fixed-bottom text-center">
                <div className="cta-wrapper fixed-bottom text-center">
                  <Link className="text-uppercase" to="/">Get a kitch kit for your kitchen</Link>
                  <span className="add-burst-on-input-focus" />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
}
