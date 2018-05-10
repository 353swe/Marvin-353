import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { creators as universitySagaAction } from '../../sagas/ManageYearsSaga';
import { creators as examSagaAction } from '../../sagas/ManageExamsSaga';

import ExamDetails from './ExamDetails'; // eslint-disable-line import/no-named-as-default
import PageTableForm from '../template/PageTableForm';
import Utils from '../custom/utils';

export class AdminExams extends React.Component {
  constructor(props) {
    super(props);
    this.props.getYears();
    this.state = {
      showDetails: false,
    };
    this.onChangeYear = this.onChangeYear.bind(this);
    this.viewDetails = this.viewDetails.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.academicYears !== this.props.academicYears) {
      this.setState({
        year: nextProps.academicYears[0],
      });
      this.props.getAllExams(nextProps.academicYears[0]);
    }
  }

  /**
   * when the year in the spinner is changed,
   * set the new value in the state year
   */
  onChangeYear() {
    if (this.state.year !== this.inputEl.value) {
      this.setState({ year: this.inputEl.value, showDetails: false });
      this.props.getAllExams(this.inputEl.value);
    }
  }

  /**
   * show the details of the selectd exam
   * @param item - selected item in the table
   */
  viewDetails(item) {
    this.setState({ showDetails: true, item });
  }
  render() {
    const options = [];
    if (!this.props.yearLoading) {
      for (let i = 0; i < this.props.academicYears.length; i += 1) {
        options.push(<option key={Utils.generateKey(this.props.academicYears[i])} value={this.props.academicYears[i]}>{this.props.academicYears[i]}</option>); // eslint-disable-line max-len
      }
    }
    let table = null;
    if (!this.props.listLoading) {
      table = (<PageTableForm
        getTableData={e => e}
        tableData={this.props.examList}
        headerInfo={['Name', 'SolarYear', 'CourseName', 'Credits', 'Enrolled', 'ProfessorSurname', 'ProfessorName', 'Details']}
        tableButtons={[{
          buttonFunction: this.viewDetails,
          buttonText: 'Details',
          buttonType: 'primary',
        }]}
        columFilter
      />);
    }
    let details = null;
    if (this.state.showDetails) {
      details = <ExamDetails object={this.state.item} show={this.state.showDetails} moreDetails />;
    }
    return (
      <div>
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
        {table}
        {details}
      </div>
    );
  }
}
AdminExams.propTypes = {
  examList: PropTypes.arrayOf(Object).isRequired,
  getYears: PropTypes.func.isRequired,
  getAllExams: PropTypes.func.isRequired,
  academicYears: PropTypes.arrayOf(String).isRequired,
  yearLoading: PropTypes.bool.isRequired,
  listLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  academicYears: state.manageYears.accademicYears,
  examList: state.exams.list,
  yearLoading: state.manageYears.loading,
  listLoading: state.exams.loading,
});

function mapDispatchToProps(dispatch) {
  return {
    getYears: () => dispatch(universitySagaAction.getAllYears()),
    getAllExams: year => dispatch(examSagaAction.getAllExamsAction(year)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminExams);
