import { expect } from 'chai';
import * as Helpers from '../../src/util/js_helpers';

describe('range function', () => {
  // 1
  it('should throw an error with invalid params', () => {
    expect(() => Helpers.range(6, 5)).to.throw(TypeError, '5 is lower than 6');
    expect(() => Helpers.range(4, 5)).to.not.throw();
  });
  // 2
  it('should a range from 0 to 0 where called without params', () => {
    expect(Helpers.range()).to.deep.equal([0]);
  });
  // 3
  it('Should return mono ranges when called with one param', () => {
    expect(Helpers.range(5)).to.deep.equal([5]);
  });
  // 4
  it('should return ranges when called', () => {
    expect(Helpers.range(1, 5)).to.deep.equal([1, 2, 3, 4, 5]);
    expect(Helpers.range(2, 3)).to.deep.equal([2, 3]);
  });
});
describe('copyNPush function', () => {
  // 5
  it('should return an identical copy if the element is undefined', () => {
    const arr = [5];
    expect(Helpers.copyNPush(arr)).to.deep.equal([5]);
    expect(Helpers.copyNPush(arr)).to.not.equal(arr);
  });
  // 56
  it('should append the element to the array', () => {
    expect(Helpers.copyNPush([1, 2], 3)).to.deep.equal([1, 2, 3]);
  });
  // 57
  it('should throw an exception if the first params does not have a push function', () => {
    expect(() => Helpers.copyNPush({}, 5)).to.throw(TypeError, 'Provided target does not have a push function');
    expect(() => Helpers.copyNPush({ push: null }, 5)).to.throw(TypeError);
    expect(() => Helpers.copyNPush([], 5)).to.not.throw();
  });
});
describe('copyNPop function', () => {
  // 58
  it('should return and identical copy if the provided function return false', () => {
    const arr = [5];
    const fn = el => el === 6;
    expect(Helpers.copyNPop(arr, fn)).to.deep.equal([5]);
    expect(Helpers.copyNPop(arr, fn)).to.not.equal(arr);
  });
  // 59
  it('should pop the element from the array if the provided function return true', () => {
    expect(Helpers.copyNPop([3, 4], el => el === 3)).to.deep.equal([4]);
  });
  it('should throw an exception if the provided function is not a function', () => {
    expect(() => Helpers.copyNPop([], undefined)).to.throw(TypeError, 'Provided function is not a function');
    expect(() => Helpers.copyNPop([], 'notAFunction')).to.throw(TypeError);
    expect(() => Helpers.copyNPop([], () => true)).to.not.throw();
  });
  // 10
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
describe('updateObjInArr function', () => {
  // 11
  it('should return an identical copy if the provided function return false', () => {
    const arr = [{ a: '5' }, { a: '6' }];
    const fn = el => el.a === '7';
    const obj = { a: '9' };
    expect(Helpers.updateObjInArr(arr, fn, obj)).to.deep.equal([{ a: '5' }, { a: '6' }]);
    expect(Helpers.updateObjInArr(arr, fn, obj)).to.not.equal(arr);
  });
  // 12
  it('should update only the specified fields if the function return true', () => {
    const arr = [{ a: '5', b: '8' }, { a: '6', b: '9' }];
    const fn = el => el.a === '5';
    const obj = { a: '9' };
    expect(Helpers.updateObjInArr(arr, fn, obj)).to.deep.equal([
      { a: '9', b: '8' },
      { a: '6', b: '9' },
    ]);
  });
  // 13
  it('should throw TypeError if the specified function is not a function', () => {
    const arr = [];
    const fn = {};
    const obj = {};
    expect(() => Helpers.updateObjInArr(arr, fn, obj)).to.throw(TypeError);
    expect(() => Helpers.updateObjInArr(arr, () => {}, obj)).to.not.throw();
  });
  // 14
  it('should throw TypeError if the specified target has not a findIndex method', () => {
    const arr = { findIndex: undefined };
    const fn = () => false;
    const obj = {};
    expect(() => Helpers.updateObjInArr(arr, fn, obj)).to.throw(TypeError);
    expect(() => Helpers.updateObjInArr([], fn, obj)).to.not.throw();
  });
});
