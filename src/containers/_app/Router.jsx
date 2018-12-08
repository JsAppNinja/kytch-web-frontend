import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Layout from '../_layout/index';
import NotFound404 from '../default_page/404/index';
import AddProduct from '../views/add_product';
import SetupPoint0 from '../views/setup_point_0';
import SetupPoint1 from '../views/setup_point_1';
import SetupPoint2 from '../views/setup_point_2';
import SetupPoint3 from '../views/setup_point_3';
import SetupPoint4 from '../views/setup_point_4';
import SetupPoint5 from '../views/setup_point_5';
import SetupPoint6 from '../views/setup_point_6';
import SetupPoint7 from '../views/setup_point_7';
import SetupPoint8 from '../views/setup_point_8';

// Team pages

import TeamStart from '../views/team/start';
import SetInviteeName from '../views/team/set_invitee_name';
import SetInviteeEmailAndNote from '../views/team/set_invitee_email_note';
import AccountList from '../views/team/account_list';


const teamRoutes = () => (
  <Switch>
    <Route exact path="/team/start" component={TeamStart} />
    <Route exact path="/team/invitee_name" component={SetInviteeName} />
    <Route exact path="/team/invitee_email_note" component={SetInviteeEmailAndNote} />
    <Route exact path="/team/account_list" component={AccountList} />
    <Route exact path="/team" component={TeamStart} />
    <Route component={NotFound404} />
  </Switch>
);

const wrappedRoutes = () => (
  <Fragment>
    <Switch>
      <Route path="/team" component={teamRoutes} />
      <Route exact path="/setup_point_0" component={SetupPoint0} />
      <Route exact path="/setup_point_1" component={SetupPoint1} />
      <Route exact path="/setup_point_2" component={SetupPoint2} />
      <Route exact path="/setup_point_3" component={SetupPoint3} />
      <Route exact path="/setup_point_4" component={SetupPoint4} />
      <Route exact path="/setup_point_5" component={SetupPoint5} />
      <Route exact path="/setup_point_6" component={SetupPoint6} />
      <Route exact path="/setup_point_7" component={SetupPoint7} />
      <Route exact path="/setup_point_8" component={SetupPoint8} />
      <Route exact path="/" component={AddProduct} />
      <Route component={NotFound404} />
    </Switch>
  </Fragment>
);


export default class Router extends Component {
  static propTypes = {
    authState: PropTypes.string,
  }

  static defaultProps = {
    authState: '',
  }

  constructor(props) {
    super(props);
    this._validAuthStates = ['signedIn']; // eslint-disable-line
  }
  render() {
    if (this.props.authState !== 'signedIn') return '';
    return (
      <Layout {...this.props}>
        <Route path="/" component={wrappedRoutes} />
      </Layout>
    );
  }
}
