/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Radio from 'react-bootstrap/lib/Radio';
import FieldTypes from './fieldtypes';
import Utils from './utils';


class Field extends React.Component {
  /**
   * get the corresponding validation state based on the value returned from the function
   * @param value the integer with values according to react-bootstrap state enum
   * @returns {string} of the corresponding state for the field
   */
  static getValidationStateString(value) {
    let stringValidState;
    switch (value) {
      case 2:
        stringValidState = 'warning';
        break;
      case 1:
      case true:
        stringValidState = 'success';
        break;
      case 0:
      case false:
        stringValidState = 'error';
        break;
      default:
        stringValidState = null;
        break;
    }
    return stringValidState;
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.reset = this.reset.bind(this);
    this.updateCurrentState = this.updateCurrentState.bind(this);
    this.getValidationState = this.getValidationState.bind(this);
    this.reset = this.reset.bind(this);
    this.state = { value: '', selected: 0 };
  }

  /**
   * reset the store when new props are received
   */
  componentDidMount() {
    this.reset();
  }

  // when a new props is received or state we check if the reset has been changed
  componentDidUpdate(prevProps) {
    if (this.props.reset !== prevProps.reset) {
      this.reset();
    }
    // Return null to indicate no change to state.
    return null;
  }

  // call the static function that with an integer input will return the according validation state
  getValidationState() {
    return Field.getValidationStateString(this.props.validateFunction(this.state.value));
  }

  // when I want to update the state of this field you need to change
  // the state and notifiy parent "form" component
  updateCurrentState(setTo) {
    this.setState({ value: setTo, selected: setTo });
    this.props.onChangeValue(setTo);
  }

  // after a change on the field by user input we update the value in the store and notify the parent
  handleChange(e) {
    if (this.props.type === FieldTypes.CHECKBOX) {
      this.updateCurrentState(e.target.checked.toString());
    } else {
      this.updateCurrentState(e.target.value);
    }
  }

  /**
   * when reset props changes we reset the state value -> textbox or selected value
    */
  reset() {
    this.updateCurrentState('');
  }

  render() {
    const field = [];
    const options = [];
    const { name } = this.props;
    switch (this.props.type) {
      case FieldTypes.RADIO:
        this.props.values.map(value => (
          field.push(<Radio key={Utils.generateKey(name + value)} onClick={this.handleChange} name={name}>{value}</Radio>)
        ));
        break;
      case FieldTypes.CHECKBOX:
        this.props.values.map(value => (
          field.push(<Checkbox key={Utils.generateKey(name + value)} onClick={this.handleChange} name={name}>{value}</Checkbox>)
        ));
        break;
      case FieldTypes.SELECT:
        options.push(<option key={Utils.generateKey('')} value={null}>{null}</option>);
        this.props.values.map(value => (
          options.push(<option key={Utils.generateKey(value)} value={value}>{value}</option>)
        ));
        field.push(<FormControl value={this.state.selected} key={Utils.generateKey(name)} componentClass="select" onChange={this.handleChange}>{options}</FormControl>);
        break;
      case FieldTypes.TEXT:
      default:
        field.push(<FormControl
          name={name}
          type={this.props.type}
          placeholder={this.props.placeholder}
          onChange={this.handleChange}
          value={this.state.value}
          key={Utils.generateKey(`field${name}`)}
          autoComplete="off"
        />);
        break;
    }// switch FieldTypes

    return (
      <FormGroup validationState={this.getValidationState()}>
        <ControlLabel>{this.props.label}</ControlLabel>
        {this.props.help && <HelpBlock>{this.props.help}</HelpBlock>}
        {field}
      </FormGroup>
    );
  }
}

Field.propTypes = {
  validateFunction: PropTypes.func.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  help: PropTypes.string,
  type: PropTypes.oneOf(Object.values(FieldTypes)),
  values: PropTypes.arrayOf(String),
  reset: PropTypes.bool,
};

Field.defaultProps = {
  name: '',
  label: 'Field',
  placeholder: '',
  help: '',
  type: FieldTypes.TEXT,
  values: [],
  reset: false,
};

export default (Field);
