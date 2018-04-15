import React from 'react';
// eslint-disable-next-line
import { shallow } from 'enzyme';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import assert from 'assert';
import NavbarCustom from '../../../src/components/custom/NavbarCustom';

describe('NavbarCustom component', () => {
  it('should render the component', () => {
    const wrapper = shallow(<NavbarCustom />);
    assert.equal(wrapper.length, 1);
  });
  it('should have the links', () => {
    const wrapper = shallow(<NavbarCustom />);
    assert.equal(wrapper.find(Nav) !== -1, true);
  });
  it('should have the header', () => {
    const wrapper = shallow(<NavbarCustom />);
    assert.equal(wrapper.find(Navbar.Header) !== -1, true);
  });
  it('should have the brand', () => {
    const wrapper = shallow(<NavbarCustom />);
    assert.equal(wrapper.find(Navbar.Brand) !== -1, true);
  });
  it('should have the links', () => {
    // eslint-disable-next-line
    const TestComp = () => {
      return (<p>Test</p>);
    };
    const props = {
      links: [
        {
          path: 'testlink1',
          label: 'test1',
          position: 'left',
          component: TestComp,
        },
        {
          path: 'testlink2',
          label: 'test2',
          position: 'right',
          component: TestComp,
        },
      ],
    };
    const wrapper = shallow(<NavbarCustom {...props} />);
    assert.equal(wrapper.find(<NavItem />) !== -1, true);
  });
});
