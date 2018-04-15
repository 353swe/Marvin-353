import fs from 'fs';
import updateSagas from './features/updateSagas';
import { infoString, errorString, successString } from './helpers/colors';

const make = (name, tpl, path) => {
  let input = fs.readFileSync(tpl, { encoding: 'utf8' });
  const output = input.replace(/--Name--/g, name);
  fs.writeFileSync(path, output, { flag: "wx" });
}
const makeDuck = name => {
  const tpl = 'scripts/scaffold/templates/duck.tpl';
  const path = `src/ducks/${name}.js`
  make(name, tpl, path);
  return path;
};
const makeSaga = name => {
  const tpl = 'scripts/scaffold/templates/saga.tpl';
  const path = `src/sagas/${name}Saga.js`;
  make(name, tpl, path);
  return path;
};
const makeIntegrationTest = name => {
  const tpl = 'scripts/scaffold/templates/integration.tpl';
  const path = `testnpm/integration/redux/${name}.js`;
  make(name, tpl, path);
  return path;
}
const updateReducers = name => {


}
const printHelp = () =>{
console.log(`
babel-node generate.js TYPE NAME [options] \n
TYPE [duck, saga] => what file do you want to generate (specifying saga also the duck will be generated)
NAME => the name of your new module (it will append Duck/Saga)
\n\n
options:
--no-update => the generator won't update the aggregators
--help => print this help
`);
}
const args = process.argv.slice(2, 4);
const options = process.argv.slice(4);
if(process.argv.includes("--help")) {
  printHelp();
  process.exit();
}
if(args.length < 2){
  console.log("You must provide at least 2 arguments!")
  printHelp();
  process.exit(1);
}
const type = args[0].toLowerCase();
const name = `${args[1].charAt(0).toUpperCase()}${args[1].slice(1)}`;
try{
  switch(type){
    case('saga'):
      console.log(`Integration test generated at ${infoString(makeIntegrationTest(name))}`)
      console.log(`Saga generated at ${infoString(makeSaga(name))}`);
      console.log(`Sagas aggretator updated: ${infoString(updateSagas(name))}`)
    case('duck'):
      console.log(`Duck generated at ${infoString(makeDuck(name))}`);
      break;
    default:
      console.log(`${type} as type is not permitted!`);
      printHelp();
      process.exit(1);
  }
}catch(e){
  if(e.code === 'EEXIST'){
    console.log(errorString("ERROR!"));
    console.log("Sagas or Ducks with that name already exists.");
    console.log("Try change the new module name or delete the existen files.");
  }
  else console.log(e);
  process.exit(1);
}
console.log(successString("SUCCESS!"));
process.exit();
