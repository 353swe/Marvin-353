import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import ModalForm from '../custom/ModalForm';
import Utils from '../custom/utils';
import { creators as examSagaAction } from '../../sagas/ManageExamsSaga';

export class ExamDetails extends React.Component {
  constructor(props) {
    super(props);
    this.showAssignTeacher = this.showAssignTeacher.bind(this);
    this.teacher = this.teacher.bind(this);
    this.notDelete = this.notDelete.bind(this);
    this.onChangeTeacher = this.onChangeTeacher.bind(this);
    this.assTeacher = this.assTeacher.bind(this);
    this.props.getTeachers();
    this.show = this.props.show;
    this.state = {
      assignTeacher: false,
      teacherAddress: null,
    };
    this.object = this.props.object;
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.object !== nextProps.object) {
      this.object = nextProps.object;
    }
    if (nextProps.teacherList !== this.props.teacherList && nextProps.teacherList.length > 0) {
      this.setState({ teacherAddress: nextProps.teacherList[0].address });
    }
  }
  onChangeTeacher() {
    if (this.state.teacherAddress !== this.inputEl.value) {
      this.setState({ teacherAddress: this.inputEl.value });
    }
  }
  teacher() {
    if (this.object.teacherName !== '' && this.object.teacherSurname !== '') {
      return (
        <dd>
          {this.object.teacherSurname} {this.object.teacherName} {this.object.teacherAddress}
        </dd>
      );
    }
    return (
      <dd>
        <Button onClick={this.showAssignTeacher}>Assign teacher</Button>
      </dd>
    );
  }
  showAssignTeacher() {
    this.setState({ assignTeacher: true });
  }
  notDelete() {
    this.setState({ assignTeacher: false });
  }
  assTeacher() {
    this.setState({ assignTeacher: false });
    this.props.setTeacher(this.props.object.address, this.state.teacherAddress);
  }
  moreDetails() {
    if (this.props.moreDetails) {
      return (
        <div>
          <dt>Solar year</dt>
          <dd>{this.object.solarYear}</dd>
          <dt>Course Address</dt>
          <dd>{this.object.courseAddress}</dd>
          <dt>Course Name</dt>
          <dd>{this.object.courseName}</dd>
        </div>
      );
    }
    return null;
  }
  render() {
    const options = [];
    if (!this.props.loadingTeacher) {
      for (let i = 0; i < this.props.teacherList.length; i += 1) {
        const teacher = this.props.teacherList[i];
        options.push( // eslint-disable-line function-paren-newline
          <option key={Utils.generateKey(teacher.address)} value={teacher.address}>
            {teacher.surname} {teacher.name} {teacher.address}
          </option>);
      }
    }
    const mandatory = (this.object.mandatory) ? 'Yes' : 'No';
    return (
      <div>
        <ModalForm
          title="Exam details"
          keyForModal={{ item: this.object }}
          show={this.show}
        >
          <dl>
            <dt>Exam Address</dt>
            <dd>{this.object.address}</dd>
            <dt>Exam Name</dt>
            <dd>{this.object.name}</dd>
            <dt>Credits</dt>
            <dd>{this.object.credits}</dd>
            <dt>Mandatory</dt>
            <dd>{mandatory}</dd>
            <dt>Teacher</dt>
            {this.teacher()}
            {this.moreDetails()}
          </dl>
        </ModalForm>
        <ModalForm
          title="Assign teacher"
          show={this.state.assignTeacher}
          yesFunction={this.assTeacher}
          noFunction={this.notDelete}
        >
          <FormGroup controlId="selectTeacher">
            <ControlLabel>Assign a teacher to the exam</ControlLabel>
            <FormControl
              onChange={this.onChangeTeacher}
              inputRef={el => this.inputEl = el} // eslint-disable-line no-return-assign
              componentClass="select"
              placeholder="select"
            >
              {options}
            </FormControl>
          </FormGroup>
        </ModalForm>
      </div>
    );
  }
}

ExamDetails.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  object: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  getTeachers: PropTypes.func.isRequired,
  teacherList: PropTypes.arrayOf(Object),
  loadingTeacher: PropTypes.bool,
  setTeacher: PropTypes.func.isRequired,
  moreDetails: PropTypes.bool,
};

ExamDetails.defaultProps = {
  teacherList: [],
  moreDetails: false,
  loadingTeacher: false,
};

const mapStateToProps = state => ({
  teacherList: state.teachersList.list,
  loadingTeacher: state.teachersList.loading,
});

function mapDispatchToProps(dispatch) {
  return {
    getTeachers: () => dispatch(examSagaAction.getTeachers()),
    setTeacher: (exam, teacher) => (
      dispatch(examSagaAction.associateProfessorToExamAction(
        exam,
        teacher,
      ))
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExamDetails);
