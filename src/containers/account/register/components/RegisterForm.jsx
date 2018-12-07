/* eslint-disable */
import React, { PureComponent } from 'react';
import { Field, reduxForm, getFormSyncWarnings, getFormSyncErrors, getFormSubmitErrors, getFormMeta } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createNumberMask, createTextMask } from 'redux-form-input-masks';
import validate from './validate';
const phoneMask = createTextMask({
  pattern: '+9-999-999-9999',
});

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

renderField.propTypes = {
  input: PropTypes.shape().isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
};

renderField.defaultProps = {
  placeholder: '',
  meta: null,
  type: 'text',
};

class RegisterForm extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    authState: PropTypes.string.isRequired,
    onStateChange: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    anyTouched: PropTypes.bool.isRequired,
    fields: PropTypes.shape().isRequired,
    authError: PropTypes.shape().isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      authError: {},
      dismissAuthError: false,
      syncErrors: {},
      submitErrors: {},
      dismissErrors: false,
      fields: {},
      dismissInfos: false,
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.syncErrors !== prevProps.syncErrors) {
      this.setState({ syncErrors: this.props.syncErrors });
    }
    if (this.props.submitErrors !== prevProps.submitErrors) {
      this.setState({ submitErrors: this.props.submitErrors });
    }
    if (this.props.fields !== prevProps.fields) {
      this.setState({ fields: this.props.fields });
    }
    if (this.props.authError !== prevProps.authError) {
      this.setState({ authError: this.props.authError, dismissAuthError: false });
    }
  }
  signIn = (e) => {
    e.preventDefault();
    this.props.onStateChange('signIn');
  }

  dismissInfos = (activeFieldName) => {
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
          !dismissAuthError && authError && authError.message && authError.code !== "UsernameExistsException" &&
          <div className="alert alert-info alert-dismissible fade show" role="alert">
            <i className="alert-icon icon-circle"></i>
            <p className="allert-message">{authError.message}</p>
            <button type="button" className="close alert-dismiss" data-dismiss="alert" aria-label="Close" onClick={this.dismissAuthError}>
              <span aria-hidden="true">×</span>
            </button>
          </div>
        }
        {
          !dismissAuthError && authError && authError.code === "UsernameExistsException" && 
          <div className="alert alert-info alert-dismissible fade show" role="alert">
            <i className="alert-icon icon-circle"></i>
            <h4 className="heading">Account exists</h4>
            <p className="allert-message">This Kytch Account already exists.</p>
            <button type="button" className="close alert-dismiss" data-dismiss="alert" aria-label="Close" onClick={this.dismissAuthError}>
              <span aria-hidden="true">×</span>
            </button>
          </div>
        }
        <div className="form-group">
          <Field
            name="email"
            component={renderField}
            type="email"
            placeholder="Email Address"
            className="form-control"
          />
          <i className="icon-thin icon-email icon-absolute-left" />
          <span className="add-burst-on-input-focus" />
        </div>
        <div className="form-group">
          <Field
            name="name"
            component={renderField}
            type="text"
            placeholder="Name"
            className="form-control"
          />
          <i className="icon-thin icon-user icon-absolute-left" />
          <span className="add-burst-on-input-focus" />
        </div>
        <div className="form-group">
          <i className="icon-thin icon-telephone icon-absolute-left" />
          <Field
            name="phoneNumber"
            component={renderField}
            type="telephone"
            placeholder="Phone Number"
            className="form-control"
            {...phoneMask}
          />
          <span className="add-burst-on-input-focus" />
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
        <div className="form-group">
          <Field
            name="passwordConfirmation"
            component={renderField}
            type="password"
            placeholder="Password Confirmation"
            className="form-control"
          />
          <i className="icon-thin icon-password icon-absolute-left" />
          <span className="add-burst-on-input-focus" />
        </div>
        <p className="notice-text">You agree to the <a className="custom-underline" href="#" target="_blank">Terms of Service</a> and have read the <a className="custom-underline" href="#" target="_blank">Privacy policy</a></p>
        <button type="submit" className="btn btn-steel-blue text-uppercase w-100">Sign up</button>
        <br /><br />
        <a className="has-icon" href="#" onClick={this.signIn}>
          <i className="icon icon-angle-left-white icon-left" />
          <span className="text-wrapper">Sign in</span>
        </a>
      </form>
    )
  }
}



let RegisterFormWithErrors = connect(state => ({
  syncErrors: getFormSyncErrors('register_form')(state),
  syncWarnings: getFormSyncWarnings('register_form')(state),
  submitErrors: getFormSubmitErrors('register_form')(state),
  fields: getFormMeta('register_form')(state)
}))(RegisterForm);

RegisterFormWithErrors = reduxForm({
  form: 'register_form', // a unique identifier for this form
  validate,
  enableReinitialize: true,
})(RegisterFormWithErrors);
export default RegisterFormWithErrors;