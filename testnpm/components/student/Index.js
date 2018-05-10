import React from 'react';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import { shallow } from 'enzyme/build/index';
import assert from 'assert';
import { expect } from '../../helpers/chai-enzyme';
import { shallowWithStore, createMockStore } from '../../helpers/component-with-store';
import CardWithIcon from '../../../src/components/custom/CardWithIcon';
import ContainerIndex, { Index as SimpleIndex } from
  '../../../src/components/student/Index';
import { creators } from '../../../src/sagas/StudentSaga';

const defaultStore = {
  student: {
    credits: 80,
    graduationCredits: 180,
  },
  user: {
    data: {
      contract: '0xfa429bef26906146be2438c1892f8499e217b277',
      name: 'StudentName',
      surname: 'SudentSurname',
    },
  },
};
describe('Index Student', () => {
  // Testing simple component
  // 177
  it('Should render the index with right number of cards', () => {
    const wrapper = shallow(<SimpleIndex myAddress="myAddress" />);
    assert.equal(wrapper.length, 1);
    expect(wrapper.find(CardWithIcon)).to.have.length(2);
  });
  // 178
  it('Should render the correct bootstrap component', () => {
    const wrapper = shallow(<SimpleIndex myAddress="myAddress" />);
    assert.equal(wrapper.length, 1);
    expect(wrapper.find(Jumbotron)).to.have.length(1);
  });

  // Testing container part
  // 179
  it('Should connect right to the props', () => {
    const wrapper = shallowWithStore(<ContainerIndex />, defaultStore);
    expect(wrapper.props().myCredits).to.deep.equal(80);
    expect(wrapper.props().graduationCredits).to.deep.equal(180);
    expect(wrapper.props().myAddress).to.deep.equal('0xfa429bef26906146be2438c1892f8499e217b277');
    expect(wrapper.props().userName).to.deep.equal('StudentName');
    expect(wrapper.props().userSurname).to.deep.equal('SudentSurname');
  });
  // 180
  it('Should fire the correct actions', () => {
    const store = createMockStore(defaultStore);
    const wrapper = shallowWithStore(<ContainerIndex />, store);
    wrapper.props().getCredits();
    expect(store.isActionDispatched(creators.getCreditsAction())).to.be.true;
  });
});
