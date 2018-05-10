import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import assert from 'assert';
import { expect } from 'chai'; // eslint-disable-line import/no-extraneous-dependencies
import ContainerComponent, { AdminCourses } from '../../../src/components/admin/AdminCourses';
import Form from '../../../src/components/custom/Form';
import PageTableForm from '../../../src/components/template/PageTableForm';
import { creators as universitySagaAction } from '../../../src/sagas/ManageYearsSaga';
import { creators as courseSagaAction } from '../../../src/sagas/CourseSaga';
import { shallowWithStore, createMockStore } from '../../helpers/component-with-store';

const courseList = [
  {
    address: '0xe048078187ff40fa67b429ff1eeb82265f7c115a',
    credits: 180,
    name: 'G-44',
    year: 2018,
  },
  {
    address: '0x06cf7e8b937cc9665c99656d46145c5025475dd8',
    credits: 300,
    name: 'B-44',
    year: 2019,
  },
];

const academicYears = [
  2018,
  2019,
  2020,
];

const objForm = {
  courseCode: {
    index: 0,
    valid: 1,
    value: 'P-44',
  },
  courseTotalCredits: {
    index: 2,
    valid: 1,
    value: '300',
  },
  courseYear: {
    index: 1,
    valid: 1,
    value: '2019',
  },
};

const objForm2 = {
  courseCode: {
    index: 0,
    valid: 1,
    value: 'G-44',
  },
  courseTotalCredits: {
    index: 2,
    valid: 1,
    value: '180',
  },
  courseYear: {
    index: 1,
    valid: 1,
    value: '2018',
  },
};

const defaultStore = {
  course: {
    loading: false,
    errored: false,
    coursesList: courseList,
  },
  manageYears: {
    loading: false,
    errored: false,
    accademicYears: academicYears,
  },
};
const location = {
  pathname: '/course',
};

describe('AdminCourses component', () => {
  // 17
  it('Should render the component', () => {
    const wrapper = shallow( // eslint-disable-line function-paren-newline
      <AdminCourses
        addCourse={e => e}
        getCourses={e => e}
        courseList={courseList}
        getYears={e => e}
        academicYears={academicYears}
        location={location}
      />);
    assert.equal(wrapper.length, 1);
    expect(wrapper.find(Form)).to.have.length(1);
    expect(wrapper.find(FormGroup)).to.have.length(1);
    expect(wrapper.find(ControlLabel)).to.have.length(1);
    expect(wrapper.find(FormControl)).to.have.length(1);
    expect(wrapper.find(PageTableForm)).to.have.length(1);
  });
  // 18
  it('Should have the correct initial state', () => {
    const wrapper = shallow( // eslint-disable-line function-paren-newline
      <AdminCourses
        addCourse={e => e}
        getCourses={e => e}
        courseList={courseList}
        getYears={e => e}
        academicYears={academicYears}
        location={location}
      />);
    expect(wrapper.state().year).to.equal('ALL');
    expect(wrapper.state().viewErrorMessage).to.equal(false);
  });
  // 19
  it('Should call tableData()', () => {
    const wrapper = shallow( // eslint-disable-line function-paren-newline
      <AdminCourses
        addCourse={e => e}
        getCourses={e => e}
        courseList={courseList}
        getYears={e => e}
        academicYears={academicYears}
        location={location}
      />);
    wrapper.instance().tableData();
  });
  // 20
  it('Should call validateCourse(item) and add it', () => {
    const wrapper = shallow( // eslint-disable-line function-paren-newline
      <AdminCourses
        addCourse={e => e}
        getCourses={e => e}
        courseList={courseList}
        getYears={e => e}
        academicYears={academicYears}
        location={location}
      />);
    wrapper.instance().validateCourse(objForm);
  });
  // 21
  it('Should call validateCourse(item) and not add it', () => {
    const wrapper = shallow( // eslint-disable-line function-paren-newline
      <AdminCourses
        addCourse={e => e}
        getCourses={e => e}
        courseList={courseList}
        getYears={e => e}
        academicYears={academicYears}
        location={location}
      />);
    wrapper.instance().validateCourse(objForm2);
  });
  // 22
  it('Should connect right to the props', () => {
    const wrapper = shallowWithStore(<ContainerComponent />, defaultStore);
    expect(wrapper.props().academicYears).to.deep.equal(academicYears);
    expect(wrapper.props().courseList).to.deep.equal(courseList);
  });
  // 23
  it('Should fire the correct actions', () => {
    const store = createMockStore(defaultStore);
    const wrapper = shallowWithStore(<ContainerComponent />, store);
    wrapper.props().addCourse(objForm);
    wrapper.props().getCourses();
    wrapper.props().getYears();
    expect(store.isActionDispatched(courseSagaAction.addNewCourse(
      objForm.courseYear.value,
      objForm.courseCode.value,
      objForm.courseTotalCredits.value,
    ))).to.equal(true);
    expect(store.isActionDispatched(courseSagaAction.getAllCourses()))
      .to.equal(true);
    expect(store.isActionDispatched(universitySagaAction.getAllYears()))
      .to.equal(true);
  });
});

