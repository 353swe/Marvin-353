import React from 'react';
import { shallow, mount } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import { Modal, Button } from 'react-bootstrap';
import assert from 'assert';
import { expect } from 'chai'; // eslint-disable-line import/no-extraneous-dependencies
import ModalForm from '../../../src/components/custom/ModalForm';

describe('ModalForm component', () => {
  // 107
  it('Should render the component', () => {
    const wrapper = shallow( // eslint-disable-line function-paren-newline
      <ModalForm title="Test title" />);
    assert.equal(wrapper.length, 1);
    expect(wrapper.find(Modal)).to.have.length(1);
  });
  // 108
  it('Should save correct props', () => {
    const wrapper = mount(<ModalForm title="Test title" />);
    expect(wrapper.props().title).to.equal('Test title');
  });
  // 109
  it('Should have the correct initial state', () => {
    const wrapper = mount(<ModalForm title="Test title" show />);
    expect(wrapper.state().showing).to.equal(wrapper.props().show);
  });
  // 110
  it('Should change state on componentWillReceiveProps(newProps) call', () => {
    const wrapper = mount(<ModalForm title="Test title" show />);
    const newProps = {
      show: false,
    };
    wrapper.instance().componentWillReceiveProps(newProps);
    expect(wrapper.state().showing).to.equal(newProps.show);
  });
  // 111
  it('Should change state on handle() call', () => {
    const wrapper = mount(<ModalForm title="Test title" show yesFunction={e => e} />);
    wrapper.instance().handle();
    expect(wrapper.state().showing).to.equal(false);
  });
  // 112
  it('Should change state on close() call', () => {
    const wrapper = mount(<ModalForm title="Test title" show />);
    wrapper.instance().close();
    expect(wrapper.state().showing).to.equal(false);
  });
  // 113
  it('Should render Yes and No Button with a defined yesFunction', () => {
    const wrapper = mount(<ModalForm title="Test title" show yesFunction={e => e} />);
    assert.equal(wrapper.length, 1);
    expect(wrapper.find(Button)).to.have.length(2);
  });
  // 114
  it('Should render only No Button with a defined noFunction', () => {
    const wrapper = mount(<ModalForm title="Test title" show noFunction={e => e} />);
    assert.equal(wrapper.length, 1);
    expect(wrapper.find(Button)).to.have.length(1);
  });
  // 115
  it('Should render the component', () => {
    const props = {
      title: 'test title',
      show: true,
    };
    const wrapper = shallow(<ModalForm {...props} />);
    wrapper.instance().constructor(props);
    expect(wrapper.state().showing).to.equal(true);
  });
});
