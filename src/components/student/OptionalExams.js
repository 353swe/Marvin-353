import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PageTableForm from '../template/PageTableForm';
import { creators as studentExamSaga } from '../../sagas/StudentSaga';
import ModalForm from '../custom/ModalForm';

export class OptionalExams extends React.Component {
  constructor(props) {
    super(props);
    this.getExams = this.getExams.bind(this);
    this.closeSelect = this.closeSelect.bind(this);
    this.viewSelect = this.viewSelect.bind(this);
    this.state = { select: false };
  }
  getExams() {
    this.props.getExams(this.props.myAddress);
  }
  viewSelect(item) {
    this.setState({ select: true, item });
  }

  closeSelect(item) {
    this.setState({ select: false });
    this.props.enrollToExam(this.props.myAddress, item);
  }
  render() {
    console.log(this.props.ExamsList);
    return (
      <div>
        <PageTableForm
          getTableData={this.getExams}
          tableData={(this.props.ExamsList).filter(line => (!line.mandatory && !line.subscription))}
          headerInfo={['Name', 'Credits', 'Mandatory', 'TeacherName', 'TeacherSurname', 'Select optional exam']}
          columFilter
          tableButtons={[
            {
              buttonFunction: this.viewSelect,
              buttonText: 'Select ',
              buttonType: 'primary',
            },
            ]}
        />
        <ModalForm
          title="Exam confirmation"
          yesFunction={this.closeSelect}
          keyForModal={{ item: this.state.item }}
          show={this.state.select}
        >
          <p>
            Are you sure you want to select this optional exam?
          </p>
        </ModalForm>
      </div>
    );
  }
}

OptionalExams.propTypes = {
  getExams: PropTypes.func,
  ExamsList: PropTypes.arrayOf(Object),
  myAddress: PropTypes.string.isRequired,
  enrollToExam: PropTypes.func.isRequired,
};

OptionalExams.defaultProps = {
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
    enrollToExam: (student, exam) => {
      dispatch(studentExamSaga.enrollToExamAction(student, exam.item.address));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OptionalExams);

