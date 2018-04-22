const range = (from = 0, to = from) => {
  if (to < from) throw new TypeError(`${to} is lower than ${from}`);
  const target = [];
  for (let i = from; i <= to; (i += 1)) target.push(i);
  return target;
};
const copyNPush = (target, el) => {
  const assigned = Object.assign([], target);
  if (!(target.push instanceof Function)) throw new TypeError('Provided target does not have a push function');
  if (el === undefined) return assigned;
  assigned.push(el);
  return assigned;
};
const copyNPop = (target, fn) => {
  const assigned = Object.assign([], target);
  if (!(fn instanceof Function)) throw new TypeError('Provided function is not a function');
  if (!(target.findIndex instanceof Function) || !(target.splice instanceof Function)) {
    throw new TypeError('Provided target doesn\'t have splice and findIndex function');
  }
  const idx = assigned.findIndex(fn);
  if (idx !== -1) assigned.splice(idx, 1);
  return assigned;
};
export { range, copyNPop, copyNPush };
