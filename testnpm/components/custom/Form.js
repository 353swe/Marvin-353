import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import assert from 'assert';
import { expect } from 'chai'; // eslint-disable-line import/no-extraneous-dependencies
import { Button, Panel } from 'react-bootstrap';
import Form from '../../../src/components/custom/Form';


describe('Form component', () => {
  // 96
  it('Should render the success component', () => {
    const wrapper = shallow(<Form />);
    assert.equal(wrapper.length, 1);
    expect(wrapper.find(Panel)).to.have.length(1);
    expect(wrapper.find(Button)).to.have.length(1);
    expect(wrapper.find('form')).to.have.length(1);
    expect(wrapper.find('legend')).to.have.length(1);
  });
  // 97
  it('Should call allValidFields()', () => {
    const wrapper = shallow(<Form />);
    wrapper.instance().allValidFields();
  });
});

