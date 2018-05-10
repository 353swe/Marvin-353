import React from 'react';
// eslint-disable-next-line
import { shallow, mount } from 'enzyme';
import assert from 'assert';
import CardWithIcon from '../../../src/components/custom/CardWithIcon';
// eslint-disable-next-line
import { expect } from "chai";

describe('CardWithIcon component', () => {
  // 80
  it('Should render the component with more that one link', () => {
    const links = [
      {
        path: '/courses',
        label: 'Courses',
      },
      {
        path: '/exams',
        label: 'Exams',
      },
    ];
    const wrapper = shallow(<CardWithIcon title="Test" text="Test" links={links} />);
    assert.equal(wrapper.length, 1);
    assert.equal(wrapper.html().search('<a') !== -1, true);
  });
  // 81
  it('Should render the component with only one link', () => {
    const links = [
      {
        path: '/courses',
        label: 'Courses',
      },
    ];
    const wrapper = shallow(<CardWithIcon title="Test" text="Test" links={links} />);
    assert.equal(wrapper.length, 1);
    assert.equal(wrapper.html().search('<a') !== -1, true);
  });
  // 82
  it('Should render the component', () => {
    const wrapper = shallow(<CardWithIcon title="Test" text="Test" />);
    assert.equal(wrapper.length, 1);
  });
  // 83
  it('Should have a title', () => {
    const props = { title: 'Test title', text: 'Test text' };
    const wrapper = shallow(<CardWithIcon {...props} />);
    assert.equal(wrapper.html().search('<h5') !== -1, true);
  });
  // 84
  it('Should have a text', () => {
    const props = { title: 'Test title', text: 'Test text' };
    const wrapper = shallow(<CardWithIcon {...props} />);
    assert.equal(wrapper.html().search('<p') !== -1, true);
  });
  // 85
  it('Should save correct props', () => {
    const props = { title: 'Test title', text: 'Test text' };
    const wrapper = mount(<CardWithIcon {...props} />);
    expect(wrapper.props().title).to.equal('Test title');
    expect(wrapper.props().text).to.equal('Test text');
  });
});
