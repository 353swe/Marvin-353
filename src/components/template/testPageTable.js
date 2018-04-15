import React from 'react';
import PageTableForm from './PageTableForm';

export default class testPageTable extends React.Component {
  static getTableData() {
    return 1;
  }

  static deleteTableData() {
    return 1;
  }

  render() {
    return (
      <div>
        <PageTableForm
          getTableData={testPageTable.getTableData}
          deleteTableData={testPageTable.deleteTableData}
          tableData={['0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
          '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
          '0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69',
        ]}
          headerInfo={['Admin Address']}
        />
      </div>
    );
  }
}
