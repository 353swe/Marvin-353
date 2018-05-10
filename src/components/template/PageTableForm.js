import React from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/lib/Table';
import TemplateButton from '../custom/TemplateButton';
import Utils from '../custom/utils';


class PageTableForm extends React.Component {
  static checkBooleanValue(item) {
    if (item === true || item === false) {
      return item ? 'Yes' : 'No';
    }
    return item;
  }

  static getButton(key, item) {
    return (
      <td key={Utils.generateKey(key)}>
        <TemplateButton
          clickFunction={key.buttonFunction}
          objectToWorkOn={item}
          text={key.buttonText}
          type={key.buttonType}
        />
      </td>
    );
  }

  constructor(props) {
    super(props);
    this.refreshData = this.refreshData.bind(this);
    this.getRows = this.getRows.bind(this);
    this.getRow = this.getRow.bind(this);
  }

  componentWillMount() {
    this.refreshData();
  }

  getRow(item, nonce) {
    const headers = this.props.headerInfo.map(header => header.toLowerCase());
    if (item instanceof Object) {
      if (this.props.columFilter) {
        return Object.keys(item).filter(key => headers.includes(key.toLowerCase())).map((key, i) =>
          (
            <td key={Utils.generateKey(item[key]).concat(i).concat(nonce)}>
              {PageTableForm.checkBooleanValue(item[key])}
            </td>
          ));
      }
      return Object.keys(item).map((key, i) => (
        <td key={Utils.generateKey(item[key]).concat(i).concat(nonce)} >
          {PageTableForm.checkBooleanValue(item[key])}
        </td>
      ));
    }
    return (
      <td key={Utils.generateKey(item).concat(nonce)} >{PageTableForm.checkBooleanValue(item)}</td>
    );
  }

  getRows() {
    return this.props.tableData.map((item, nonce) =>
      (
        <tr key={Utils.generateKey(item)}>
          {this.getRow(item, nonce)}
          {this.props.tableButtons.map(key => (
            PageTableForm.getButton(key, item)
          ))}
        </tr>
      ));
  }

  refreshData() {
    this.props.getTableData(); // ask redux the table data array
  }

  render() {
    const tableHead = this.props.headerInfo.map(item =>
      <th key={Utils.generateKey(item)}>{item}</th>);
    return (
      <div>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              {tableHead}
            </tr>
          </thead>
          <tbody>
            {this.getRows()}
          </tbody>
        </Table>
        {this.props.tableData.length === 0 &&
        <div> <h5 className="text-center">There is no data to display!</h5> </div>}
      </div>
    );
  }
}

PageTableForm.propTypes = {
  getTableData: PropTypes.func.isRequired,
  tableData: PropTypes.arrayOf(Object).isRequired,
  headerInfo: PropTypes.arrayOf(String).isRequired,
  // Temporaneamente not required, ma da aggiornare in isRequired piu avanti
  tableButtons: PropTypes.arrayOf(Object),
  columFilter: PropTypes.bool,
};

PageTableForm.defaultProps = {
  columFilter: false,
  tableButtons: [],
};

export default PageTableForm;
