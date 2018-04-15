import React from 'react';
// eslint-disable-next-line
import { shallow } from 'enzyme';
import { Modal, Button } from 'react-bootstrap';
import assert from 'assert';
import MessageBox from '../../../src/components/custom/Message';

describe('MessageBox component', () => {
  it('should render the component', () => {
    const props = { message: 'Test message', type: 'success' };
    const wrapper = shallow(<MessageBox {...props} />);
    assert.equal(wrapper.length, 1);
  });
  it('should have a title', () => {
    const props = { message: 'Test message', type: 'success' };
    const wrapper = shallow(<MessageBox {...props} />);
    assert.equal(wrapper.find(Modal.Title) !== -1, true);
  });
  it('should have a message', () => {
    const props = { message: 'Test message', type: 'success' };
    const wrapper = shallow(<MessageBox {...props} />);
    assert.equal(wrapper.find(Modal.Body) !== -1, true);
  });
  it('should have a close button', () => {
    const props = { message: 'Test message', type: 'success' };
    const wrapper = shallow(<MessageBox {...props} />);
    assert.equal(wrapper.find(Button) !== -1, true);
  });
});

