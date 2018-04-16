import React from 'react';
// eslint-disable-next-line
import { shallow, mount } from 'enzyme';
import assert from 'assert';
import CardWithIcon from '../../../src/components/custom/CardWithIcon';
// eslint-disable-next-line
import {expect} from "chai";

describe('CardWithIcon component', () => {
  it('should render the component', () => {
    const wrapper = shallow(<CardWithIcon title="Test" text="Test" />);
    assert.equal(wrapper.length, 1);
  });
  it('should have a title', () => {
    const props = { title: 'Test title', text: 'Test text' };
    const wrapper = shallow(<CardWithIcon {...props} />);
    assert.equal(wrapper.html().search('<h5') !== -1, true);
  });
  it('should have a text', () => {
    const props = { title: 'Test title', text: 'Test text' };
    const wrapper = shallow(<CardWithIcon {...props} />);
    assert.equal(wrapper.html().search('<p') !== -1, true);
  });
  it('should save correct props', () => {
    const props = { title: 'Test title', text: 'Test text' };
    const wrapper = mount(<CardWithIcon {...props} />);
    expect(wrapper.props().title).to.equal('Test title');
    expect(wrapper.props().text).to.equal('Test text');
  });
});
