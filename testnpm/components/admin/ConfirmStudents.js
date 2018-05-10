import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
import { expect } from '../../helpers/chai-enzyme';
import ContainerComponent, { ConfirmStudent as SimpleComponent } from
  '../../../src/components/admin/ConfirmStudentUser';
import PageTable from '../../../src/components/template/PageTableForm';
import { shallowWithStore, createMockStore } from '../../helpers/component-with-store';
import { creators } from '../../../src/sagas/AdminSaga';
import ROLES from '../../../src/util/logic/AccountEnum';

const student = {
  item: {
    contract: '0xfa429bef26906146be2438c1892f8499e217b277',
    address: '0x1eff47bc3a10a45d4b230b5d10e37751fe6aa718',
    name: 'StudentName',
    surname: 'StudentName',
  },
};
const role = ROLES.UNCONFIRMED_STUDENT;
const contract = '0xfa429bef26906146be2438c1892f8499e217b277';
const students = [{
  contract: '0xfa429bef26906146be2438c1892f8499e217b277',
  address: '0x1eff47bc3a10a45d4b230b5d10e37751fe6aa718',
  name: 'StudentName',
  surname: 'StudentName',
}];
const defaultStore = {
  accounts: {
    loading: false,
    errored: false,
    studentsList: [],
    teachersList: [],
    pendingTeachersList: [],
    pendingStudentsList: [{
      contract: '0xfa429bef26906146be2438c1892f8499e217b277',
      address: '0x1eff47bc3a10a45d4b230b5d10e37751fe6aa718',
      name: 'StudentName',
      surname: 'StudentName',
    }],
  },
};

describe('ConfirmTeachers component', () => {
  // Testing simple component

  const SimpleWrapper = shallow(<SimpleComponent
    confirmStudent={e => e}
    getPendingStudents={e => e}
    denyStudent={e => e}
    pendingStudents={students}
  />);
  // 32
  it('Should render the simple component', () => {
    assert.equal(SimpleWrapper.length, 1);
  });
  // 33
  it('Should render the child components', () => {
    expect(SimpleWrapper.find(PageTable)).to.have.length(1);
  });

  // Testing states and methods
  // 34
  it('Should have the correct initial states', () => {
    expect(SimpleWrapper.state().confirm).to.deep.equal(false);
    expect(SimpleWrapper.state().deny).to.deep.equal(false);
  });
  // 35
  it('Should have correct states value after running viewConfirm()', () => {
    SimpleWrapper.instance().viewConfirm(student);
    expect(SimpleWrapper.state().confirm).to.deep.equal(true);
    expect(SimpleWrapper.state().deny).to.deep.equal(false);
    expect(SimpleWrapper.state().item).to.deep.equal(student);
  });
  // 36
  it('Should have correct states value after running closeConfirm()', () => {
    SimpleWrapper.instance().closeConfirm(student);
    expect(SimpleWrapper.state().confirm).to.deep.equal(false);
    expect(SimpleWrapper.state().deny).to.deep.equal(false);
  });
  // 37
  it('Should have correct states value after running viewDeny()', () => {
    SimpleWrapper.instance().viewDeny(student);
    expect(SimpleWrapper.state().confirm).to.deep.equal(false);
    expect(SimpleWrapper.state().deny).to.deep.equal(true);
    expect(SimpleWrapper.state().item).to.deep.equal(student);
  });
  // 38
  it('Should have correct states value after running closeDeny()', () => {
    SimpleWrapper.instance().closeDeny(student);
    expect(SimpleWrapper.state().confirm).to.deep.equal(false);
    expect(SimpleWrapper.state().deny).to.deep.equal(false);
  });

  // Testing container part
  // 39
  it('Should connect right to the props', () => {
    const wrapper = shallowWithStore(<ContainerComponent />, defaultStore);
    expect(wrapper.props().pendingStudents).to.deep.equal(students);
    expect(wrapper.props().pendingStudents).to.be.an('array');
  });
  // 40
  it('Should fire the correct actions', () => {
    const store = createMockStore(defaultStore);
    const wrapper = shallowWithStore(<ContainerComponent />, store);
    wrapper.props().confirmStudent(student);
    wrapper.props().denyStudent(student);
    wrapper.props().getPendingStudents();
    expect(store.isActionDispatched(creators.getPendingStudentsAction())).to.be.true;
    expect(store.isActionDispatched(creators.approveUserAction(role, contract))).to.be.true;
    expect(store.isActionDispatched(creators.denyUserAction(role, contract))).to.be.true;
  });
});
