import { expect } from 'chai';
import * as Helpers from '../../src/util/js_helpers';

describe('range function', () => {
  it('should throw an error with invalid params', () => {
    expect(() => Helpers.range(6, 5)).to.throw(TypeError, '5 is lower than 6');
    expect(() => Helpers.range(4, 5)).to.not.throw();
  });
  it('should a range from 0 to 0 where called without params', () => {
    expect(Helpers.range()).to.deep.equal([0]);
  });
  it('Should return mono ranges when called with one param', () => {
    expect(Helpers.range(5)).to.deep.equal([5]);
  });
  it('should return ranges when called', () => {
    expect(Helpers.range(1, 5)).to.deep.equal([1, 2, 3, 4, 5]);
    expect(Helpers.range(2, 3)).to.deep.equal([2, 3]);
  });
});
describe('copyNPush function', () => {
  it('should return an identical copy if the element is undefined', () => {
    const arr = [5];
    expect(Helpers.copyNPush(arr)).to.deep.equal([5]);
    expect(Helpers.copyNPush(arr)).to.not.equal(arr);
  });
  it('should append the element to the array', () => {
    expect(Helpers.copyNPush([1, 2], 3)).to.deep.equal([1, 2, 3]);
  });
  it('should throw an exception if the first params does not have a push function', () => {
    expect(() => Helpers.copyNPush({}, 5)).to.throw(TypeError, 'Provided target does not have a push function');
    expect(() => Helpers.copyNPush({ push: null }, 5)).to.throw(TypeError);
    expect(() => Helpers.copyNPush([], 5)).to.not.throw();
  });
});
describe('copyNPop function', () => {
  it('should return and identical copy if the provided function return false', () => {
    const arr = [5];
    const fn = el => el === 6;
    expect(Helpers.copyNPop(arr, fn)).to.deep.equal([5]);
    expect(Helpers.copyNPop(arr, fn)).to.not.equal(arr);
  });
  it('should pop the element from the array if the provided function return true', () => {
    expect(Helpers.copyNPop([3, 4], el => el === 3)).to.deep.equal([4]);
  });
  it('should throw an exception if the provided function is not a function', () => {
    expect(() => Helpers.copyNPop([], undefined)).to.throw(TypeError, 'Provided function is not a function');
    expect(() => Helpers.copyNPop([], 'notAFunction')).to.throw(TypeError);
    expect(() => Helpers.copyNPop([], () => true)).to.not.throw();
  });
  it('should throw an exception if the target does not have the necessary methods', () => {
    const fn = () => true;
    expect(() => Helpers.copyNPop({}, fn)).to.throw(TypeError, 'Provided target doesn\'t have splice and findIndex function');
    expect(() => Helpers.copyNPop({ splice: undefined, findIndex: () => -1 }, fn))
      .to.throw(TypeError);
    expect(() => Helpers.copyNPop({ findIndex: undefined, splice: () => -1 }, fn))
      .to.throw(TypeError);
    expect(() => Helpers.copyNPop([], fn)).to.not.throw();
  });
});
