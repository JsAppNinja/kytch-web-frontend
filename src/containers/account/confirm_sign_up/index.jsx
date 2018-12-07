/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';

import ConfirmSignUpForm from './components/ConfirmSignUpForm';

import img from '../../../shared/img/kytch-logo-white.png';

export default class ConfirmSignUp extends Component {
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
  }

  onSubmit = async (values) => {
    const { email, code } = values;
    try {
      await Auth.confirmSignUp(email, code, {});
      this.props.onStateChange('signedUp');
    } catch (err) {
      console.log(err);
      this.setState({ authError: err });
    }
  }

  render() {
    if (this.props.authState !== 'confirmSignUp') {
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
              <h2 className="heading text-center">User Confirmation</h2>
              <ConfirmSignUpForm onSubmit={this.onSubmit} {...this.props} {...this.state} initialValues={{
                email: this.props.authData
              }} />
            </div>
          </main>
        </div>
      </div>
    )
  }
}
