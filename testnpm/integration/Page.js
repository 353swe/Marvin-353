import React from 'react';
import ReactDOM from 'react-dom';
import Page from '../../src/page';
import { store } from '../../src/store';

describe('react page', () => {
  // 50
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Page store={store} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
