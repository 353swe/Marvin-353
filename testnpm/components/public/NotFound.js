import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import assert from 'assert';
import NotFound from '../../../src/components/public/NotFound';

// unit tests for the NotFound component
describe('NotFound component', () => {
  // 151
  it('should render the component', () => {
    const wrapper = shallow(<NotFound />);
    assert.equal(wrapper.length, 1);
  });
});
