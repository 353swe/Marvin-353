import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import initWeb3 from './initWeb3';
import { store } from './store';
import './stylesheets/main.scss';
import Page from './page';

initWeb3();

// render the main component
ReactDOM.render(
  <Page store={store} />,
  document.getElementById('app'),
);
