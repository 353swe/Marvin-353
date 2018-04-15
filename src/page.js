import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store';
import RouterMarvin from './components/RouterMarvin';

const Page = props => (
  <div id="page">
    <Provider store={props.store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterMarvin />
      </PersistGate>
    </Provider>
  </div>
);

Page.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line
};

export default Page;
