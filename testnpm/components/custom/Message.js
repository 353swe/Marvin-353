import React from 'react';
// eslint-disable-next-line
import { expect } from 'chai';
// eslint-disable-next-line
import { shallow, mount } from 'enzyme';
import { Modal, Button } from 'react-bootstrap';
import assert from 'assert';
import MessageBox from '../../../src/components/custom/Message';

describe('MessageBox component', () => {
  // 100
  it('should render success type messagebox', () => {
    const props = { message: 'Test message', type: 'success' };
    const wrapper = shallow(<MessageBox {...props} onHide={e => e} />);
    assert.equal(wrapper.length, 1);
  });
  // 101
  it('should render error type messagebox', () => {
    const props = { message: 'Test message', type: 'error' };
    const wrapper = shallow(<MessageBox {...props} onHide={e => e} />);
    assert.equal(wrapper.length, 1);
  });
  // 102
  it('should render default type messagebox', () => {
    const props = { message: 'Test message', type: 'default' };
    const wrapper = shallow(<MessageBox {...props} onHide={e => e} />);
    assert.equal(wrapper.length, 1);
  });
  // 103
  it('should have a title', () => {
    const props = { message: 'Test message', type: 'success' };
    const wrapper = shallow(<MessageBox {...props} onHide={e => e} />);
    assert.equal(wrapper.find(Modal.Title) !== -1, true);
  });
  // 104
  it('should have a message', () => {
    const props = { message: 'Test message', type: 'success' };
    const wrapper = shallow(<MessageBox {...props} onHide={e => e} />);
    assert.equal(wrapper.find(Modal.Body) !== -1, true);
  });
  // 105
  it('should have a close button', () => {
    const props = { message: 'Test message', type: 'success' };
    const wrapper = shallow(<MessageBox {...props} onHide={e => e} />);
    assert.equal(wrapper.find(Button) !== -1, true);
  });
  // 106
  it('should save correct props', () => {
    const props = { message: 'Test message', type: 'success' };
    const wrapper = mount(<MessageBox {...props} onHide={e => e} />);
    expect(wrapper.props().message).to.equal('Test message');
    expect(wrapper.props().type).to.equal('success');
  });
});

