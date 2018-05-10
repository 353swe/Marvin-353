import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PageTableForm from '../template/PageTableForm';
import { creators as teacherExamSaga } from '../../sagas/TeacherExamSaga';


export class TeacherExams extends React.Component {
  /**
   * Redirect user to the selected exam
   * @param item the row/exam object with all the info about
   * the exam but just need the code or primary key of it
   */
  static seeExam(item) {
    document.location.href = `/exams/${item.address}/?code=${item.code}&index=${item.index}`;
  }

  constructor(props) {
    super(props);
    this.getMyAssignedExamsAddr = this.getMyAssignedExamsAddr.bind(this);
  }

  /**
   * load the exams of the currently logged in teacher looking
   * at this address in the props
   */
  getMyAssignedExamsAddr() {
    this.props.getMyAssignedExams(this.props.myContract);
  }

  render() {
    return (
      <div>
        <PageTableForm
          getTableData={this.getMyAssignedExamsAddr}
          tableData={this.props.assignedExams}
          headerInfo={['Code', 'CourseName', 'Details']}
          tableButtons={[
            {
              buttonFunction: TeacherExams.seeExam,
              buttonText: 'View students',
              buttonType: 'primary',
            },
          ]}
          columFilter
        />
      </div>
    );
  }
}

TeacherExams.propTypes = {
  getMyAssignedExams: PropTypes.func.isRequired,
  assignedExams: PropTypes.arrayOf(String).isRequired,
  myContract: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  assignedExams: state.teacherData.list,
  myContract: state.user.data.contract,
});

function mapDispatchToProps(dispatch) {
  return {
    getMyAssignedExams: addr => (
      dispatch(teacherExamSaga.getList(addr))
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherExams);

