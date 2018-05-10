import assert from 'assert';
import Utils from '../../../src/components/custom/utils';

describe('Utils functions', () => {
  // 124
  it('should generate correct key', () => {
    const keyGenerated = Utils.generateKey('prova');
    assert.equal(keyGenerated, 'InByb3ZhIg==');
  });
  // 125
  it('should existValue', () => {
    const existValue = Utils.existValue('prova');
    assert.equal(existValue, 1);
  });
  // 126
  it('should not existValue', () => {
    const existValue1 = Utils.existValue();
    assert.equal(existValue1, 2);
    const existValue2 = Utils.existValue('');
    assert.equal(existValue2, 2);
  });
  // 127
  it('should notNullValue', () => {
    const value = Utils.notNullValue('gianni');
    assert.equal(value, 1);
  });
  // 128
  it('should not notNullValue', () => {
    const value = Utils.notNullValue('');
    assert.equal(value, 2);
  });
  // 129
  it('should work Eth address checker', () => {
    const addr1 = Utils.validEthAddress('');
    assert.equal(addr1, 2);
    const addr3 = Utils.validEthAddress('0x5AEDA56215b167893e80B4fE645BA6d5Bab767DE');
    assert.equal(addr3, 1);
  });
  // 130
  it('should work moreThanCurrentYear', () => {
    const year1 = Utils.moreThanCurrentYear('');
    assert.equal(year1, 2);
    const year2 = Utils.moreThanCurrentYear((new Date()).getFullYear());
    assert.equal(year2, 1);
    const year3 = Utils.moreThanCurrentYear((new Date()).getFullYear() - 1);
    assert.equal(year3, 0);
  });
  // 131
  it('should work grade from 18 to 31 (summa lode)', () => {
    const grade1 = Utils.validGrade('');
    assert.equal(grade1, 2);
    const grade2 = Utils.validGrade(32);
    assert.equal(grade2, 0);

    const grade3 = Utils.validGrade(31);
    assert.equal(grade3, 1);
    const grade4 = Utils.validGrade(17);
    assert.equal(grade4, 0);
    const grade5 = Utils.validGrade(18);
    assert.equal(grade5, 1);
  });
  // 132
  it('always true', () => {
    assert.equal(Utils.alwaysTrue(), 1);
    assert.equal(Utils.alwaysTrue(3), 1);
    assert.equal(Utils.alwaysTrue(0), 1);
    assert.equal(Utils.alwaysTrue(-3), 1);
    assert.equal(Utils.alwaysTrue('string'), 1);
  });

  // 133
  it('check is valid String', () => {
    assert.equal(Utils.validString(3), 2);
    assert.equal(Utils.validString(0), 2);
    assert.equal(Utils.validString(-3), 2);
    assert.equal(Utils.validString('-4a'), 1);
    assert.equal(Utils.validString('a1'), 1);
    assert.equal(Utils.validString('string'), 1);
  });
});
