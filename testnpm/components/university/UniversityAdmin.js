import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import configureStore from 'redux-mock-store'; // eslint-disable-line import/no-extraneous-dependencies
import ContainerComponent, { UniversityAdmin } from '../../../src/components/university/UniversityAdmin';
import { createMockStore, shallowWithStore } from '../../helpers/component-with-store';
import { creators } from '../../../src/sagas/AdminEmployerSaga';


describe('UniversityAdmin component', () => {
  const initialState = {
    loading: false,
    errored: false,
    adminAccount: [],
  };

  const addedAdmin = [
    '0xc8321642f5a2549c58b1a6f34a68ec76e2c107b9',
    '0xc8321642f5a2549c58b1a6f34a68ec76e2c107b1',
  ];
  const item = '0xc8321642f5a2549c58b1a6f34a68ec76e2c107b8';
  const mockStore = configureStore();
  let wrapper;
  let store;
  let deletedAdminAddr;

  function setDelete(e) {
    deletedAdminAddr = e;
  }

  beforeEach(() => {
    deletedAdminAddr = '';
    store = mockStore(initialState);
    wrapper = shallow( // eslint-disable-line function-paren-newline
      <UniversityAdmin
        addAdmin={e => e}
        getAdmins={e => e}
        deleteAdmin={setDelete}
        adminAccounts={addedAdmin}
        store={store}
      />);
  });

  // 215
  it('Should show the form and table correctly', () => {
    /**
     * Admin page should have one form to add, table with list of admins
     * and an hidden modal at the end
     */
    expect(wrapper.find('div').children()).to.have.length(3);
    expect(wrapper.state().delete).to.equal(false);
    // pageCompShallow.find('input[name="addressAdmin"]').
    // simulate('change', {target: {value: '0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf'}});

    // pageCompShallow.find('form').simulate('submit');

    // expect(addedAdmin.to.equal(1));
  });
  // 216
  it('Should viewDelete set right the state', () => {
    const adminDel = '0xc8321642f5a2549c58b1a6f34a68ec76e2c107b8';
    wrapper.instance().viewDelete(adminDel);
    expect(wrapper.state().item).to.equal(item);
    expect(wrapper.state().delete).to.equal(true);
  });
  // 217
  it('Should viewDelete set right the state', () => {
    wrapper.instance().viewDelete(item);
    expect(wrapper.state().item).to.equal(item);
    expect(wrapper.state().delete).to.equal(true);
  });
  // 218
  it('Should close modal and reset state', () => {
    wrapper.instance().notDelete();
    expect(wrapper.state().item).to.equal('');
    expect(wrapper.state().delete).to.equal(false);
  });
  // 219
  it('Should close modal and reset state not deleting store', () => {
    expect(deletedAdminAddr).to.equal('');
    wrapper.instance().closeDelete({ item: { address: '0xc8321642f5a2549c58b1a6f34a68ec76e2c107b9' } });
    expect(wrapper.state().item).to.equal('');
    expect(wrapper.state().delete).to.equal(false);
    expect(deletedAdminAddr).to.equal('0xc8321642f5a2549c58b1a6f34a68ec76e2c107b9');
  });

  // Testing container part
  const defaultStore = {
    university: {
      adminAccount: [
        '0xc8321642f5a2549c58b1a6f34a68ec76e2c107b9',
        '0xc8321642f5a2549c58b1a6f34a68ec76e2c107b1',
      ],
    },
  };
  const admin = {
    addressAdmin: {
      value: '0xc8321642f5a2549c58b1a6f34a68ec76e2c107b9',
    },
  };
  // 220
  it('Should connect right to the props', () => {
    const wrapperContainer = shallowWithStore(<ContainerComponent />, defaultStore);
    expect(wrapperContainer.props().adminAccounts).to.deep.equal(addedAdmin);
  });
  // 221
  it('Should fire the correct action to get all admins', () => {
    const storeContainer = createMockStore(defaultStore);
    const wrapperContainer = shallowWithStore(<ContainerComponent />, storeContainer);
    wrapperContainer.props().getAdmins();
    expect(storeContainer.isActionDispatched(creators.getAllAdminsAction())).to.be.true;
  });
  // 222
  it('Should fire the correct action to delete admin', () => {
    const storeContainer = createMockStore(defaultStore);
    const wrapperContainer = shallowWithStore(<ContainerComponent />, storeContainer);
    wrapperContainer.props().deleteAdmin('0xc8321642f5a2549c58b1a6f34a68ec76e2c107b9');
    expect(storeContainer.isActionDispatched(creators.removeAdminAction('0xc8321642f5a2549c58b1a6f34a68ec76e2c107b9',))).to.be.true;// eslint-disable-line
  });
  // 223
  it('Should fire the correct action to add admin', () => {
    const storeContainer = createMockStore(defaultStore);
    const wrapperContainer = shallowWithStore(<ContainerComponent />, storeContainer);
    wrapperContainer.props().addAdmin(admin);
    expect(storeContainer.isActionDispatched(creators.addNewAdminAction('0xc8321642f5a2549c58b1a6f34a68ec76e2c107b9'))).to.be.true;// eslint-disable-line
  });
});
