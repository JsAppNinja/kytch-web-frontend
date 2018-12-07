
import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class LogInForm extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    onStateChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      authError: null,
    };

    this.showPassword = this.showPassword.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.authError !== prevProps.authError) { // eslint-disable-line
      this.setState({ authError: this.props.authError }); // eslint-disable-line
    }
  }

  showPassword = (e) => {
    e.preventDefault();
    this.setState({
      showPassword: !this.state.showPassword,
    });
  }

  signUp = (e) => {
    e.preventDefault();
    this.props.onStateChange('signUp');
  }

  forgotPassword = () => {
    this.props.onStateChange('forgotPassword');
  }

  dismissError = (e) => {
    e.preventDefault();
    this.setState({ authError: null });
  }

  render() {
    const { handleSubmit } = this.props;
    const { authError } = this.state;

    return (
      <form className="colored-bg form-controls-has-icon" onSubmit={handleSubmit}>
        {
          authError && ['userNotFoundException', 'NotAuthorizedException'].includes(authError.code) &&
          <div className="alert alert-info alert-dismissible fade show" role="alert">
            <i className="alert-icon icon-circle" />
            <h4 className="heading">Please try again</h4>
            <p className="allert-message">You entered an incorrect email address or password.</p>
            <button
              type="button"
              className="close alert-dismiss"
              data-dismiss="alert"
              aria-label="Close"
              onClick={this.dismissError}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
        }
        <div className="form-group">
          <i className="icon-thin icon-email icon-absolute-left" />
          {/* <input type="email" className="form-control" placeholder="Email Address"/> */}
          <Field
            name="email"
            component="input"
            type="email"
            placeholder="Email Address"
            className="form-control"
          />
          <span className="add-burst-on-input-focus" />
        </div>
        <div className="form-group">
          <i className="icon-thin icon-password icon-absolute-left" />
          {/* <input type="password" className="form-control" placeholder="Password"/> */}
          <Field
            name="password"
            component="input"
            type="password"
            placeholder="Password"
            className="form-control"
          />
          <span className="add-burst-on-input-focus" />
        </div>
        <button type="submit" className="btn btn-steel-blue font-weight-bold text-uppercase w-100">Sign in</button>
        <br />
        <br />
        <div className="buttons-wrapper d-flex justify-content-between">
          <Link className="" to="/" onClick={this.forgotPassword}>Forgot Password?</Link>
          <Link className="has-icon" to="/" onClick={this.signUp}>
            <span className="text-wrapper">Create Account</span>
            <i className="icon icon-angle-right-white icon-right" />
          </Link>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'log_in_form', // a unique identifier for this form
})(LogInForm);
