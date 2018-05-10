import React from 'react';
import assert from 'assert';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import { ControlLabel, FormGroup, HelpBlock } from 'react-bootstrap';

import Field from '../../../src/components/custom/Field';
import FieldTypes from '../../../src/components/custom/fieldtypes';

describe('FieldTypes', () => {
  // 89
  it('should return array of types', () => {
    const nTypes = Object.keys(FieldTypes).length;
    assert.equal(nTypes, 4);
  });
});

describe('Field component', () => {
  // 90
  it('should save correct props', () => {
    const wrapper = mount(<Field
      name="form1"
      label="field1"
      placeholder="placeholder1"
      help="help1"
      type={FieldTypes.TEXT}
      values={['oneVal', 'twoVal']}
      reset
      onChangeValue={e => e}
      validateFunction={e => e}
    />);
    expect(wrapper.props().name).to.equal('form1');
    expect(wrapper.props().label).to.equal('field1');
    expect(wrapper.props().placeholder).to.equal('placeholder1');
    expect(wrapper.props().help).to.equal('help1');
    expect(wrapper.props().type).to.equal(FieldTypes.TEXT);
    expect(wrapper.props().reset).to.equal(true);
    expect(wrapper.props().values.length).to.equal(2);
  });
  // 91
  it('should pass correct functions required', () => {
    const wrapper = mount(<Field
      onChangeValue={e => e}
      validateFunction={e => e}
    />);
    expect(wrapper.props().validateFunction(2)).to.equal(2);
    expect(wrapper.props().onChangeValue(2)).to.equal(2);
  });
  // 92
  it('should render the correct group, label and help section', () => {
    const wrapper = shallow(<Field
      label="field1"
      help="help1"
      onChangeValue={e => e}
      validateFunction={e => e}
    />);
    expect(wrapper.find(FormGroup)).to.have.length(1);
    expect(wrapper.find(ControlLabel)).to.have.length(1);
    expect(wrapper.find(HelpBlock)).to.have.length(1);
  });
  // 93
  it('should work validationState int to string', () => {
    assert.equal(Field.getValidationStateString(2), 'warning');
    assert.equal(Field.getValidationStateString(1), 'success');
    assert.equal(Field.getValidationStateString(0), 'error');
    assert.equal(Field.getValidationStateString('breakMe'), null);
  });
});
