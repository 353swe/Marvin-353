import React from 'react';
// eslint-disable-next-line
import { shallow, mount } from 'enzyme';
import assert from 'assert';
import LoadingSpinner from '../../../src/components/custom/LoadingSpinner';

describe('LoadingSpinner component', () => {
  // 98
  it('Should render the loading when isLoading = true', () => {
    const wrapper = shallow( // eslint-disable-line function-paren-newline
      <LoadingSpinner
        isLoading
      >
        ciao
      </LoadingSpinner>);
    assert.equal(wrapper.length, 1);
    assert.equal(wrapper.html().search('<div') !== -1, true);
  });
  // 99
  it('Should not render the loading when isLoading = false', () => {
    const wrapper = shallow( // eslint-disable-line function-paren-newline
      <LoadingSpinner
        isLoading={false}
      >
        ciao
      </LoadingSpinner>);
    assert.equal(wrapper.length, 1);
    assert.equal(wrapper.html().search('<div') !== -1, false);
  });
});
