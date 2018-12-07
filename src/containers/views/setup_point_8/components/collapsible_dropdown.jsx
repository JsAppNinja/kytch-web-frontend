/* eslint-disable */
import React, { Component, Fragment } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CollapsibleDropdown extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    return (
      <li className={"collapsible-dropdown " + (this.state.collapse ? 'active' : '')}>
        <a className={!this.state.collapse ? 'collapsed' : ''} onClick={this.toggle}>{this.props.title}</a>
        <Collapse isOpen={this.state.collapse}>
          <ul className="ul-collapsible-dropdown" id="collapseAsia">
            {
              this.props.list.map((value, index) => <li key={index}><Link to="#">{value}</Link></li>)
            }
          </ul>
        </Collapse>
      </li>
    );
  }
}

export default CollapsibleDropdown;