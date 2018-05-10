import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import assert from 'assert';
import { expect } from 'chai'; // eslint-disable-line import/no-extraneous-dependencies
import ContainerComponent, { AdminCourseExams } from '../../../src/components/admin/AdminCourseExams';
import Form from '../../../src/components/custom/Form';
import PageTableForm from '../../../src/components/template/PageTableForm';
import { creators as examSagaAction } from '../../../src/sagas/ManageExamsSaga';
import { shallowWithStore, createMockStore } from '../../helpers/component-with-store';

const params = {
  examid: '0xe048078187ff40fa67b429ff1eeb82265f7c115a',
};

const location = {
  action: 'POP',
  hash: '',
  key: null,
  pathname: '/courses/0xe048078187ff40fa67b429ff1eeb82265f7c115a/',
  query:
    {
      name: 'G-44',
      year: '2018',
    },
  search: '?name=G-44&year=2018',
};

const exam = {
  address: '0xec4817cc93b96c61e9eb5be86d8e87f882fc0ac0',
  credits: 12,
  mandatory: false,
  name: 'math',
  professorName: '',
  professorSurname: '',
  teacherAddress: '0x0000000000000000000000000000000000000000',
  teacherName: '',
  teacherSurname: '',
};

const objForm = {
  examCredits: {
    index: 1,
    valid: 1,
    value: '3',
  },
  examName: {
    index: 0,
    valid: 1,
    value: 'eng',
  },
  optionalExam: {
    index: 2,
    valid: 1,
    value: '',
  },
};

const defaultStore = {
  manageYears: {
    loading: false,
    errored: false,
    accademicYears: [
      2018,
      2019,
      2020,
    ],
  },
  courseExams: {
    errored: false,
    loading: false,
    list: [
      exam,
    ],
  },
};

const array = [
  '0x252dae0a4b9d9b80f504f6418acd2d364c0c59cd',
  'P1',
  10,
  true,
];

describe('AdminCourseExams component', () => {
  // 10
  it('Should render the component', () => {
    const wrapper = shallow( // eslint-disable-line function-paren-newline
      <AdminCourseExams
        params={params}
        addExam={e => e}
        location={location}
      />);
    assert.equal(wrapper.length, 1);
    expect(wrapper.html().search('<h1') !== -1, true);
    expect(wrapper.find(Form)).to.have.length(1);
    expect(wrapper.find(PageTableForm)).to.have.length(1);
  });
  // 11
  it('Should have the correct initial state', () => {
    const wrapper = shallow( // eslint-disable-line function-paren-newline
      <AdminCourseExams
        params={params}
        addExam={e => e}
        location={location}
      />);
    expect(wrapper.state().showDetails).to.equal(false);
  });
  // 12
  it('Should change state when a button Details is clicked', () => {
    const wrapper = shallow( // eslint-disable-line function-paren-newline
      <AdminCourseExams
        params={params}
        addExam={e => e}
        location={location}
      />);
    wrapper.instance().viewDetails(exam);
    expect(wrapper.state().showDetails).to.equal(true);
  });
  // 13
  it('Should call addExamBuilder(objForm)', () => {
    const wrapper = shallow( // eslint-disable-line function-paren-newline
      <AdminCourseExams
        params={params}
        addExam={e => e}
        location={location}
      />);
    wrapper.instance().addExamBuilder(objForm);
  });
  // 14
  it('Should call getExamsByAddress()', () => {
    const wrapper = shallow( // eslint-disable-line function-paren-newline
      <AdminCourseExams
        params={params}
        addExam={e => e}
        location={location}
      />);
    wrapper.instance().getExamsByAddress();
  });
  // 15
  it('Should connect right to the props', () => {
    const wrapper = shallowWithStore(<ContainerComponent
      params={params}
      location={location}
    />, defaultStore);
    expect(wrapper.props().academicYears).to.deep.equal([2018, 2019, 2020]);
    expect(wrapper.props().examList).to.deep.equal([exam]);
  });
  // 16
  it('Should fire the correct actions', () => {
    const store = createMockStore(defaultStore);
    const wrapper = shallowWithStore(<ContainerComponent
      params={params}
      location={location}
    />, store);
    wrapper.props().addExam(array);
    wrapper.props().getExams(array[0]);
    expect(store.isActionDispatched(examSagaAction.addNewExamAction(
      array[0],
      array[1],
      array[2],
      array[3],
    ))).to.equal(true);
    expect(store.isActionDispatched(examSagaAction.getExamsByCourseAction(array[0])))
      .to.equal(true);
  });
});
