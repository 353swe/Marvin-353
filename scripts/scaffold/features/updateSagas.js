import fs from 'fs';
const aggregator_path = 'src/sagas.js';
function pushAt(str, index, replacement) {
    return str.substr(0, index) +
    replacement +
    str.substr(index);
}
export default function updateSagas(name){
  let aggr = fs.readFileSync(aggregator_path, { encoding: 'utf8' });
  let start = aggr.indexOf("export");
  aggr = pushAt(aggr, start - 1, `import ${name} from './sagas/${name}Saga';\n\n`);
  let forked = aggr.match(/\[([^\]]+)\]/mg)[0];
  forked = forked.substr(1, forked.length-2);
  aggr = aggr.replace(forked, `${forked}  fork(${name}),\n  `);
  fs.writeFileSync(aggregator_path, aggr, { flag: 'w+' });
  return aggregator_path;
}
