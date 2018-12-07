/* eslint-disable */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NotificationSystem from 'rc-notification';
import get from 'lodash.get';
import Topbar from './topbar/index';
import { BasicNotification } from '../../shared/components/Notification';

let notification = null;

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

class Layout extends Component {
  static propTypes = {
  };

  state = {
    showRightMenu: false,
    showLeftMenu: false,
  }

  componentDidMount() {
    NotificationSystem.newInstance({}, n => notification = n);
  }

  componentWillUnmount() {
    notification.destroy();
  }

  toggleRightMenu = (e) => {
    e.stopPropagation();
    this.setState({ showRightMenu: !this.state.showRightMenu });
  };

  toggleLeftMenu = (e) => {
    e.stopPropagation();
    this.setState({ showLeftMenu: !this.state.showLeftMenu });
  };

  resetMenu = (e) => {
    this.setState({ showLeftMenu: false, showRightMenu: false});
  };

  render() {
    return (
      <div onClick={this.resetMenu} className={`main-container ${this.state.showRightMenu ? 'show-right-menu' : ''} ${this.state.showLeftMenu ? 'show-left-menu' : ''}`}>
        <Topbar {...this.props} toggleRightMenu={this.toggleRightMenu} toggleLeftMenu={this.toggleLeftMenu}/>
        {this.props.children}
      </div>
    );
  }
}

export default withRouter(Layout);
