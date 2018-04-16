import React from 'react';
import { shallow } from 'enzyme/build/index';
import { expect } from 'chai';
import assert from 'assert';
import CardWithIcon from '../../../src/components/custom/CardWithIcon';

import Index from '../../../src/components/teacher/Index';

describe('Index Teacher', () => {
  it('Should render the index with right number of cards', () => {
    const wrapper = shallow(<Index />);
    assert.equal(wrapper.length, 1);
    expect(wrapper.find(CardWithIcon)).to.have.length(3);
  });
});
