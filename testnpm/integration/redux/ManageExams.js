import { expectSaga } from 'redux-saga-test-plan';
import { expect } from 'chai';
import * as matchers from 'redux-saga-test-plan/matchers';
import CourseReducer, { creators as CourseCreators } from '../../../src/ducks/CourseExams';
import TeacherReducer, { creators as TeacherCreators } from '../../../src/ducks/TeachersList';
import ExamsReducer, { creators as ExamsCreators } from '../../../src/ducks/ExamsList';
import * as sagas from '../../../src/sagas/ManageExamsSaga';
import * as Getters from '../../../src/sagas/helpers/getters';
import * as UniversityYear from '../../../src/web3calls/UniversityYear';
import * as Year from '../../../src/web3calls/Year';
import * as UniversityTeacher from '../../../src/web3calls/UniversityTeacher';
import * as Course from '../../../src/web3calls/Course';

const examsState = {
  loading: false,
  errored: false,
  list: [
    {
      courseName: 'Filosofia',
      courseAddress: '002',
      solarYear: 2017,
      address: 'E03',
      name: 'Filosofia di qualcosa',
      credits: 6,
      mandatory: false,
      professorName: 'Un bravo',
      professorSurname: 'Filosofo',
      professorAddress: '003',
    },
  ],
};
const courseExamsState = {
  loading: false,
  errored: false,
  list: [
    {
      address: 'E01',
      name: 'Analisi Matematica',
      credits: 12,
      mandatory: true,
      professorName: 'Caterina',
      professorSurname: 'Sartori',
      professorAddress: '001',
    },
    {
      address: 'E02',
      name: 'Calcolo Numerico',
      credits: 7,
      mandatory: true,
      professorName: 'Michela',
      professorSurname: 'Zaglia',
      professorAddress: '002',
    },
  ],
};

const { creators } = sagas;
const courseDetail = {
  courseAddress: '001',
  courseName: 'Scienze Informatiche',
  solarYear: 2017,
};
const courseExams = [
  {
    address: 'E01',
    name: 'Analisi Matematica',
    credits: 12,
    mandatory: true,
    enrolled: 2,
    professorName: 'Caterina',
    professorSurname: 'Sartori',
    professorAddress: '001',
  },
  {
    address: 'E02',
    name: 'Calcolo Numerico',
    credits: 7,
    mandatory: true,
    enrolled: 3,
    professorName: 'Michela',
    professorSurname: 'Zaglia',
    professorAddress: '002',
  },
];
const allExams = [
  Object.assign({}, courseExams[0], courseDetail),
  Object.assign({}, courseExams[1], courseDetail),
  {
    courseName: 'Filosofia',
    courseAddress: '002',
    solarYear: 2017,
    address: 'E03',
    name: 'Filosofia di qualcosa',
    enrolled: 4,
    credits: 6,
    mandatory: false,
    professorName: 'Un bravo',
    professorSurname: 'Filosofo',
    professorAddress: '003',
  },
];

describe('ManageExams feature', () => {
  // 18
  it('should retrieve the list of all exams given a solar year', async () => {
    const { storeState } = await expectSaga(sagas.getAllExams, creators.getAllExamsAction(2017))
      .withReducer(ExamsReducer)
      .provide({
        call: (effect, next) => {
          if (effect.fn === UniversityYear.getAcademicYearContractByYear) return '2017';
          if (effect.fn === Year.getCourseNumber) return 2;
          if (effect.fn === Year.getCourseContractAt) {
            if (effect.args[1] === 0) return '001';
            if (effect.args[1] === 1) return '002';
          }
          if (effect.fn === Getters.getCourseExamsList) {
            if (effect.args[0] === '001') return courseExams;
            if (effect.args[0] === '002') {
              return [{
                address: 'E03',
                name: 'Filosofia di qualcosa',
                credits: 6,
                enrolled: 4,
                mandatory: false,
                professorName: 'Un bravo',
                professorSurname: 'Filosofo',
                professorAddress: '003',
              }];
            }
          }
          if (effect.fn === Getters.getCourseData) {
            if (effect.args[0] === '001') return courseDetail;
            if (effect.args[0] === '002') {
              return {
                courseAddress: '002',
                courseName: 'Filosofia',
                solarYear: 2017,
              };
            }
          }
          return next();
        },
      })
      .put(ExamsCreators.listIsLoading())
      .run();
    expect(storeState).to.deep.equal({
      errored: false,
      loading: false,
      list: allExams,
    });
  });
  // 19
  it('should retrieve the list of all exams in a course given the address', () => expectSaga(sagas.getExamsByCourse, creators.getExamsByCourseAction('001'))
    .withReducer(CourseReducer)
    .provide([
      [matchers.call.fn(Getters.getCourseExamsList, '001'), courseExams],
    ])
    .hasFinalState({
      errored: false,
      loading: false,
      list: courseExams,
    })
    .put(CourseCreators.listIsLoading())
    .run());
  // 20
  it('should retrieve the list of all the active teachers', () => expectSaga(sagas.getTeachers, creators.getTeachers())
    .withReducer(TeacherReducer)
    .provide({
      call: (effect, next) => {
        if (effect.fn === UniversityTeacher.getTeacherNumber) return 2;
        if (effect.fn === UniversityTeacher.getTeacherContractAddressAt) {
          if (effect.args[0] === 0) return 'gibbo';
          if (effect.args[0] === 1) return 'ranzi';
        }
        if (effect.fn === Getters.getTeacherData) {
          if (effect.args[0] === 'gibbo') {
            return {
              address: 'gibbo',
              name: 'Gilberto',
              surname: 'File',
            };
          }
          if (effect.args[0] === 'ranzi') {
            return {
              address: 'ranzi',
              name: 'Francesco',
              surname: 'Ranzato',
            };
          }
        }
        return next();
      },
    })
    .hasFinalState({
      errored: false,
      loading: false,
      list: [
        {
          address: 'gibbo',
          name: 'Gilberto',
          surname: 'File',
        },
        {
          address: 'ranzi',
          name: 'Francesco',
          surname: 'Ranzato',
        },
      ],
    })
    .put(TeacherCreators.listIsLoading())
    .run());
  // 21
  it('should create a new exams and notify its success', () => expectSaga(
    sagas.addNewExam,
    creators.addNewExamAction('001', 'Sistemi Operativi', 10, true),
  )
    .withReducer(CourseReducer, courseExamsState)
    .provide([
      [
        matchers.call.fn(Course.addNewExam, '001', 'Sistemi Operativi', 10, true),
        true,
      ],
    ])
    .hasFinalState({
      loading: false,
      errored: false,
      list: [
        {
          address: 'E01',
          name: 'Analisi Matematica',
          credits: 12,
          mandatory: true,
          professorName: 'Caterina',
          professorSurname: 'Sartori',
          professorAddress: '001',
        },
        {
          address: 'E02',
          name: 'Calcolo Numerico',
          credits: 7,
          mandatory: true,
          professorName: 'Michela',
          professorSurname: 'Zaglia',
          professorAddress: '002',
        },
      ],
    })
    .put(CourseCreators.listIsLoading())
    .run());
  // 22
  it('should assign a teacher to an exam in the course exams list', () => expectSaga(
    sagas.associateProfessorToCourseExam,
    creators.associateProfessorToCourseExamAction('E02', '1'),
  )
    .withReducer(CourseReducer, courseExamsState)
    .provide([
      [matchers.call.fn(sagas.associateProfessor, 'E02', '1'), {
        professorAddress: '1',
        professorName: 'Primo',
        professorSurname: 'Levi',
      }],
    ])
    .hasFinalState({
      loading: false,
      errored: false,
      list: [
        {
          address: 'E01',
          name: 'Analisi Matematica',
          credits: 12,
          mandatory: true,
          professorName: 'Caterina',
          professorSurname: 'Sartori',
          professorAddress: '001',
        },
        {
          address: 'E02',
          name: 'Calcolo Numerico',
          credits: 7,
          mandatory: true,
          professorAddress: '1',
          professorName: 'Primo',
          professorSurname: 'Levi',
        },
      ],
    })
    .put(CourseCreators.listIsLoading())
    .run());
  // 23
  it('should assign a teacher to an exam in the all exams list', () => expectSaga(
    sagas.associateProfessorToExam,
    creators.associateProfessorToExamAction('E03', '1'),
  )
    .withReducer(ExamsReducer, examsState)
    .provide([
      [matchers.call.fn(sagas.associateProfessor, 'E03', '1'), {
        professorAddress: '1',
        professorName: 'Primo',
        professorSurname: 'Levi',
      }],
    ])
    .hasFinalState({
      loading: false,
      errored: false,
      list: [
        {
          courseName: 'Filosofia',
          courseAddress: '002',
          solarYear: 2017,
          address: 'E03',
          name: 'Filosofia di qualcosa',
          credits: 6,
          mandatory: false,
          professorAddress: '1',
          professorName: 'Primo',
          professorSurname: 'Levi',
        },
      ],
    })
    .run());
});
