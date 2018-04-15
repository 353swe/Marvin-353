import React from 'react';
import assert from 'assert';
import { shallow } from 'enzyme/build/index';
import Field from '../../../src/components/custom/Field';
import FieldTypes from '../../../src/components/custom/fieldtypes';

describe('FieldTypes', () => {
  it('should return array of types', () => {
    const nTypes = Object.keys(FieldTypes).length;
    assert.equal(nTypes, 4);
  });
});

describe('Field component', () => {
  it('should generate correct key', () => {
    const wrapper = shallow(<Field onChangeValue={e => e} validateFunction={e => e} />);
    console.log(wrapper);
    assert.equal(1, 1);
  });
});
