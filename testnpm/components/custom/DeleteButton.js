import React from 'react';
// eslint-disable-next-line
import { shallow } from 'enzyme';
import assert from 'assert';
import DeleteButton from '../../../src/components/custom/deleteButton';

describe('DeleteButton component', () => {
  it('Should render the component', () => {
    const wrapper = shallow(<DeleteButton deleteFunction={e => e} objectToRemove="test" />);
    assert.equal(wrapper.length, 1);
  });
});
