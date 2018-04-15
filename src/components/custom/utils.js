
class Utils {
  static generateKey(paramObj) {
    const obj = JSON.stringify(paramObj);
    return btoa(obj);
  }

  static existValue(e) {
    if (typeof e === 'undefined' || e.length === 0) { return 2; }
    return 1;
  }

  static notNullValue(e) {
    if (e !== '') return 1; return 2;
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
      if (year >= (new Date()).getFullYear()) { return 1; }
      return 0;
    }
    return 2;
  }

  static validGrade(grade) {
    if (grade !== '') {
      if (grade >= 0 && grade <= 31) { return 1; }
      return 0;
    }
    return 2;
  }

  static alwaysTrue(e) {
    return (1 || e);
  }
}

export default Utils;
