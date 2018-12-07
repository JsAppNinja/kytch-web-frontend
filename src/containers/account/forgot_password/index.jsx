/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';

import UserNameForm from './components/UserNameForm';
import ResetPasswordForm from './components/ResetPasswordForm';

// import { Link } from 'react-router-dom';
// import RegisterForm from './components/RegisterForm';
import img from '../../../shared/img/kytch-logo-white.png';

export default class ForgotPassword extends Component {
  static propTypes = {
    authState: PropTypes.string,
    onStateChange: PropTypes.func,
  }

  static defaultProps = {
    authState: '',
    onStateChange: () => {}
  }

  state = {
    authError: null,
    delivery: null,
    username: null,
  }

  componentDidUpdate(prevProps) {
    if (this.props.authState !== prevProps.authState) {
      this.setState({ username: null, delivery: null, authError: null });
    }
  }
  _validAuthStates = ['forgotPassword'];

  onUserNameSubmit = async (values) => {
    let { email } = values;
    email = email ? email.toLowerCase() : email;
    this.setState({ username: email });
    try {
      const delivery = await Auth.forgotPassword(email);
      this.setState({ delivery, authError: null });
    } catch(err) {
      console.log(err);
      this.setState({ authError: err });
    }
  }

  onResetPasswordSubmit = async (values) => {
    const { code, password } = values;
    try {
      await Auth.forgotPasswordSubmit(this.state.username, code, password);
      this.setState({ authError: null, authError: null });
      this.props.onStateChange('signIn');
    } catch(err) {
      console.log(err);
      this.setState({ authError: err });
    }
  }

  render() {
    if (!this._validAuthStates.includes(this.props.authState)) {
      return '';
    }
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
              <h2 className="heading text-center">Forgot Password</h2>
              <p className="intro-text">
              {
                this.state.delivery && this.state.delivery.CodeDeliveryDetails 
                  ? this.state.delivery.CodeDeliveryDetails.AttributeName === 'phone_number' 
                    ? `Enter the code sent to your phone number ${this.state.delivery.CodeDeliveryDetails.Destination} and new password`
                    : `Enter the code sent to your email address and new password`
                  : 'Enter your email address'
              }
              </p>
              {
                this.state.delivery 
                  ? <ResetPasswordForm onSubmit={this.onResetPasswordSubmit} {...this.props} {...this.state} />
                  : <UserNameForm onSubmit={this.onUserNameSubmit} {...this.props} {...this.state} />
              }
            </div>
          </main>
        </div>
      </div>
    )
  }
}
