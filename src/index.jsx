import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import Amplify from 'aws-amplify';
import i18next from 'i18next';
import App from './containers/_app/App';
import store from './containers/_app/store';
import ScrollToTop from './containers/_app/ScrollToTop';
import { config as i18nextConfig } from './translations/index';

i18next.init(i18nextConfig);

Amplify.configure({
  Auth: {
    // REQUIRED - Amazon Cognito Region
    region: 'us-west-2',

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'us-west-2_koLg3TtEM',

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: '7ro6jds1b32tqgshmhelg54i94',

    // authenticationFlowType: 'USER_PASSWORD_AUTH',
  },
});

render(
  <Provider store={store}>
    <BrowserRouter basename="/">
      <I18nextProvider i18n={i18next}>
        <ScrollToTop>
          <App />
        </ScrollToTop>
      </I18nextProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
