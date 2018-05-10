import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProgressBar from 'react-bootstrap/lib/ProgressBar';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import CardWithIcon from '../custom/CardWithIcon';
import { creators } from '../../sagas/StudentSaga';

export class Index extends React.Component {
  componentWillMount() {
    this.props.getCredits(this.props.myAddress);
  }
  render() {
    return (
      <div>
        <Jumbotron>
          <h1>Welcome {this.props.userName} {this.props.userSurname}</h1>
          <p>
You are logged in Marvin with a student account. Here you can enrol to your exams,
check how many credits you need to end and you can choose and add optional exams to your study plan.
          </p>
          <h5>Your total credits: {this.props.myCredits}</h5>
          <h5>Total credits need to end: {this.props.graduationCredits}</h5>
          <ProgressBar
            active
            bsStyle="success"
            now={(this.props.myCredits / this.props.graduationCredits) * 100}
          />
          <h5>With your exams, you can make up to: {this.props.possibleCredits} more credits</h5>
        </Jumbotron>
        <CardWithIcon
          title="Exams list"
          text="Show all my exams list"
          image="examsList.png"
          links={[{ path: '/exams', label: 'Click here to see your exams' }]}
        />
        <CardWithIcon
          title="Optional exams"
          text="Show all optional exams for my course"
          image="examsList.png"
          links={[{ path: '/optionalexams', label: 'Click here to see optional exams' }]}
        />
      </div>
    );
  }
}
Index.propTypes = {
  myCredits: PropTypes.number,
  possibleCredits: PropTypes.number,
  graduationCredits: PropTypes.number,
  getCredits: PropTypes.func,
  myAddress: PropTypes.string.isRequired,
  userName: PropTypes.string,
  userSurname: PropTypes.string,
};

Index.defaultProps = {
  getCredits: () => {},
  myCredits: 0,
  possibleCredits: 0,
  graduationCredits: 0,
  userName: '',
  userSurname: '',
};

const mapStateToProps = state => ({
  myCredits: state.student.credits,
  possibleCredits: state.student.possibleCredits,
  graduationCredits: state.student.graduationCredits,
  myAddress: state.user.data.contract,
  userName: state.user.data.name,
  userSurname: state.user.data.surname,
});

function mapDispatchToProps(dispatch) {
  return {
    getCredits: add =>
      dispatch(creators.getCreditsAction(add)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
