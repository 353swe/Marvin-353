import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import assert from 'assert';
import { expect } from 'chai'; // eslint-disable-line import/no-extraneous-dependencies
import ContainerComponent, { LoginPage } from '../../../src/components/public/LoginPage';
import RedirectToHome from '../../../src/components/public/RedirectToHome';
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
};

describe('LoginPage component', () => {
  // 141
  it('Should render the component with loginLoading', () => {
    const wrapper = shallow(<LoginPage loginLoading />);
    assert.equal(wrapper.length, 1);
    assert.equal(wrapper.html().search('<div') !== -1, true);
  });
  // 142
  it('Should render the component with loginFailed', () => {
    const wrapper = shallow(<LoginPage loginFailed />);
    assert.equal(wrapper.length, 1);
    expect(wrapper.find(RedirectToHome)).to.have.length(1);
  });
  // 143
  it('Should render the component with role = 0', () => {
    const props = { role: 0 };
    const wrapper = shallow(<LoginPage {...props} />);
    assert.equal(wrapper.length, 1);
    expect(wrapper.find(RedirectToHome)).to.have.length(1);
  });
  // 144
  it('Should render the component with role = 13', () => {
    const props = { role: 13 };
    const wrapper = shallow(<LoginPage {...props} />);
    assert.equal(wrapper.length, 1);
    expect(wrapper.find(RedirectToHome)).to.have.length(1);
  });
  // 145
  it('Should render the component with role = 14', () => {
    const props = { role: 13 };
    const wrapper = shallow(<LoginPage {...props} />);
    assert.equal(wrapper.length, 1);
    expect(wrapper.find(RedirectToHome)).to.have.length(1);
  });
  // 146
  it('Should render the component with role = 1', () => {
    const props = { role: 1 };
    const wrapper = shallow(<LoginPage {...props} />);
    assert.equal(wrapper.length, 1);
    expect(wrapper.find(RedirectToHome)).to.have.length(1);
  });
  // 147
  it('Should render the component', () => {
    const props = { role: null };
    const wrapper = shallow(<LoginPage {...props} />);
    assert.equal(wrapper.length, 1);
    assert.equal(wrapper.html().search('<div') !== -1, true);
  });
  // 148
  it('Should connect right to the props', () => {
    const wrapper = shallowWithStore(<ContainerComponent />, defaultStore);
    expect(wrapper.props().loginLoading).to.equal(false);
    expect(wrapper.props().loginFailed).to.equal(false);
    expect(wrapper.props().role).to.equal(null);
  });
  // 149
  it('Should fire the correct actions', () => {
    const store = createMockStore(defaultStore);
    const wrapper = shallowWithStore(<ContainerComponent />, store);
    wrapper.props().performLogin();
    expect(store.isActionDispatched(creators.loginAction())).to.equal(true);
  });
});
