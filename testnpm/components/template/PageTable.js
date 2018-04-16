import React from 'react';
import { mount, shallow } from 'enzyme';
import assert from 'assert';
import { expect } from 'chai';
import PageTableForm from '../../../src/components/template/PageTableForm';
import DeleteButton from '../../../src/components/custom/deleteButton';

describe('PageTableForm component test', () => {
  it('Should render the component', () => {
    const wrapper = shallow(<PageTableForm getTableData={e => e} deleteTableData={e => e} editTableData={e => e} addTableData={e => e} tableData={['0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf']} headerInfo={['Admin Address']} />);
    assert.equal(wrapper.length, 1);
  });

  it('should save correct props and correct value', () => {
    const wrapper = mount(<PageTableForm getTableData={e => e} deleteTableData={e => e} editTableData={e => e} addTableData={e => e} tableData={['0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf']} headerInfo={['Admin Address']} />);
    expect(wrapper.props().tableData).to.deep.include('0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf');
    expect(wrapper.props().headerInfo).to.deep.include('Admin Address');
    expect(wrapper.props().getTableData(2)).to.equal(2);
    expect(wrapper.props().deleteTableData(2)).to.equal(2);
    expect(wrapper.props().editTableData(2)).to.equal(2);
    expect(wrapper.props().addTableData(2)).to.equal(2);
    expect(wrapper.props().tableData.length).to.equal(1);
    expect(wrapper.props().headerInfo.length).to.equal(1);
  });

  it('Should render the DeleteButton', () => {
    const wrapper = shallow(<PageTableForm getTableData={e => e} deleteTableData={e => e} editTableData={e => e} addTableData={e => e} tableData={['0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf']} headerInfo={['Admin Address']} />);
    expect(wrapper.find(DeleteButton)).to.have.length(1);
  });
});
