/* eslint-disable */
import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';

class LogInForm extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    authState: PropTypes.string,
    onStateChange: PropTypes.func,
  }

  static defaultProps = {
    authState: '',
    onStateChange: () => {}
  }

  constructor(props) {
    super(props);
    this.state = {
      authError: null,
      dismissError: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.authError !== prevProps.authError) {
      this.setState({ authError: this.props.authError });
    }
  }

  signIn = (e) => {
    e.preventDefault();
    this.props.onStateChange('signIn');
  }

  dismissError = (e) => {
    e.preventDefault();
    this.setState({ authError: null });
  }
  
  render() {
    const { handleSubmit } = this.props;
    const { authError, dismissError } = this.state;

    return (
      <form className="colored-bg" onSubmit={handleSubmit}>
        {
          !dismissError && authError && authError.code === "CodeMismatchException" &&
          <div className="alert alert-info alert-dismissible fade show" role="alert">
            <i className="alert-icon icon-circle"></i>
            <h4 className="heading">Please try again</h4>
            <p className="allert-message">You entered incorrect code</p>
            <button type="button" className="close alert-dismiss" data-dismiss="alert" aria-label="Close" onClick={this.dismissError}>
              <span aria-hidden="true">×</span>
            </button>
          </div>
        }
        <div className="form-groups form-controls-has-icon">
          <div className="form-group">
            <Field
              name="code"
              component="input"
              type="text"
              placeholder=""
              className="form-control"
            />
            {/* <input type="text" className="form-control form-control-verification-code" value="7" /> */}
            <span className="add-burst-on-input-focus" />
          </div>
        </div>
        <div className="buttons-wrapper two-buttons d-sm-flex justify-content-sm-between">
          {/* <button type="submit" className="btn btn-steel-blue font-weight-bold text-uppercase w-100">Send a new code</button> */}
          <button type="submit" className="btn btn-steel-blue font-weight-bold text-uppercase w-100">Sign in</button>
        </div>
        <br />
        <div className="buttons-wrapper two-buttons d-sm-flex justify-content-sm-between">
          <a className="has-icon" href="#" onClick={this.signIn}>
            <i className="icon icon-angle-left-white icon-left" />
            <span className="text-wrapper">Switch Account</span>
          </a>
          <a className="has-icon" href="#">
            <span className="text-wrapper">Having Trouble?</span>
            <i className="icon icon-angle-right-white icon-right" />
          </a>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'confirm_log_in_form', // a unique identifier for this form
})(LogInForm);
