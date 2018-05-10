import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import assert from 'assert';
import { expect } from 'chai'; // eslint-disable-line import/no-extraneous-dependencies
import AlertDismissable from '../../../src/components/custom/AlertDismissable';


describe('Alert dismissable component', () => {
  // 74
  it('Should render the success component', () => {
    const wrapper = shallow(<AlertDismissable message="test" type="success" />);
    assert.equal(wrapper.length, 1);
    expect(wrapper.find('h4').text()).to.equal('Success!');
    expect(wrapper.find('p').text()).to.equal('test');
  });
  // 75
  it('Should render the danger component', () => {
    const wrapper = shallow(<AlertDismissable message="test" type="danger" />);
    assert.equal(wrapper.length, 1);
    expect(wrapper.find('h4').text()).to.equal('Error!');
    expect(wrapper.find('p').text()).to.equal('test');
  });
  // 76
  it('Should render the warning component', () => {
    const wrapper = shallow(<AlertDismissable message="test" type="warning" />);
    assert.equal(wrapper.length, 1);
    expect(wrapper.find('h4').text()).to.equal('Warning!');
    expect(wrapper.find('p').text()).to.equal('test');
  });
  // 77
  it('Should render the info component', () => {
    const wrapper = shallow(<AlertDismissable message="test" type="info" />);
    assert.equal(wrapper.length, 1);
    expect(wrapper.find('h4').text()).to.equal('Info!');
    expect(wrapper.find('p').text()).to.equal('test');
  });
  // 78
  it('Should render the component with null title', () => {
    const wrapper = shallow(<AlertDismissable message="test" type="other" />);
    assert.equal(wrapper.length, 1);
    expect(wrapper.find('h4').text()).to.equal('');
    expect(wrapper.find('p').text()).to.equal('test');
  });
  // 79
  it('Should call handleDismiss() and change state', () => {
    const wrapper = shallow(<AlertDismissable message="test" type="info" />);
    wrapper.instance().handleDismiss();
    expect(wrapper.state().show).to.equal(false);
  });
});

