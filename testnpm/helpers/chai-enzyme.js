/**
 * Little helper to setup the enzyme, chai-enzyme and js-dom
 * environment to test react pure components
 *
 * Importing { expect } from this file let you use
 * the chai expect function with all the enzyme helpers
 *
 * Also it setup a virtual dom so the document object become present
 */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';

require('jsdom-global')();

chai.use(chaiEnzyme());
configure({ adapter: new Adapter() });
const { expect } = chai;
export { expect, chai };
