import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Button from 'react-bootstrap/lib/Button';
import CardWithIcon from '../custom/CardWithIcon';

export const Index = props => (

  <div>
    <div>
      <Jumbotron>
        <h1>Welcome {props.userName} {props.userSurname}</h1>
        <p className="jumbotron-text">
You are logged in Marvin with a teacher account.
          Here you can manage all your exams and students valuations.
              To know how much each operation costs please visit the price page.
        </p>
        <p>
          <Button bsStyle="primary" href="price">Price page</Button>
        </p>
      </Jumbotron>
    </div>
    <CardWithIcon
      title="Exams list"
      text="Show all my exams"
      image="teacherExams.png"
      links={[{ path: '/exams', label: 'Click here to see your exams' }]}
    />
  </div>
);

Index.propTypes = {
  userName: PropTypes.string,
  userSurname: PropTypes.string,
};

Index.defaultProps = {
  userName: '',
  userSurname: '',
};
const mapStateToProps = state => ({
  userName: state.user.data.name,
  userSurname: state.user.data.surname,
});

export default connect(mapStateToProps)(Index);
