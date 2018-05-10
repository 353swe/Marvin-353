import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import assert from 'assert';
import { expect } from 'chai'; // eslint-disable-line import/no-extraneous-dependencies
import PageContainer from '../../src/components/PageContainer';
import NavbarCustom from '../../src/components/custom/NavbarCustom';
import LoadingSpinner from '../../src/components/custom/LoadingSpinner';
import ErrorTaken from '../../src/components/custom/ErrorTaker';
import AlertDismissable from '../../src/components/custom/AlertDismissable';

const location = {
  action: 'POP',
  hash: '',
  key: null,
  pathname: '',
  query:
    {
      type: 'success',
      message: 'login',
    },
  search: '?type=success&message=login',
};

const location2 = {
  action: 'POP',
  hash: '',
  key: null,
  pathname: '',
  query: null,
  search: '?type=success&message=login',
};

const route = {
  isLogged: true,
  links: [
    {
      component: null,
      label: '/',
      path: '/',
    },
  ],
};

describe('PageContainer component', () => {
  let wrapper;
  let wrapper2;
  beforeEach(() => {
    wrapper = shallow( // eslint-disable-line function-paren-newline
      <PageContainer
        location={location}
        route={route}
      >
        <p>test</p>
      </PageContainer>);
    wrapper2 = shallow( // eslint-disable-line function-paren-newline
      <PageContainer
        location={location2}
        route={route}
      >
        <p>test</p>
      </PageContainer>);
  });
  // 1
  it('Should render the component', () => {
    assert.equal(wrapper.length, 1);
    expect(wrapper.find(NavbarCustom)).to.have.length(1);
    expect(wrapper.find(ErrorTaken)).to.have.length(1);
    expect(wrapper.find(LoadingSpinner)).to.have.length(1);
    expect(wrapper.find(AlertDismissable)).to.have.length(1);
  });
  // 2
  it('Should not render the alert dismissable if the query params ar not set', () => {
    assert.equal(wrapper2.length, 1);
    expect(wrapper2.find(NavbarCustom)).to.have.length(1);
    expect(wrapper2.find(ErrorTaken)).to.have.length(1);
    expect(wrapper2.find(LoadingSpinner)).to.have.length(1);
    expect(wrapper2.find(AlertDismissable)).to.have.length(0);
  });
});
