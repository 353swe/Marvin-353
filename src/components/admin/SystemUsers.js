import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PageTableForm from '../template/PageTableForm';
import { creators } from '../../sagas/AdminSaga';
import ROLES from '../../util/logic/AccountEnum';
import ModalForm from '../custom/ModalForm';

export class SystemUsers extends React.Component {
  constructor(props) {
    super(props);
    this.viewDeleteTeacher = this.viewDeleteTeacher.bind(this);
    this.closeDeleteTeacher = this.closeDeleteTeacher.bind(this);
    this.viewDeleteStudent = this.viewDeleteStudent.bind(this);
    this.closeDeleteStudent = this.closeDeleteStudent.bind(this);
    this.state = { deleteTeacher: false, deleteStudent: false };
  }

  viewDeleteTeacher(item) {
    this.setState({ deleteTeacher: true, item });
  }
  closeDeleteTeacher(item) {
    this.setState({ deleteTeacher: false });
    this.props.deleteTeacher(item.item);
  }
  viewDeleteStudent(item) {
    this.setState({ deleteStudent: true, item });
  }
  closeDeleteStudent(item) {
    this.setState({ deleteStudent: false });
    this.props.deleteStudent(item.item);
  }
  render() {
    return (
      <div>
        <h4>List of all students:</h4>
        <PageTableForm
          getTableData={this.props.getStudents}
          tableData={this.props.studentAccounts}
          tableButtons={[
            {
              buttonFunction: this.viewDeleteStudent,
              buttonText: 'Delete',
              buttonType: 'danger',
            },
          ]}
          headerInfo={['Address', 'Name', 'Surname', 'Course', 'Delete']}
          columFilter
        />
        <h4>List of all teachers:</h4>
        <PageTableForm
          getTableData={this.props.getTeachers}
          tableData={this.props.teacherAccounts}
          tableButtons={[
            {
              buttonFunction: this.viewDeleteTeacher,
              buttonText: 'Delete',
              buttonType: 'danger',
            },
          ]}
          headerInfo={['Address', 'Name', 'Surname', 'Remove']}
          columFilter
        />
        <ModalForm
          title="Delete teacher confirmation"
          yesFunction={this.closeDeleteTeacher}
          keyForModal={{ item: this.state.item }}
          show={this.state.deleteTeacher}
        >
          <p>
            Are you sure you want to delete this teacher from system?
          </p>
        </ModalForm>
        <ModalForm
          title="Delete student confirmation"
          yesFunction={this.closeDeleteStudent}
          keyForModal={{ item: this.state.item }}
          show={this.state.deleteStudent}
        >
          <p>
            Are you sure you want to delete this student from system?
          </p>
        </ModalForm>

      </div>
    );
  }
}


SystemUsers.propTypes = {
  getTeachers: PropTypes.func.isRequired,
  getStudents: PropTypes.func.isRequired,
  deleteTeacher: PropTypes.func.isRequired,
  deleteStudent: PropTypes.func.isRequired,
  teacherAccounts: PropTypes.arrayOf(Object).isRequired,
  studentAccounts: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = state => ({
  teacherAccounts: state.accounts.teachersList,
  studentAccounts: state.accounts.studentsList,
});

function mapDispatchToProps(dispatch) {
  return {
    getTeachers: () => dispatch(creators.getAllStudentsAction()),
    getStudents: () => dispatch(creators.getAllTEachersAction()),
    // Metodi sotto sono da sistemare nella parte di Redux
    deleteTeacher: add => dispatch(creators.removeUserAction(ROLES.TEACHER, add.contract)),
    deleteStudent: add => dispatch(creators.removeUserAction(ROLES.STUDENT, add.contract)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SystemUsers);

