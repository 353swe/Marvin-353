import assert from 'assert';
import Utils from '../../../src/components/custom/utils';

describe('Utils functions', () => {
  it('should generate correct key', () => {
    const keyGenerated = Utils.generateKey('prova');
    assert.equal(keyGenerated, 'InByb3ZhIg==');
  });

  it('should existValue', () => {
    const existValue = Utils.existValue('prova');
    assert.equal(existValue, 1);
  });
  it('should not existValue', () => {
    const existValue1 = Utils.existValue();
    assert.equal(existValue1, 2);
    const existValue2 = Utils.existValue('');
    assert.equal(existValue2, 2);
  });

  it('should notNullValue', () => {
    const value = Utils.notNullValue('gianni');
    assert.equal(value, 1);
  });

  it('should not notNullValue', () => {
    const value = Utils.notNullValue('');
    assert.equal(value, 2);
  });

  it('should work Eth address checker', () => {
    const addr1 = Utils.validEthAddress('');
    assert.equal(addr1, 2);
    const addr3 = Utils.validEthAddress('0x5AEDA56215b167893e80B4fE645BA6d5Bab767DE');
    assert.equal(addr3, 1);
  });

  it('should work moreThanCurrenyYear', () => {
    const year1 = Utils.moreThanCurrentYear('');
    assert.equal(year1, 2);
    const year2 = Utils.moreThanCurrentYear((new Date()).getFullYear());
    assert.equal(year2, 1);
    const year3 = Utils.moreThanCurrentYear((new Date()).getFullYear() - 1);
    assert.equal(year3, 0);
  });

  it('should work grade from 0 to 31 (summa lode)', () => {
    const grade1 = Utils.validGrade('');
    assert.equal(grade1, 2);
    const grade2 = Utils.validGrade(32);
    assert.equal(grade2, 0);

    const grade3 = Utils.validGrade(31);
    assert.equal(grade3, 1);
    const grade4 = Utils.validGrade(1);
    assert.equal(grade4, 1);
  });

  it('always true', () => {
    assert.equal(Utils.alwaysTrue(), 1);
    assert.equal(Utils.alwaysTrue(3), 1);
    assert.equal(Utils.alwaysTrue(0), 1);
    assert.equal(Utils.alwaysTrue(-3), 1);
    assert.equal(Utils.alwaysTrue('string'), 1);
  });
});
