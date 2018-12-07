/* eslint-disable */
import React, { PureComponent } from 'react';
import { Field, reduxForm, getFormSyncWarnings, getFormSyncErrors, getFormSubmitErrors, getFormMeta } from 'redux-form';

import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';
import validate from './validate';

const infos = {
  password: 'Use at least 8 characters, including upper and lowercase letters, numbers and symbols.',
}

const renderField = ({
  input, placeholder, type, meta: { touched, error },
}) => (
  <div className={`form__form-group-input-wrap form-group ${(touched && error) ? 'is-invalid' : ''} ${(touched && !error) ? 'is-valid' : ''}`}>
    <input {...input} placeholder={placeholder} type={type} className="form-control"/>
  </div>
);

class ResetPasswordForm extends PureComponent {
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
    authError: null,
    dismissAuthError: false,
    syncErrors: {},
    submitErrors: {},
    dismissErrors: false,
    fields: {},
    dismissInfos: false,
  }

  componentDidUpdate(prevProps) {
    if (this.props.authError !== prevProps.authError) {
      this.setState({ authError: this.props.authError, dismissAuthError: false });
    }
    if (this.props.syncErrors !== prevProps.syncErrors) {
      this.setState({ syncErrors: this.props.syncErrors });
    }
    if (this.props.submitErrors !== prevProps.submitErrors) {
      this.setState({ submitErrors: this.props.submitErrors });
    }
    if (this.props.fields !== prevProps.fields) {
      this.setState({ fields: this.props.fields });
    }
  }

  signIn = (e) => {
    e.preventDefault();
    this.props.onStateChange('signIn');
  }

  sendVerificationCode = async () => {
    try {
      await Auth.forgotPassword(this.props.username);
    } catch(err) {
      console.log(err);
      this.setState({ authError: err });
    }
  }

  dismissInfos = () => {
    this.setState({
      dismissedInfos: true,
    });
  }

  dismissErrors = () => {
    this.setState({
      dismissErrors: true,
    });
  }

  dismissAuthError = () => {
    this.setState({
      dismissAuthError: true,
    });
  }

  render() {
    const { 
      handleSubmit,
      anyTouched,
      submitFailed,
    } = this.props;
    const {
      authError,
      syncErrors,
      fields,
      dismissInfos,
      dismissErrors,
      dismissAuthError,
    } = this.state;
    // Get active field
    let activeFieldName = null, errorFieldName = null;
    Object.keys(fields).forEach((key) => {
      if (fields[key].active) {
        activeFieldName = key;
      }
    });
    let syncErrorMessage, submitErrorMessage;
    if (anyTouched || submitFailed) {
      Object.keys(syncErrors).forEach(key => {
        if ((submitFailed || fields[key] && fields[key].visited && !fields[key].active) && syncErrors[key]) {
          syncErrorMessage = syncErrorMessage || syncErrors[key];
        }
      });
    }
    return (
      <form className="colored-bg form-controls-has-icon" onSubmit={handleSubmit}>
        {
          !dismissInfos && activeFieldName && (!syncErrorMessage || dismissErrors) && infos[activeFieldName] && 
          <div className="alert alert-info alert-dismissible fade show" role="alert">
            <i className="alert-icon icon-circle"></i>
            <p className="allert-message">{infos[activeFieldName]}</p>
            <button type="button" className="close alert-dismiss" data-dismiss="alert" aria-label="Close" onClick={this.dismissInfos}>
              <span aria-hidden="true">×</span>
            </button>
          </div>
        }
        {
          !dismissErrors && anyTouched && syncErrorMessage &&
          <div className="alert alert-warning alert-dismissible fade show" role="alert">
            <i className="alert-icon icon-circle"></i>
            <p className="allert-message">{syncErrorMessage}</p>
            <button type="button" className="close alert-dismiss" data-dismiss="alert" aria-label="Close" onClick={this.dismissErrors}>
              <span aria-hidden="true">×</span>
            </button>
          </div>
        }
        {
          !dismissAuthError && authError &&
          <div className="alert alert-info alert-dismissible fade show" role="alert">
            <i className="alert-icon icon-circle"></i>
            <p className="allert-message">{authError.message || authError}</p>
            <button type="button" className="close alert-dismiss" data-dismiss="alert" aria-label="Close" onClick={this.dismissAuthError}>
              <span aria-hidden="true">×</span>
            </button>
          </div>
        }
        <div className="form-group">
          <i className="icon-thin icon-code icon-absolute-left"></i>
          <Field
            name="code"
            component="input"
            type="text"
            placeholder="Code"
            className="form-control"
          />
          <span className="add-burst-on-input-focus"></span>
        </div>
        <div className="form-group">
          <Field
            name="password"
            component={renderField}
            type="password"
            placeholder="Password"
            className="form-control"
          />
          <i className="icon-thin icon-password icon-absolute-left" />
          <span className="add-burst-on-input-focus" />
        </div>
        <button type="submit" className="btn btn-steel-blue text-uppercase w-100">Confirm</button>
        <br/><br/>
        <div className="buttons-wrapper d-flex justify-content-between">
          <a className="" href="#" onClick={this.sendVerificationCode}>Send again</a>
          <a className="has-icon" href="#" onClick={this.signIn}>
            <i className="icon icon-angle-left-white icon-left" />
            <span className="text-wrapper">Sign In</span>
          </a>
        </div>
        
      </form>
    )
  }
}

let ResetPasswordFormWithErrors = connect(state => ({
  syncErrors: getFormSyncErrors('reset_password_form')(state),
  syncWarnings: getFormSyncWarnings('reset_password_form')(state),
  submitErrors: getFormSubmitErrors('reset_password_form')(state),
  fields: getFormMeta('reset_password_form')(state)
}))(ResetPasswordForm);

export default reduxForm({
  form: 'reset_password_form', // a unique identifier for this form
  validate,
  enableReinitialize: true,
})(ResetPasswordFormWithErrors);
