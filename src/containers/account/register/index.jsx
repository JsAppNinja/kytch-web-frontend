import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';
import { Link } from 'react-router-dom';

import RegisterForm from './components/RegisterForm';
import img from '../../../shared/img/kytch-logo-white.png';

export default class Register extends Component {
  static propTypes = {
    authState: PropTypes.string,
    onStateChange: PropTypes.func,
  }

  static defaultProps = {
    authState: '',
    onStateChange: () => {},
  }

  state = {
    authError: {},
  }

  onSubmit = async (values) => {
    let { email, password, name, phoneNumber } = values; // eslint-disable-line
    email = email ? email.toLowerCase() : email;
    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
          phone_number: `+${phoneNumber}`,
          name,
        },
      });
      this.props.onStateChange('confirmSignUp', email);
    } catch (err) {
      console.log(err);
      this.setState({ authError: err });
    }
  }

  render() {
    if (this.props.authState !== 'signUp') {
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
              <h2 className="heading text-center">Create account</h2>
              <RegisterForm onSubmit={this.onSubmit} {...this.props} {...this.state} />
            </div>
          </main>
        </div>
      </div>
    );
  }
}
