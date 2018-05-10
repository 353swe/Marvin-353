import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import assert from 'assert';
import { expect } from 'chai'; // eslint-disable-line import/no-extraneous-dependencies
import ContainerComponent, { Index } from '../../../src/components/public/Index';
import CardWithIcon from '../../../src/components/custom/CardWithIcon';
import AlertDismissable from '../../../src/components/custom/AlertDismissable';
import { shallowWithStore, createMockStore } from '../../helpers/component-with-store';
import { creators } from '../../../src/sagas/SessionSaga';

const initialDataState = {
  errored: false,
  loading: false,
  name: null,
  surname: null,
  contract: null,
};

const defaultStore = {
  user: {
    errored: false,
    loading: false,
    role: null,
    data: initialDataState,
  },
  metamask: {
    present: true,
    account: '',
  },
};

describe('Index component', () => {
  // 134
  it('Should render the component', () => {
    const wrapper = shallow(<Index />);
    assert.equal(wrapper.length, 1);
    assert.equal(wrapper.html().search('<h3') !== -1, true);
    assert.equal(wrapper.html().search('<img') !== -1, true);
    expect(wrapper.find(CardWithIcon)).to.have.length(2);
  });
  // 135
  it('Should render a error message if metamask is not install', () => {
    const wrapper = shallow(<Index metamask={false} />);
    assert.equal(wrapper.length, 1);
    expect(wrapper.find(AlertDismissable)).to.have.length(2);
  });
  // 136
  it('Should render a error message if metamask is locked', () => {
    const wrapper = shallow(<Index metamask account="" />);
    assert.equal(wrapper.length, 1);
    expect(wrapper.find(AlertDismissable)).to.have.length(1);
  });
  // 137
  it('Should render a error message if metamask is locked', () => {
    const wrapper = shallow(<Index metamask account={null} />);
    assert.equal(wrapper.length, 1);
    expect(wrapper.find(AlertDismissable)).to.have.length(1);
  });
  // 138
  it('Should connect right to the props', () => {
    const wrapper = shallowWithStore(<ContainerComponent />, defaultStore);
    expect(wrapper.props().loginLoading).to.equal(false);
    expect(wrapper.props().loginFailed).to.equal(false);
    expect(wrapper.props().metamask).to.equal(true);
    expect(wrapper.props().account).to.equal('');
  });
  // 139
  it('Should fire the correct actions', () => {
    const store = createMockStore(defaultStore);
    const wrapper = shallowWithStore(<ContainerComponent />, store);
    wrapper.props().performLogin();
    expect(store.isActionDispatched(creators.loginAction())).to.equal(true);
  });
});

