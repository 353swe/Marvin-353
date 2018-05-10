import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import { Button } from 'react-bootstrap';
import assert from 'assert';
import { expect } from 'chai'; // eslint-disable-line import/no-extraneous-dependencies
import ContainerComponent, { ExamDetails } from '../../../src/components/admin/ExamDetails';
import ModalForm from '../../../src/components/custom/ModalForm';
import { shallowWithStore, createMockStore } from '../../helpers/component-with-store';
import { creators as examSagaAction } from '../../../src/sagas/ManageExamsSaga';

const exam1 = {
  name: 'Programming',
  credits: '10',
  courseName: 'L-16',
  year: '2017',
  teacherName: 'Gilberto',
  teacherSurname: 'Filè',
  examAddress: '0x811da72aca31e56f770fc33df0e45fd08720e157',
  mandatory: true,
  courseAddress: '0x4bd1280852cadb002734647305afc1db7ddd6acb',
  teacherAddress: '0x79196b90d1e952c5a43d4847caa08d50b967c34a',
};
const exam2 = {
  name: 'Programming',
  credits: '10',
  courseName: 'L-16',
  year: '2017',
  teacherName: '',
  teacherSurname: '',
  examAddress: '0x811da72aca31e56f770fc33df0e45fd08720e157',
  mandatory: true,
  courseAddress: '0x4bd1280852cadb002734647305afc1db7ddd6acb',
  teacherAddress: '',
};

const tList = [
  {
    address: '0x3208943bb296567011d45936dceaaa64a4ca2085',
    name: 'tullio',
    surname: 'vardanega',
  },
];

const nextProps = {
  object: { exam2 },
  teacherList: tList,
};

const defaultStore = {
  teachersList: {
    loading: false,
    errored: false,
    list: tList,
  },
};

describe('ExamDetails component', () => {
  // 50
  it('Should render the component', () => {
    const wrapper1 = shallow( // eslint-disable-line function-paren-newline
      <ExamDetails
        object={exam1}
        show
        getTeachers={e => e}
        setTeacher={e => e}
        teacherList={[]}
      />);
    assert.equal(wrapper1.length, 1);
    expect(wrapper1.find(ModalForm)).to.have.length(2);
  });
  // 51
  it('Should have the correct initial state', () => {
    const wrapper1 = shallow( // eslint-disable-line function-paren-newline
      <ExamDetails
        object={exam1}
        show
        getTeachers={e => e}
        setTeacher={e => e}
        teacherList={[]}
      />);
    expect(wrapper1.state().assignTeacher).to.equal(false);
    expect(wrapper1.state().teacherAddress).to.equal(null);
  });
  // 52
  it('Should render the Assign Teacher Button if the teacher is not set', () => {
    const wrapper2 = shallow(<ExamDetails
      object={exam2}
      moreDetails
      show
      getTeachers={e => e}
      setTeacher={e => e}
    />);
    expect(wrapper2.find(Button)).to.have.length(1);
  });
  // 53
  it('Should call componentWillReceiveProps(nextProps)', () => {
    const wrapper1 = shallow( // eslint-disable-line function-paren-newline
      <ExamDetails
        object={exam1}
        show
        getTeachers={e => e}
        setTeacher={e => e}
        teacherList={[]}
      />);
    wrapper1.instance().componentWillReceiveProps(nextProps);
    expect(wrapper1.state().teacherAddress).to.equal(nextProps.teacherList[0].address);
  });
  // 54
  it('Should call teacher() and not render the Assign teacher button', () => {
    const wrapper1 = shallow( // eslint-disable-line function-paren-newline
      <ExamDetails
        object={exam1}
        show
        getTeachers={e => e}
        setTeacher={e => e}
        teacherList={[]}
      />);
    wrapper1.instance().teacher();
    expect(wrapper1.find(Button)).to.have.length(0);
  });
  // 55
  it('Should call teacher() and render the Assign teacher button', () => {
    const wrapper2 = shallow(<ExamDetails
      object={exam2}
      moreDetails
      show
      getTeachers={e => e}
      setTeacher={e => e}
    />);
    wrapper2.instance().teacher();
    expect(wrapper2.find(Button)).to.have.length(1);
  });
  // 56
  it('Should call showAssignTeacher() and change state', () => {
    const wrapper1 = shallow( // eslint-disable-line function-paren-newline
      <ExamDetails
        object={exam1}
        show
        getTeachers={e => e}
        setTeacher={e => e}
        teacherList={[]}
      />);
    wrapper1.instance().showAssignTeacher();
    expect(wrapper1.state().assignTeacher).to.equal(true);
  });
  // 57
  it('Should call notDelete() and change state', () => {
    const wrapper1 = shallow( // eslint-disable-line function-paren-newline
      <ExamDetails
        object={exam1}
        show
        getTeachers={e => e}
        setTeacher={e => e}
        teacherList={[]}
      />);
    wrapper1.instance().notDelete();
    expect(wrapper1.state().assignTeacher).to.equal(false);
  });
  // 58
  it('Should call assTeacher()', () => {
    const wrapper2 = shallow(<ExamDetails
      object={exam2}
      moreDetails
      show
      getTeachers={e => e}
      setTeacher={e => e}
    />);
    wrapper2.instance().assTeacher();
  });
  // 59
  it('Should call moreDetails()', () => {
    const wrapper2 = shallow(<ExamDetails
      object={exam2}
      moreDetails
      show
      getTeachers={e => e}
      setTeacher={e => e}
    />);
    wrapper2.instance().moreDetails();
  });
  // 60
  it('Should connect right to the props', () => {
    const wrapper = shallowWithStore(<ContainerComponent />, defaultStore);
    expect(wrapper.props().teacherList).to.deep.equal(tList);
    expect(wrapper.props().loadingTeacher).to.equal(false);
  });
  // 61
  it('Should fire the correct actions', () => {
    const store = createMockStore(defaultStore);
    const wrapper = shallowWithStore(<ContainerComponent />, store);
    wrapper.props().getTeachers();
    wrapper.props().setTeacher('0x811da72aca31e56f770fc33df0e45fd08720e157', '0x4bd1280852cadb002734647305afc1db7ddd6acb');
    expect(store.isActionDispatched(examSagaAction.getTeachers()))
      .to.equal(true);
    expect(store.isActionDispatched(examSagaAction.associateProfessorToExamAction(
      '0x811da72aca31e56f770fc33df0e45fd08720e157',
      '0x4bd1280852cadb002734647305afc1db7ddd6acb',
    ))).to.equal(true);
  });
});

