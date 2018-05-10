import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import assert from 'assert';
import { Image } from 'react-bootstrap';
import { expect } from 'chai'; // eslint-disable-line import/no-extraneous-dependencies
import Logout from '../../../src/components/public/Logout';

describe('Logout component', () => {
  // 150
  it('Should render the component', () => {
    const wrapper = shallow(<Logout />);
    assert.equal(wrapper.length, 1);
    expect(wrapper.find(Image)).to.have.length(1);
  });
});

