import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { creators as examSagaAction } from '../../sagas/ManageExamsSaga';

import FieldTypes from '../custom/fieldtypes';
import Utils from '../custom/utils';
import Form from '../custom/Form';
import PageTableForm from '../template/PageTableForm';
import ExamDetails from './ExamDetails'; // eslint-disable-line import/no-named-as-default

export class AdminCourseExams extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showDetails: false };
    this.params = this.props.params;
    this.courseAdress = this.params.examid;
    this.courseName = this.props.location.query.name;
    this.courseYear = this.props.location.query.year;
    this.viewDetails = this.viewDetails.bind(this);
    this.addExamBuilder = this.addExamBuilder.bind(this);
    this.getExamsByAddress = this.getExamsByAddress.bind(this);
  }

  /**
   * get the exams of the course with the address found in the props params
   */
  getExamsByAddress() {
    this.props.getExams(this.courseAdress);
  }

  /**
   * build the correct params for add a new exam
   * @param objForm - value of the form field
   * of a new exam
  */
  addExamBuilder(objForm) {
    const optional = objForm.optionalExam.value === 'yes';
    const array = [
      this.courseAdress,
      objForm.examName.value,
      objForm.examCredits.value,
      optional,
    ];
    this.props.addExam(array);
  }
  /**
   * show the details of the selected exam
   * @param item - table item
   */
  viewDetails(item) {
    this.setState({ showDetails: true, item });
  }
  render() {
    let details = null;
    if (this.state.showDetails) {
      details = <ExamDetails object={this.state.item} show={this.state.showDetails} />;
    }
    return (
      <div>
        <h1>Course - {this.courseName} {this.courseYear}</h1>
        <Form
          description="Add a new exam"
          fields={[
            {
              name: 'examName',
              label: 'Name:',
              help: 'insert the name of the exam',
              placeholder: 'mathematics',
              type: FieldTypes.TEXT,
              validateFunction: Utils.validString,
            },
            {
              name: 'examCredits',
              label: 'Credits:',
              help: 'insert the number of credits',
              placeholder: '9',
              type: FieldTypes.TEXT,
              validateFunction: Utils.positiveNumber,
            },
            {
              name: 'optionalExam',
              label: 'Optional:',
              help: 'is the exam optional',
              type: FieldTypes.SELECT,
              values: ['yes', 'no'],
              validateFunction: Utils.notNullValue,
            },
          ]}
          submitFunction={this.addExamBuilder}
        />
        <PageTableForm
          getTableData={this.getExamsByAddress}
          tableData={this.props.examList}
          headerInfo={['Name', 'Credits', 'Mandatory', 'Enrolled', 'ProfessorName', 'ProfessorSurname', 'Details']}
          tableButtons={[{
            buttonFunction: this.viewDetails,
            buttonText: 'Details',
            buttonType: 'primary',
          }]}
          columFilter
        />
        {details}
      </div>
    );
  }
}

AdminCourseExams.propTypes = {
// eslint-disable-next-line react/forbid-prop-types
  params: PropTypes.object.isRequired,
  getExams: PropTypes.func,
  addExam: PropTypes.func.isRequired,
  examList: PropTypes.arrayOf(Object),
  location: PropTypes.object.isRequired, // eslint-disable-line
};

AdminCourseExams.defaultProps = {
  getExams: () => {},
  examList: [],
};

const mapStateToProps = state => ({
  academicYears: state.manageYears.accademicYears,
  examList: state.courseExams.list,
});

function mapDispatchToProps(dispatch) {
  return {
    addExam: objArray => (
      dispatch(examSagaAction.addNewExamAction(
        objArray[0],
        objArray[1],
        objArray[2],
        objArray[3],
      ))
    ),
    getExams: courseAddress => dispatch(examSagaAction.getExamsByCourseAction(courseAddress)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminCourseExams);
