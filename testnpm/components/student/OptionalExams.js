import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
import { expect } from '../../helpers/chai-enzyme';
import ContainerComponent, { OptionalExams as SimpleComponent } from
  '../../../src/components/student/OptionalExams';
import PageTable from '../../../src/components/template/PageTableForm';
import { shallowWithStore, createMockStore } from '../../helpers/component-with-store';
import { creators } from '../../../src/sagas/StudentSaga';

const address = '0xfa429bef26906146be2438c1892f8499e217b277';
const item = {
  item: {
    address: '0xfa429bef26906146be2438c1892f8499e217b277',
  },
};
const exams = [{
  address: '0xfa429bef26906146be2438c1892f8499e217b277',
  name: 'P1',
  mandatory: true,
  credits: '180',
  teacherAddress: '0x1eff47bc3a10a45d4b230b5d10e37751fe6aa718',
  teacherName: 'Francesco',
  teacherSurname: 'Ranzato',
  valuation: 18,
  subscription: true,
}];
const defaultStore = {
  student: {
    examsList: [{
      address: '0xfa429bef26906146be2438c1892f8499e217b277',
      name: 'P1',
      mandatory: true,
      credits: '180',
      teacherAddress: '0x1eff47bc3a10a45d4b230b5d10e37751fe6aa718',
      teacherName: 'Francesco',
      teacherSurname: 'Ranzato',
      valuation: 18,
      subscription: true,
    }],
  },
  user: {
    data: {
      contract: '0xfa429bef26906146be2438c1892f8499e217b277',
    },
  },
};

describe('StudentOptionalExams component', () => {
  // Testing simple component
  const SimpleWrapper = shallow(<SimpleComponent
    myAddress={address}
    ExamsList={exams}
    getExams={e => e}
    enrollToExam={e => e}
  />);
  // 181
  it('Should render the simple component', () => {
    assert.equal(SimpleWrapper.length, 1);
    SimpleWrapper.instance().getExams();
    SimpleWrapper.instance().constructor();
  });
  // 182
  it('Should render the child components', () => {
    expect(SimpleWrapper.find(PageTable)).to.have.length(1);
  });
  // Testing states and methods
  // 183
  it('Should have the correct initial states', () => {
    expect(SimpleWrapper.state().select).to.deep.equal(false);
  });
  /* it('Should have correct states value after running viewSelect()', () => {
    SimpleWrapper.instance().viewSelect('test');
    expect(SimpleWrapper.state().select).to.deep.equal(true);
    expect(SimpleWrapper.state().item).to.deep.equal('test');
  });
  it('Should have correct states value after running closeSelect()', () => {
    SimpleWrapper.instance().closeSelect(item);
    expect(SimpleWrapper.state().select).to.deep.equal(false);
  });
*/
  // Testing container part
  // 184
  it('Should connect right to the props', () => {
    const wrapper = shallowWithStore(<ContainerComponent />, defaultStore);
    expect(wrapper.props().ExamsList).to.deep.equal(exams);
    expect(wrapper.props().myAddress).to.deep.equal(address);
  });
  // 185
  it('Should fire the correct actions', () => {
    const store = createMockStore(defaultStore);
    const wrapper = shallowWithStore(<ContainerComponent />, store);
    wrapper.props().getExams(address);
    expect(store.isActionDispatched(creators.getExamsAction(address))).to.be.true;
  });
  // 186
  it('Should fire the correct actions', () => {
    const store = createMockStore(defaultStore);
    const wrapper = shallowWithStore(<ContainerComponent />, store);
    wrapper.props().enrollToExam(address, item);
    expect(store.isActionDispatched(creators.enrollToExamAction(address, address))).to.be.true;
  });
});
