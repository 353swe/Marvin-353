import React from 'react';
import { shallow } from 'enzyme/build/index';
import { expect } from 'chai';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import assert from 'assert';
import CardWithIcon from '../../../src/components/custom/CardWithIcon';
import { Index } from '../../../src/components/teacher/Index';

describe('Index Teacher', () => {
  // 191
  it('Should render the index with right number of cards', () => {
    const wrapper = shallow(<Index />);
    assert.equal(wrapper.length, 1);
    expect(wrapper.find(CardWithIcon)).to.have.length(1);
  });
  // 192
  it('Should render the correct bootstrap component', () => {
    const wrapper = shallow(<Index />);
    assert.equal(wrapper.length, 1);
    expect(wrapper.find(Jumbotron)).to.have.length(1);
  });
});
