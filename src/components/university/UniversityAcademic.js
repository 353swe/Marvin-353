import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FieldTypes from '../custom/fieldtypes';
import Utils from '../custom/utils';
import Form from '../custom/Form';
import { creators as universitySagaAction } from '../../sagas/ManageYearsSaga';
import PageTableForm from '../template/PageTableForm';
import ModalForm from '../custom/ModalForm';
import Message from '../custom/Message';

export class UniversityAcademic extends React.Component {
  constructor(props) {
    super(props);
    this.viewDelete = this.viewDelete.bind(this);
    this.notDelete = this.notDelete.bind(this);
    this.closeDelete = this.closeDelete.bind(this);
    this.validateYear = this.validateYear.bind(this);
    this.closeErrorMessage = this.closeErrorMessage.bind(this);
    this.state = {
      delete: false,
      viewErrorMessage: false,
    };
  }

  viewDelete(item) {
    this.setState({ delete: true, item });
  }

  notDelete() {
    this.setState({ delete: false, item: '' });
  }

  closeDelete(objArr) {
    this.setState({ delete: false, item: '' });
    this.props.deleteYears(objArr.item.year);
  }

  closeErrorMessage() {
    this.setState({ viewErrorMessage: false });
  }

  validateYear(item) {
    const newYear = parseInt(item.year.value, 10);
    const exist = this.props.academicYears.filter(year => year === newYear);
    if (exist.length === 0) {
      this.props.addYear(item.year.value);
    } else {
      this.setState({ viewErrorMessage: true });
    }
  }
  render() {
    return (
      <div>
        <Form
          description="Do you want to add a new academic year?"
          fields={[{
            name: 'year',
            label: 'Year:',
            help: 'insert the new university year',
            placeholder: '20xx',
            type: FieldTypes.TEXT,
            validateFunction: Utils.moreThanCurrentYear,
          }]}
          submitFunction={this.validateYear}
        />

        <PageTableForm
          getTableData={this.props.getYears}
          tableData={this.props.academicYears}
          headerInfo={['Year', 'Delete']}
          tableButtons={[{
            buttonFunction: this.viewDelete,
            buttonText: 'Delete',
            buttonType: 'danger',
          }]}
        />
        <ModalForm
          title="Delete confirmation"
          yesFunction={this.closeDelete}
          noFunction={this.notDelete}
          keyForModal={{ item: { year: this.state.item } }}
          show={this.state.delete}
        >
          <p>
            Are you sure you want to delete this academic year?
          </p>
        </ModalForm>
        <Message
          message="Academic year not added. It already exists."
          type="error"
          show={this.state.viewErrorMessage}
          onHide={this.closeErrorMessage}
        />
      </div>
    );
  }
}


UniversityAcademic.propTypes = {
  addYear: PropTypes.func.isRequired,
  getYears: PropTypes.func.isRequired,
  deleteYears: PropTypes.func.isRequired,
  academicYears: PropTypes.arrayOf(String).isRequired,
};

const mapStateToProps = state => ({
  academicYears: state.manageYears.accademicYears,
});

function mapDispatchToProps(dispatch) {
  return {
    addYear: year => (
      dispatch(universitySagaAction.addYear(year))
    ),
    getYears: () => dispatch(universitySagaAction.getAllYears()),
    deleteYears: year => dispatch(universitySagaAction.removeEmptyYear(year)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UniversityAcademic);
