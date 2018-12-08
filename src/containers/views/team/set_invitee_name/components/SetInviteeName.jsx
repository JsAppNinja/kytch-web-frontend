/* eslint-disable */
import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import validate from './validate';

const renderField = ({
  input, placeholder, type, meta: { touched, error },
}) => (
  <div className={`form__form-group-input-wrap form-group ${(touched && error) ? 'is-invalid' : ''} ${(touched && !error) ? 'is-valid' : ''}`}>
    <input {...input} placeholder={placeholder} type={type} className="form-control"/>
  </div>
);

class SetNameForm extends PureComponent {
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
  
  render() {
    const { handleSubmit } = this.props;

    return (
      <form className="" onSubmit={handleSubmit}>
        <div className="form-group">
          <Field
            name="address"
            type="text"
            component={renderField}
            className="form-control"
            defaultValue="Michael"
          />
          <span className="add-burst-on-input-focus"></span>
        </div>
        <br/>
        <div className="button-wrapper text-center">
          <button type="submit" className="btn btn-primary btn-min-width-long text-uppercase">Continue</button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'team_invitee_name', // a unique identifier for this form
  validate,
})(SetNameForm);
