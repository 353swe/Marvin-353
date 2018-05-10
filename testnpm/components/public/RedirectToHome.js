import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import assert from 'assert';
import RedirectToHome from '../../../src/components/public/RedirectToHome';

describe('RedirectToHome component', () => {
  // 155
  it('Should render the component', () => {
    const wrapper = shallow(<RedirectToHome type="success" message="login" />);
    assert.equal(wrapper.length, 1);
  });
  // 156
  it('Should call componentDidMount()', () => {
    const wrapper = shallow(<RedirectToHome type="success" message="login" />);
    wrapper.instance().componentDidMount();
  });
});

