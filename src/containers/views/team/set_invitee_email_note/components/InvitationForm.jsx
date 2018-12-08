/* eslint-disable */
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, getFormSyncErrors, getFormSubmitErrors, getFormMeta } from 'redux-form';
import PropTypes from 'prop-types';
import validate from './validate';

const renderField = ({
  input, placeholder, type, meta: { touched, error },
}) => (
  <div className={`form__form-group-input-wrap form-group ${(touched && error) ? 'is-invalid' : ''} ${(touched && !error) ? 'is-valid' : ''}`}>
    <input {...input} placeholder={placeholder} type={type} className="form-control"/>
  </div>
);

const renderTextField = ({
  input, placeholder, type, meta: { touched, error },
}) => (
  <Fragment>
    <textarea 
      {...input}
      className="form-control"
      placeholder="Add a personal message (optional)"
      maxLength={250}
    ></textarea>
    <br />
    <p className="small text-center">Characters remaining: {250 - input.value.length}</p>
  </Fragment>
)
class InvitationForm extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    anyTouched: PropTypes.bool.isRequired,
    fields: PropTypes.shape().isRequired,
    syncErrors: PropTypes.shape().isRequired,
  }

  static defaultProps = {
    authState: '',
    onStateChange: () => {}
  }

  constructor(props) {
    super(props);
    this.state = {
      dismissError: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.syncErrors !== prevProps.syncErrors) {
      this.setState({ syncErrors: this.props.syncErrors });
    }
    if (this.props.submitErrors !== prevProps.submitErrors) {
      this.setState({ submitErrors: this.props.submitErrors, dismissError: false });
    }
  }
  
  dismissError = () => {
    this.setState({ dismissError: true });
  }

  render() {
    const { 
      handleSubmit,
      anyTouched,
      submitFailed,
    } = this.props;
    
    const {
      syncErrors,
      fields,
    } = this.props;
    let syncErrorMessage;
    if (anyTouched || submitFailed) {
      Object.keys(syncErrors).forEach(key => {
        if ((submitFailed || fields[key] && fields[key].visited && !fields[key].active) && syncErrors[key]) {
          syncErrorMessage = syncErrorMessage || syncErrors[key];
        }
      });
    }

    return (
      <form className="" onSubmit={handleSubmit}>
        {
          !this.state.dismissError && syncErrorMessage &&
          <div className="alert alert-warning alert-dismissible fade show" role="alert">
            <i className="alert-icon icon-circle"></i>
            <p className="allert-message">{syncErrorMessage}</p>
            <button type="button" className="close alert-dismiss" data-dismiss="alert" aria-label="Close" onClick={this.dismissError}>
              <span aria-hidden="true">×</span>
            </button>
          </div>
        }
        
        <div className="form-group">
          <Field
            name="email"
            component={renderField}
            type="email"
            className="form-control"
          />
          <span className="add-burst-on-input-focus"></span>
        </div>
        <div className="form-group">
          <Field
            name="note"
            component={renderTextField}
            type="text"
            className="form-control"
          />
          {/* <textarea className="form-control" placeholder="Add a personal message (optional)"></textarea> */}
          <span className="add-burst-on-input-focus"></span>
        </div>
        {/* <p className="small text-center">Characters remaining: 250</p> */}
        <br/>
        <div className="button-wrapper text-center">
          <button type="submit" className="btn btn-primary btn-min-width-long text-uppercase">Send</button>
        </div>
      </form>
    );
  }
}

let InvitationFormWithErrors = connect(state => ({
  syncErrors: getFormSyncErrors('team_invitation_form')(state),
  submitErrors: getFormSubmitErrors('team_invitation_form')(state),
  fields: getFormMeta('team_invitation_form')(state)
}))(InvitationForm);

export default reduxForm({
  form: 'team_invitation_form', // a unique identifier for this form
  validate,
  enableReinitialize: true,
})(InvitationFormWithErrors);
