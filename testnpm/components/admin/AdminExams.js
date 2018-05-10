import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { shallow } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import assert from 'assert';
import { expect } from 'chai'; // eslint-disable-line import/no-extraneous-dependencies
import ContainerComponent, { AdminExams } from '../../../src/components/admin/AdminExams';
import PageTableForm from '../../../src/components/template/PageTableForm';
import { creators as universitySagaAction } from '../../../src/sagas/ManageYearsSaga';
import { creators as examSagaAction } from '../../../src/sagas/ManageExamsSaga';
import { shallowWithStore, createMockStore } from '../../helpers/component-with-store';

const academicYears = [
  2018,
  2019,
  2020,
];

const examList = [
  {
    address: '0x36a629386700746989d6c5995ba750e7cdf8822c',
    courseAddress: '0x77fa427aa4600e31e2f32c129217631320cd0534',
    courseName: 'p-48',
    credits: 12,
    mandatory: false,
    name: 'lopo',
    professorName: 'mario',
    professorSurname: 'rossi',
    solarYear: 2019,
    teacherAddress: '0xa4a72bbb711a4b81e60dc4d7a952d209c51f80e0',
    teacherName: 'mario',
    teacherSurname: 'rossi',
  },
];

const nextProps = {
  examList: { examList },
  academicYears: { academicYears },
};

const defaultStore = {
  manageYears: {
    loading: false,
    errored: false,
    accademicYears: academicYears,
  },
  exams: {
    errored: false,
    loading: false,
    list: examList,
  },
};

describe('AdminExams component', () => {
  // 24
  it('Should render the component', () => {
    const wrapper = shallow( // eslint-disable-line function-paren-newline
      <AdminExams
        examList={examList}
        getYears={e => e}
        getAllExams={e => e}
        academicYears={academicYears}
        yearLoading={false}
        listLoading={false}
      />);
    assert.equal(wrapper.length, 1);
    expect(wrapper.find(FormGroup)).to.have.length(1);
    expect(wrapper.find(ControlLabel)).to.have.length(1);
    expect(wrapper.find(FormControl)).to.have.length(1);
    expect(wrapper.find(PageTableForm)).to.have.length(1);
  });
  // 25
  it('Should not render the table if the table is not loading', () => {
    const wrapper2 = shallow( // eslint-disable-line function-paren-newline
      <AdminExams
        examList={null}
        getYears={e => e}
        getAllExams={e => e}
        academicYears={academicYears}
        yearLoading={false}
        listLoading
      />);
    assert.equal(wrapper2.length, 1);
    expect(wrapper2.find(FormGroup)).to.have.length(1);
    expect(wrapper2.find(ControlLabel)).to.have.length(1);
    expect(wrapper2.find(FormControl)).to.have.length(1);
    expect(wrapper2.find(PageTableForm)).to.have.length(0);
  });
  // 26
  it('Should not render the year options if the year list is not loading', () => {
    const wrapper2 = shallow( // eslint-disable-line function-paren-newline
      <AdminExams
        examList={null}
        getYears={e => e}
        getAllExams={e => e}
        academicYears={academicYears}
        yearLoading={false}
        listLoading
      />);
    assert.equal(wrapper2.length, 1);
    expect(wrapper2.find(FormGroup)).to.have.length(1);
    expect(wrapper2.find(ControlLabel)).to.have.length(1);
    expect(wrapper2.find(FormControl)).to.have.length(1);
    expect(wrapper2.find(PageTableForm)).to.have.length(0);
    expect(wrapper2.html().search('<options') !== -1, false);
  });
  // 27
  it('Should have the correct initial state', () => {
    const wrapper = shallow( // eslint-disable-line function-paren-newline
      <AdminExams
        examList={examList}
        getYears={e => e}
        getAllExams={e => e}
        academicYears={academicYears}
        yearLoading={false}
        listLoading={false}
      />);
    expect(wrapper.state().showDetails).to.equal(false);
  });
  // 28
  it('Should call componentWillReceiveProps(nextProps)', () => {
    const wrapper2 = shallow( // eslint-disable-line function-paren-newline
      <AdminExams
        examList={null}
        getYears={e => e}
        getAllExams={e => e}
        academicYears={academicYears}
        yearLoading={false}
        listLoading
      />);
    wrapper2.instance().componentWillReceiveProps(nextProps);
    expect(wrapper2.state().year).to.equal(nextProps.academicYears[0]);
  });
  // 29
  it('Should call viewDetails(item)', () => {
    const wrapper2 = shallow( // eslint-disable-line function-paren-newline
      <AdminExams
        examList={null}
        getYears={e => e}
        getAllExams={e => e}
        academicYears={academicYears}
        yearLoading={false}
        listLoading
      />);
    wrapper2.instance().viewDetails(examList[0]);
    expect(wrapper2.state().showDetails).to.equal(true);
    expect(wrapper2.state().item).to.equal(examList[0]);
  });
  // 30
  it('Should connect right to the props', () => {
    const wrapper = shallowWithStore(<ContainerComponent />, defaultStore);
    expect(wrapper.props().academicYears).to.deep.equal(academicYears);
    expect(wrapper.props().examList).to.deep.equal(examList);
    expect(wrapper.props().listLoading).to.equal(false);
    expect(wrapper.props().yearLoading).to.equal(false);
  });
  // 31
  it('Should fire the correct actions', () => {
    const store = createMockStore(defaultStore);
    const wrapper = shallowWithStore(<ContainerComponent />, store);
    wrapper.props().getAllExams(2018);
    wrapper.props().getYears();
    expect(store.isActionDispatched(examSagaAction.getAllExamsAction(2018)))
      .to.equal(true);
    expect(store.isActionDispatched(universitySagaAction.getAllYears()))
      .to.equal(true);
  });
});
