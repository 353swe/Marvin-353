import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PageTableForm from '../template/PageTableForm';
import { creators as studentExamSaga } from '../../sagas/StudentSaga';

export class StudentExam extends React.Component {
  constructor(props) {
    super(props);
    this.getExams = this.getExams.bind(this);
  }
  getExams() {
    this.props.getExams(this.props.myAddress);
  }
  render() {
    console.log('StudentExam is using address ', this.props.myAddress);

    return (
      <div>
        <PageTableForm
          getTableData={this.getExams}
          tableData={(this.props.ExamsList).filter(e => (e.subscription))}
          headerInfo={['Name', 'Credits', 'Mandatory', 'TeacherName', 'TeacherSurname', 'Valuation']}
          columFilter
        />
      </div>
    );
  }
}

StudentExam.propTypes = {
  getExams: PropTypes.func,
  ExamsList: PropTypes.arrayOf(Object),
  myAddress: PropTypes.string.isRequired,
};

StudentExam.defaultProps = {
  getExams: () => {},
  ExamsList: [],
};

const mapStateToProps = state => ({
  ExamsList: state.student.examsList,
  myAddress: state.user.data.contract,
});

function mapDispatchToProps(dispatch) {
  return {
    getExams: add =>
      dispatch(studentExamSaga.getExamsAction(add)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentExam);

