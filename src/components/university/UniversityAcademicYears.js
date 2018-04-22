import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FieldTypes from '../custom/fieldtypes';
import Utils from '../custom/utils';
import Form from '../custom/Form';
import { creators as universitySagaAction } from '../../sagas/ManageYearsSaga';
import PageTableForm from '../template/PageTableForm';

const UniversityAcademic = props => (
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
      submitFunction={props.addYear}
    />

    <PageTableForm
      getTableData={props.getYears}
      tableData={props.academicYears}
      headerInfo={['Year']}
      deleteTableData={props.deleteYears}
    />
  </div>
);

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
    addYear: objArr => (
      dispatch(universitySagaAction.addYear(objArr.year.value))
    ),
    getYears: () => dispatch(universitySagaAction.getAllYears()),
    deleteYears: year => dispatch(universitySagaAction.removeEmptyYear([year])),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UniversityAcademic);
