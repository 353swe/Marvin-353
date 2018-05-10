import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import { creators as universitySagaAction } from '../../sagas/ManageYearsSaga';
import { creators as courseSagaAction } from '../../sagas/CourseSaga';

import PageTableForm from '../template/PageTableForm';
import Form from '../custom/Form';
import Utils from '../custom/utils';
import FieldTypes from '../custom/fieldtypes';
import Message from '../custom/Message';

export class AdminCourses extends React.Component {
  constructor(props) {
    super(props);
    this.props.getYears();
    this.totalCredits = [
      '120',
      '180',
      '300',
      '360',
    ];
    this.state = {
      year: 'ALL',
      viewErrorMessage: false,
    };
    this.onChangeYear = this.onChangeYear.bind(this);
    this.tableData = this.tableData.bind(this);
    this.validateCourse = this.validateCourse.bind(this);
    this.closeErrorMessage = this.closeErrorMessage.bind(this);
  }

  /**
   * when the value in the year spinner changed
   * the state year change with the new value
   */
  onChangeYear() {
    if (this.state.year !== this.inputEl.value) {
      this.setState({ year: this.inputEl.value });
    }
  }

  /**
   * set the correct data in the table
   */
  tableData() {
    if (this.state.year === 'ALL') {
      return this.props.courseList;
    }
    const year = parseInt(this.state.year, 10);
    return this.props.courseList.filter(course => course.year === year);
  }

  /**
   * redirect to a new page with all the exams of the
   * selected course
   * @param item - table item selected
   */
  showExams(item) { // eslint-disable-line class-methods-use-this
    let path = document.location.pathname;
    path = path.concat(`/${item.address}/?name=${item.name}&year=${item.year}`);
    document.location.href = path;
  }
  validateCourse(item) {
    const credits = parseInt(item.courseTotalCredits.value, 10);
    const name = item.courseCode.value;
    const year = parseInt(item.courseYear.value, 10);
    const exist = this.props.courseList.filter(course => (
      course.credits === credits && course.name === name && course.year === year
    ));
    if (exist.length === 0) {
      this.props.addCourse(item);
    } else {
      this.setState({ viewErrorMessage: true });
    }
  }

  closeErrorMessage() {
    this.setState({ viewErrorMessage: false });
  }
  render() {
    const options = [];
    options.push(<option key={Utils.generateKey('ALL')} value="ALL">ALL</option>);
    const years = this.props.academicYears;
    for (let i = 0; i < years.length; i += 1) {
      // eslint-disable-next-line max-len
      options.push(<option key={Utils.generateKey(years[i])} value={years[i]}>{years[i]}</option>);
    }

    return (
      <div>
        <Form
          description="Add a new course"
          fields={[
            {
              name: 'courseCode',
              label: 'Code:',
              help: 'insert the code of the course',
              placeholder: 'A-36',
              type: FieldTypes.TEXT,
              validateFunction: Utils.validString,
            },
            {
              name: 'courseYear',
              label: 'Academic Year:',
              help: 'insert the associated year',
              type: FieldTypes.SELECT,
              values: this.props.academicYears,
              validateFunction: Utils.notNullValue,
            },
            {
              name: 'courseTotalCredits',
              label: 'Total credits:',
              help: 'insert the total credits',
              type: FieldTypes.SELECT,
              values: this.totalCredits,
              validateFunction: Utils.notNullValue,
            },
          ]}
          submitFunction={this.validateCourse}
        />
        <FormGroup controlId="selectYear">
          <ControlLabel>Filter by academic year</ControlLabel>
          <FormControl
            onChange={this.onChangeYear}
            inputRef={el => this.inputEl = el} // eslint-disable-line no-return-assign
            componentClass="select"
            placeholder="select"
          >
            {options}
          </FormControl>
        </FormGroup>
        <PageTableForm
          getTableData={this.props.getCourses}
          tableData={this.tableData()}
          headerInfo={['Name', 'Year', 'Credits', 'Details']}
          tableButtons={[{
            buttonFunction: this.showExams,
            buttonText: 'Details',
            buttonType: 'primary',
          }]}
          columFilter
        />
        <Message
          message="Course not added. The course already exists."
          type="error"
          show={this.state.viewErrorMessage}
          onHide={this.closeErrorMessage}
        />
      </div>
    );
  }
}

AdminCourses.propTypes = {
  addCourse: PropTypes.func.isRequired,
  getCourses: PropTypes.func.isRequired,
  courseList: PropTypes.arrayOf(Object).isRequired,
  getYears: PropTypes.func.isRequired,
  academicYears: PropTypes.arrayOf(String).isRequired,
};

const mapStateToProps = state => ({
  courseList: state.course.coursesList,
  academicYears: state.manageYears.accademicYears,
});

function mapDispatchToProps(dispatch) {
  return {
    addCourse: objForm => dispatch(courseSagaAction.addNewCourse(
      objForm.courseYear.value,
      objForm.courseCode.value,
      objForm.courseTotalCredits.value,
    )),
    getCourses: () => dispatch(courseSagaAction.getAllCourses()),
    getYears: () => dispatch(universitySagaAction.getAllYears()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminCourses);

