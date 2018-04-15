import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
import NotFound from '../../src/components/public/NotFound';

// import ButtonBackToHome from '../../src/components/buttons/ButtonBackToHome';

// unit tests for the NotFound component
describe('NotFound component', () => {
  describe('render()', () => {
    it('should render the component', () => {
      const wrapper = shallow(<NotFound />);
      assert.equal(wrapper.length, 1);
    });
    /*
    it('should display an error message', () => {
      const wrapper = shallow(<NotFound />);
      const message = 'Logout';
      assert.equal(wrapper.contains(<h1>{message}</h1>) > 0, true);
    }); */
  });
});
