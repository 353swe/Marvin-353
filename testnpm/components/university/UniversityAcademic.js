import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import configureStore from 'redux-mock-store'; // eslint-disable-line import/no-extraneous-dependencies
import ContainerComponent, { UniversityAcademic } from '../../../src/components/university/UniversityAcademic';
import { createMockStore, shallowWithStore } from '../../helpers/component-with-store';
import { creators } from '../../../src/sagas/ManageYearsSaga';


describe('UniversityYear component', () => {
  const initialState = {
    loading: false,
    errored: false,
    accademicYears: [],
  };

  const addedYears = [
    2019,
    2020,
  ];
  const item = '2020';
  const mockStore = configureStore();
  let wrapper;
  let store;
  let deletedYear;
  let addedYear;

  function setDelete(e) {
    deletedYear = e;
  }

  function setAdd(e) {
    addedYear = e;
  }

  beforeEach(() => {
    deletedYear = '';
    addedYear = '';
    store = mockStore(initialState);
    wrapper = shallow( // eslint-disable-line function-paren-newline
      <UniversityAcademic
        addYear={setAdd}
        getYears={e => e}
        deleteYears={setDelete}
        academicYears={addedYears}
        store={store}
      />);
  });

  // 204
  it('Should show the form and table correctly with state', () => {
    expect(wrapper.find('div').children()).to.have.length(4);
    expect(wrapper.state().delete).to.equal(false);
    expect(wrapper.state().viewErrorMessage).to.equal(false);
  });
  // 205
  it('Should viewDelete set right the state', () => {
    wrapper.instance().viewDelete(item);
    expect(wrapper.state().item).to.equal(item);
    expect(wrapper.state().delete).to.equal(true);
  });
  // 206
  it('Should close modal and reset state', () => {
    wrapper.instance().notDelete();
    expect(wrapper.state().item).to.equal('');
    expect(wrapper.state().delete).to.equal(false);
  });
  // 207
  it('Should close modal and reset state not deleting store', () => {
    expect(deletedYear).to.equal('');
    wrapper.instance().closeDelete({ item: { year: '2020' } });
    expect(wrapper.state().item).to.equal('');
    expect(wrapper.state().delete).to.equal(false);
    expect(deletedYear).to.equal('2020');
  });
  // 208
  it('Should validate false the year submitted from the form', () => {
    wrapper.instance().validateYear({ year: { value: 2019 } });
    expect(wrapper.state().viewErrorMessage).to.equal(true);
    expect(addedYear).to.equal('');
    wrapper.instance().validateYear({ year: { value: 2020 } });
    expect(wrapper.state().viewErrorMessage).to.equal(true);
    expect(addedYear).to.equal('');
  });
  // 209
  it('Should validate true the year submitted from the form', () => {
    wrapper.instance().validateYear({ year: { value: 2018 } });
    expect(wrapper.state().viewErrorMessage).to.equal(false);
    expect(addedYear).to.equal(2018);
  });
  // 210
  it('Should close error message', () => {
    wrapper.instance().setState({ viewErrorMessage: true });
    expect(wrapper.state().viewErrorMessage).to.equal(true);
    wrapper.instance().closeErrorMessage();
    expect(wrapper.state().viewErrorMessage).to.equal(false);
  });

  // Testing container part
  const defaultStore = {
    manageYears: {
      accademicYears: [
        2019,
        2020,
      ],
    },
  };
  // 211
  it('Should connect right to the props', () => {
    const wrapperContainer = shallowWithStore(<ContainerComponent />, defaultStore);
    expect(wrapperContainer.props().academicYears).to.deep.equal(addedYears);
  });
  // 212
  it('Should fire the correct action to get all years', () => {
    const storeContainer = createMockStore(defaultStore);
    const wrapperContainer = shallowWithStore(<ContainerComponent />, storeContainer);
    wrapperContainer.props().getYears();
    expect(storeContainer.isActionDispatched(creators.getAllYears())).to.be.true;
  });
  // 213
  it('Should fire the correct action to delete year', () => {
    const storeContainer = createMockStore(defaultStore);
    const wrapperContainer = shallowWithStore(<ContainerComponent />, storeContainer);
    wrapperContainer.props().deleteYears(2018);
    expect(storeContainer.isActionDispatched(creators.removeEmptyYear(2018))).to.be.true;
  });
  // 214
  it('Should fire the correct action to add year', () => {
    const storeContainer = createMockStore(defaultStore);
    const wrapperContainer = shallowWithStore(<ContainerComponent />, storeContainer);
    wrapperContainer.props().addYear(2018);
    expect(storeContainer.isActionDispatched(creators.addYear(2018))).to.be.true;
  });
});
