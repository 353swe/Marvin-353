import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import { expect } from 'chai'; // eslint-disable-line import/no-extraneous-dependencies
import ErrorTaker from '../../../src/components/custom/ErrorTaker';

describe('Error taker component', () => {
  // 86
  it('renders the component', () => {
    const wrapper = shallow(<ErrorTaker><div>test</div></ErrorTaker>);
    expect(wrapper).to.have.length(1);
  });
  // 87
  it('should render the error', () => {
    const wrapper = shallow(<ErrorTaker>test</ErrorTaker>);
    wrapper.setState({ hasError: true });
    expect(wrapper.find('h3').text()).to.equal('Sorry, something went wrong somewhere');
    expect(wrapper.find('p').text()).to.equal('We are working to solve this issue.');
  });
  // 88
  it('Should call componentDidCatch(error, info) and change state', () => {
    const wrapper = shallow(<ErrorTaker>test</ErrorTaker>);
    wrapper.instance().componentDidCatch('error', 'info');
    expect(wrapper.state().hasError).to.equal(true);
  });
});
