import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import assert from 'assert';
import { expect } from 'chai'; // eslint-disable-line import/no-extraneous-dependencies
import ContainerComponent, { Register } from '../../../src/components/public/Register';
import Form from '../../../src/components/custom/Form';
import ModalForm from '../../../src/components/custom/ModalForm';
import { creators } from '../../../src/sagas/BookingSaga';
import { shallowWithStore, createMockStore } from '../../helpers/component-with-store';

const objForm = {
  name: {
    index: 0,
    valid: 1,
    value: 'pippo',
  },
  surname: {
    index: 1,
    valid: 1,
    value: 'pippo',
  },
  userType: {
    index: 2,
    valid: 1,
    value: 'student',
  },
};

const objForm2 = {
  name: {
    index: 0,
    valid: 1,
    value: 'pluto',
  },
  surname: {
    index: 1,
    valid: 1,
    value: 'pluto',
  },
  userType: {
    index: 2,
    valid: 1,
    value: 'teacher',
  },
};

const objCourse = {
  courseCode: {
    index: 0,
    valid: 1,
    value: 'P-44',
  },
};

const coursesContracts = [
  '0xe4418428b04b8e8173e427511cb974ec054fd7ef',
];

const coursesForStudent = [
  'P-44',
];

const defaultStore = {
  signup: {
    loading: false,
    errored: false,
    availableCourses: {
      loading: false,
      errored: false,
    },
    listAddress: coursesContracts,
    listNames: coursesForStudent,
  },
};

describe('AdminCourseExams component', () => {
  const wrapper = shallow( // eslint-disable-line function-paren-newline
    <Register
      signUp={e => e}
      getCourses={e => e}
      coursesForStudent={coursesForStudent}
      coursesContracts={coursesContracts}
    />);
  // 157
  it('Should render the component', () => {
    assert.equal(wrapper.length, 1);
    expect(wrapper.html().search('<h1') !== -1, true);
    expect(wrapper.find(Form)).to.have.length(2);
    expect(wrapper.find(ModalForm)).to.have.length(1);
  });
  // 158
  it('Should have the correct initial state', () => {
    expect(wrapper.state().viewModalCourse).to.equal(false);
  });
  // 159
  it('Should call componentDidMount()', () => {
    wrapper.instance().componentDidMount();
  });
  // 160
  it('Should call addRole(objArr) to register a new student', () => {
    wrapper.instance().addRole(objForm);
    expect(wrapper.state().viewModalCourse).to.equal(true);
    expect(wrapper.state().name).to.equal(objForm.name.value);
    expect(wrapper.state().surname).to.equal(objForm.surname.value);
  });
  // 161
  it('Should call addRole(objArr) to register a new teacher', () => {
    wrapper.instance().addRole(objForm2);
  });
  // 162
  it('Should call addStudent(courseForm) to set the course of a new student', () => {
    wrapper.instance().addStudent(objCourse);
    expect(wrapper.state().viewModalCourse).to.equal(false);
    expect(wrapper.state().name).to.equal('');
    expect(wrapper.state().surname).to.equal('');
  });
  // 163
  it('Should connect right to the props', () => {
    const wrapper2 = shallowWithStore(<ContainerComponent />, defaultStore);
    expect(wrapper2.props().coursesForStudent).to.equal(coursesForStudent);
    expect(wrapper2.props().coursesContracts).to.equal(coursesContracts);
  });
  // 164
  it('Should fire the correct actions', () => {
    const store = createMockStore(defaultStore);
    const wrapper2 = shallowWithStore(<ContainerComponent />, store);
    wrapper2.props().getCourses();
    expect(store.isActionDispatched(creators.performLoad((new Date()).getFullYear())))
      .to.equal(true);
    wrapper2.props().signUp('pippo', 'pluto', null);
    expect(store.isActionDispatched(creators.performSignUp('pippo', 'pluto', null))).to.equal(true);
  });
});
