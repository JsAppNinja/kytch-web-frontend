import React, { Component } from 'react';
import { Authenticator } from 'aws-amplify-react';
import get from 'lodash.get';
import { withRouter } from 'react-router-dom';
// eslint-disable-next-line
import { hot } from 'react-hot-loader';
import 'bootstrap/dist/css/bootstrap.css';

import { BasicNotification } from '../../shared/components/Notification';

import LogIn from '../account/log_in/index';
import SignUp from '../account/register/index';
import ConfirmSignUp from '../account/confirm_sign_up/index';
import ConfirmSignIn from '../account/confirm_sigin_in/index';
import ForgotPassword from '../account/forgot_password/index';

import '../../scss/app.scss';
import Router from './Router';

let notification;

export const showNotification = ({
  title,
  message,
}) => {
  notification.notice({
    content: <BasicNotification
      title={title}
      message={message}
    />,
    duration: 5,
    closable: true,
    style: { top: 0, left: 'calc(100vw - 100%)' },
    className: 'right-up',
  });
};

export const showErrorNotification = (err) => {
  notification.notice({
    content: <BasicNotification
      color="danger"
      title="Error"
      message={get(err, 'response.data.message', err.message).replace(/_/g, ' ')}
    />,
    duration: 5,
    closable: true,
    style: { top: 0, left: 'calc(100vw - 100%)' },
    className: 'right-up',
  });
};

class App extends Component {
  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    // const { loaded, loading } = this.state;
    return (
      <Authenticator
        // Optionally hard-code an initial state
        authState="signIn"
        // Fired when Authentication State changes
        // or hide all the default components
        hideDefault
      >
        <LogIn />
        <SignUp />
        <ConfirmSignUp />
        <ConfirmSignIn />
        <ForgotPassword />
        {/* <VerifyContact/> */}
        {/* <TOTPSetup/> */}
        <Router />
      </Authenticator>
    );
  }
}

export default hot(module)(withRouter(App));
