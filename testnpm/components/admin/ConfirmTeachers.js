import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
import { expect } from '../../helpers/chai-enzyme';
import ContainerComponent, { ConfirmTeacher as SimpleComponent } from
  '../../../src/components/admin/ConfirmTeacherUser';
import PageTable from '../../../src/components/template/PageTableForm';
import { shallowWithStore, createMockStore } from '../../helpers/component-with-store';
import { creators } from '../../../src/sagas/AdminSaga';
import ROLES from '../../../src/util/logic/AccountEnum';

const teacher = {
  item: {
    contract: '0xfa429bef26906146be2438c1892f8499e217b277',
    address: '0x1eff47bc3a10a45d4b230b5d10e37751fe6aa718',
    name: 'TeacherName',
    surname: 'TeacherSurname',
  },
};
const role = ROLES.UNCONFIRMED_TEACHER;
const contract = '0xfa429bef26906146be2438c1892f8499e217b277';
const teachers = [{
  contract: '0xfa429bef26906146be2438c1892f8499e217b277',
  address: '0x1eff47bc3a10a45d4b230b5d10e37751fe6aa718',
  name: 'TeacherName',
  surname: 'TeacherSurname',
}];
const defaultStore = {
  accounts: {
    loading: false,
    errored: false,
    studentsList: [],
    teachersList: [],
    pendingStudentsList: [],
    pendingTeachersList: [{
      contract: '0xfa429bef26906146be2438c1892f8499e217b277',
      address: '0x1eff47bc3a10a45d4b230b5d10e37751fe6aa718',
      name: 'TeacherName',
      surname: 'TeacherSurname',
    }],
  },
};

describe('ConfirmTeachers component', () => {
  // Testing simple component
  const SimpleWrapper = shallow(<SimpleComponent
    confirmTeacher={e => e}
    getPendingTeachers={e => e}
    denyTeacher={e => e}
    pendingTeachers={teachers}
  />);
  // 41
  it('Should render the simple component', () => {
    assert.equal(SimpleWrapper.length, 1);
  });
  // 42
  it('Should render the child components', () => {
    expect(SimpleWrapper.find(PageTable)).to.have.length(1);
  });

  // Testing states and methods
  // 43
  it('Should have the correct initial states', () => {
    expect(SimpleWrapper.state().confirm).to.deep.equal(false);
    expect(SimpleWrapper.state().deny).to.deep.equal(false);
  });
  // 44
  it('Should have correct states value after running viewConfirm()', () => {
    SimpleWrapper.instance().viewConfirm(teacher);
    expect(SimpleWrapper.state().confirm).to.deep.equal(true);
    expect(SimpleWrapper.state().deny).to.deep.equal(false);
    expect(SimpleWrapper.state().item).to.deep.equal(teacher);
  });
  // 45
  it('Should have correct states value after running closeConfirm()', () => {
    SimpleWrapper.instance().closeConfirm(teacher);
    expect(SimpleWrapper.state().confirm).to.deep.equal(false);
    expect(SimpleWrapper.state().deny).to.deep.equal(false);
  });
  // 46
  it('Should have correct states value after running viewDeny()', () => {
    SimpleWrapper.instance().viewDeny(teacher);
    expect(SimpleWrapper.state().confirm).to.deep.equal(false);
    expect(SimpleWrapper.state().deny).to.deep.equal(true);
    expect(SimpleWrapper.state().item).to.deep.equal(teacher);
  });
  // 47
  it('Should have correct states value after running closeDeny()', () => {
    SimpleWrapper.instance().closeDeny(teacher);
    expect(SimpleWrapper.state().confirm).to.deep.equal(false);
    expect(SimpleWrapper.state().deny).to.deep.equal(false);
  });

  // Testing container part
  // 48
  it('Should connect right to the props', () => {
    const wrapper = shallowWithStore(<ContainerComponent />, defaultStore);
    expect(wrapper.props().pendingTeachers).to.deep.equal(teachers);
    expect(wrapper.props().pendingTeachers).to.be.an('array');
  });
  // 49
  it('Should fire the correct actions', () => {
    const store = createMockStore(defaultStore);
    const wrapper = shallowWithStore(<ContainerComponent />, store);
    wrapper.props().confirmTeacher(teacher);
    wrapper.props().denyTeacher(teacher);
    wrapper.props().getPendingTeachers();
    expect(store.isActionDispatched(creators.getPendingTEachersAction())).to.be.true;
    expect(store.isActionDispatched(creators.approveUserAction(role, contract))).to.be.true;
    expect(store.isActionDispatched(creators.denyUserAction(role, contract))).to.be.true;
  });
});
