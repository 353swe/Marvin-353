import React from 'react';
import { mount, shallow, render } from 'enzyme';
import assert from 'assert';
import { expect } from 'chai';
import { Button } from 'react-bootstrap';
import DeleteButton from '../../../src/components/custom/deleteButton';


describe('DeleteButton component', () => {
  it('Should render the component', () => {
    const wrapper = shallow(<DeleteButton deleteFunction={e => e} objectToRemove="test" />);
    assert.equal(wrapper.length, 1);
    expect(wrapper.find(Button)).to.have.length(1);
  });

  it('renders the right text in the button', () => {
    const wrapper = render(<DeleteButton deleteFunction={e => e} objectToRemove="test" />);
    expect(wrapper.text()).to.equal('Delete');
  });

  it('should save correct props', () => {
    const wrapper = mount(<DeleteButton
      deleteFunction={e => e}
      objectToRemove="test"
    />);
    expect(wrapper.props().objectToRemove).to.equal('test');
    expect(wrapper.props().deleteFunction('returnTestF')).to.equal('returnTestF');
  });
});
