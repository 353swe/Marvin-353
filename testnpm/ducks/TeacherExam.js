import { expect } from 'chai';
import reducer, { selectors, initialState, creators } from '../../src/ducks/TeacherExam';
import { ORDERING } from '../../src/util/js_helpers';

const state = {
  teacherData: {
    list: [{
      code: 'A',
      courseName: 'B',
    },
    {
      code: 'B',
      course: 'A',
    }],
  },
};

describe('TeacherExams duck', () => {
  describe('setList', () => {
    // 53
    it('should set the correct list', () => {
      expect(reducer(initialState, creators.setList([1, 2, 3])))
        .to.deep.equal({
          loading: false,
          errored: false,
          list: [1, 2, 3],
        });
    });
    // 54
    it('should set an empty list when the list is null or undefined', () => {
      expect(reducer(initialState, creators.setList()).list).to.deep.equal([]);
      expect(reducer(initialState, creators.setList(null)).list).to.deep.equal([]);
      expect(reducer(initialState, creators.setList(undefined)).list).to.deep.equal([]);
    });
  });
  describe('examsbycode', () => {
    // 55
    it('should return the exams ordered by code in ascending order', () => {
      expect(selectors.examsByCode(state)).to.deep.equal([
        {
          code: 'A',
          courseName: 'B',
        },
        {
          code: 'B',
          course: 'A',
        },
      ]);
    });
    // 56
    it('should return the exams ordered by code in descending order', () => {
      expect(selectors.examsByCode(state, ORDERING.DESC)).to.deep.equal([
        {
          code: 'B',
          course: 'A',
        },
        {
          code: 'A',
          courseName: 'B',
        },
      ]);
    });
  });
  describe('examsbycourse', () => {
    // 57
    it('should return the exams ordered by course in ascending order', () => {
      expect(selectors.examsByCourse(state)).to.deep.equal([
        {
          code: 'B',
          course: 'A',
        },
        {
          code: 'A',
          courseName: 'B',
        },
      ]);
    });
    // 58
    it('should return the exams ordered by course in descending order', () => {
      expect(selectors.examsByCourse(state, ORDERING.DESC)).to.deep.equal([
        {
          code: 'A',
          courseName: 'B',
        },
        {
          code: 'B',
          course: 'A',
        },
      ]);
    });
  });
});
