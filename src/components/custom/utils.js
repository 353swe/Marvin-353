
class Utils {
  static generateKey(paramObj) {
    try {
      const obj = JSON.stringify(paramObj);
      return btoa(obj);
    } catch (e) {
      return paramObj.toString();
    }
  }

  static existValue(e) {
    if (typeof e === 'undefined' || e.length === 0) { return 2; }
    return 1;
  }

  static notNullValue(e) {
    if (e !== '') return 1; return 2;
  }

  static validString(e) {
    // eslint-disable-next-line no-restricted-globals
    if (e !== '' && isNaN(e)) return 1; return 2;
  }

  static validEthAddress(ind) {
    if (ind.length === 0) {
      return 2;
    }
    if (!/^(0x)[0-9a-f]{40}$/i.test(ind) && typeof web3 !== 'undefined') {
      if (!web3.isAddress(ind)) {
        return 0;
      }
    }
    return 1;
  }

  static moreThanCurrentYear(year) {
    if (year !== '') {
      if (year >= (new Date()).getFullYear() && year < 65535) { return 1; }
      return 0;
    }
    return 2;
  }

  static validGrade(grade) {
    if (grade !== '') {
      if (grade >= 18 && grade <= 31) { return 1; }
      return 0;
    }
    return 2;
  }

  static positiveNumber(number) {
    if (number !== '') {
      const num = parseInt(number, 10);
      if (num > 0) { return 1; }
      return 0;
    }
    return 2;
  }

  static alwaysTrue(e) {
    return (1 || e);
  }
}

export default Utils;
