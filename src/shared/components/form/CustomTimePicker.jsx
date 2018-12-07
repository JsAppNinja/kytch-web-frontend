import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TimePicker from 'rc-time-picker';
import AvTimerIcon from 'mdi-react/AvTimerIcon';
import classNames from 'classnames';
import moment from 'moment';

class TimePickerField extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    timeMode: PropTypes.bool.isRequired,
    value: PropTypes.number,
  };

  static defaultProps = {
    value: 0,
  };

  state = {
    open: false,
  };

  onChange = (time) => {
    this.props.onChange(parseInt(time.format('HHmm'), 10));
  };

  setOpen = ({ open }) => {
    this.setState({ open });
  };

  toggleOpen = (e) => {
    e.preventDefault();
    this.setState({
      open: !this.state.open,
    });
  };

  render() {
    const { name, timeMode } = this.props;
    const value = this.props.value || 0;
    const btnClass = classNames({
      'form__form-group-button': true,
      active: this.state.open,
    });
    const defaultTime = moment({ hour: Math.floor(value / 100), minute: value % 100 });
    return (
      <div className="form__form-group-field">
        <TimePicker
          open={this.state.open}
          onOpen={this.setOpen}
          onClose={this.setOpen}
          name={name}
          onChange={this.onChange}
          showSecond={false}
          use12Hours={timeMode}
          value={defaultTime}
        />
        <button className={btnClass} onClick={this.toggleOpen}>
          <AvTimerIcon />
        </button>
      </div>
    );
  }
}

const renderTimePickerField = props => (
  <TimePickerField
    {...props.input}
    timeMode={props.timeMode}
  />
);

renderTimePickerField.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    name: PropTypes.string,
  }).isRequired,
  timeMode: PropTypes.bool,
};

renderTimePickerField.defaultProps = {
  timeMode: false,
};

export default renderTimePickerField;
