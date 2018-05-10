import React from 'react';
import { mount, shallow } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import assert from 'assert';
import { expect } from 'chai'; // eslint-disable-line import/no-extraneous-dependencies
import PageTableForm from '../../../src/components/template/PageTableForm';

describe('PageTableForm component test', () => {
  // 171
  it('Should render the component', () => {
    const wrapper = shallow(<PageTableForm getTableData={e => e} deleteTableData={e => e} editTableData={e => e} addTableData={e => e} tableData={['0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf']} headerInfo={['Admin Address']} />);
    assert.equal(wrapper.length, 1);
  });
  // 172
  it('should save correct props and correct value', () => {
    const wrapper = mount(<PageTableForm getTableData={e => e} tableData={['0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf']} headerInfo={['Admin Address']} />);
    expect(wrapper.props().tableData).to.deep.include('0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf');
    expect(wrapper.props().headerInfo).to.deep.include('Admin Address');
    expect(wrapper.props().getTableData(2)).to.equal(2);
    expect(wrapper.props().tableData.length).to.equal(1);
    expect(wrapper.props().headerInfo.length).to.equal(1);
  });
  // 173
  it('Should call refreshData()', () => {
    const wrapper = mount(<PageTableForm columFilter getTableData={e => e} tableData={['0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf', true]} headerInfo={['Admin Address']} />);
    wrapper.instance().refreshData();
  });
  // 174
  it('Should call getRows()', () => {
    const wrapper = mount(<PageTableForm getTableData={e => e} tableData={['0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf', false]} headerInfo={['Admin Address']} />);
    wrapper.instance().getRows();
  });
  // 175
  it('Should call componentWillMount()', () => {
    const wrapper = mount(<PageTableForm
      getTableData={e => e}
      tableData={[{ admin: '0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf', value: true }]}
      headerInfo={['admin', 'Details']}
      columFilter
      tableButtons={[{
        buttonFunction: null,
        buttonText: 'Details',
        buttonType: 'primary',
      }]}
    />);
    wrapper.instance().componentWillMount();
  });
  // 176
  it('Should call getRow(item, nonce)', () => {
    const wrapper = mount(<PageTableForm getTableData={e => e} tableData={['0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf']} headerInfo={['Admin Address']} />);
    wrapper.instance().getRow({ name: 'nome' }, 1);
  });
});
