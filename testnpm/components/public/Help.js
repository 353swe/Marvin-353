import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import assert from 'assert';
import { Image } from 'react-bootstrap';
import { expect } from 'chai'; // eslint-disable-line import/no-extraneous-dependencies
import Help from '../../../src/components/public/Help';

describe('Help component', () => {
  // 133
  it('Should render the component', () => {
    const wrapper = shallow(<Help />);
    assert.equal(wrapper.length, 1);
    expect(wrapper.find(Image)).to.have.length(6);
  });
});

