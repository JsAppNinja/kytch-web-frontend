/* eslint-disable */
import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';

class UserNameForm extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    authState: PropTypes.string,
    onStateChange: PropTypes.func,
    authError: PropTypes.any,
  };

  static defaultProps = {
    authState: '',
    onStateChange: () => {},
    authError: null,
  }

  constructor(props) {
    super(props);
  }

  state = {
    dismissError: false,
    authError: {},
  }

  componentDidUpdate(prevProps) {
    if (this.props.authError !== prevProps.authError) {
      this.setState({ authError: this.props.authError, dismissError: false });
    }
  }

  signIn = () => {
    this.props.onStateChange('signIn');
  }

  dismissError = (e) => {
    this.setState({ dismissError: true });
  }

  render() {
    const { handleSubmit } = this.props;
    const { authError, dismissError } = this.state;
    return (
      <form className="colored-bg form-controls-has-icon" onSubmit={handleSubmit}>
        {
          !dismissError && authError && authError.message &&
          <div className="alert alert-info alert-dismissible fade show" role="alert">
            <i className="alert-icon icon-circle"></i>
            <h4 className="heading">Please try again</h4>
            <p className="allert-message">{authError.message}</p>
            <button type="button" className="close alert-dismiss" data-dismiss="alert" aria-label="Close" onClick={this.dismissError}>
              <span aria-hidden="true">×</span>
            </button>
          </div>
        }
        <div className="form-group">
          <i className="icon-thin icon-email icon-absolute-left"></i>
          <Field
            name="email"
            component="input"
            type="email"
            placeholder="Email Address"
            className="form-control"
          />
          <span className="add-burst-on-input-focus"></span>
        </div>
        <button type="submit" className="btn btn-steel-blue text-uppercase w-100">Confirm</button>
        <br/><br/>
        <div className="buttons-wrapper d-flex justify-content-between">
          <a className="has-icon" href="#" onClick={this.signIn}>
            <i className="icon icon-angle-left-white icon-left" />
            <span className="text-wrapper">SignIn</span>
          </a>
        </div>
        
      </form>
    )
  }
}

export default reduxForm({
  form: 'user_name_form', // a unique identifier for this form
})(UserNameForm);
