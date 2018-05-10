import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RedirectToHome from './RedirectToHome';
import { creators } from '../../sagas/SessionSaga';

export class LoginPage extends React.Component {
  componentDidMount() {
    this.props.performLogin();
  }

  render() {
    if (this.props.loginLoading) {
      return (
        <div>Logging...</div>
      );
    }
    if (this.props.loginFailed) {
      return (
        <RedirectToHome type="danger" message="Login failed! Please check your internet connection!" />
      );
    }
    if (this.props.role === 0) {
      return (
        <RedirectToHome type="danger" message="User not found with this address!" />
      );
    }
    if (this.props.role === 13 || this.props.role === 14) {
      return (
        <RedirectToHome type="warning" message="Your account is still not confirmed!" />
      );
    }
    if (this.props.role !== null) {
      return (
        <div>Logged in! You will be redirected to the homepage in a few seconds!<br />
        If it doesnt work click here: <a href="/">home</a>
          <RedirectToHome type="success" message="Logged in! 🎊" />
        </div>
      );
    }
    return <div>Loading web3</div>;
  }
}

LoginPage.propTypes = {
  loginLoading: PropTypes.bool,
  loginFailed: PropTypes.bool,
  role: PropTypes.number,
  performLogin: PropTypes.func,
};

LoginPage.defaultProps = {
  loginLoading: false,
  loginFailed: false,
  role: 0,
  performLogin: () => {},
};


const mapStateToProps = state => ({
  loginLoading: state.user.loading,
  loginFailed: state.user.errored,
  role: state.user.role,
});

function mapDispatchToProps(dispatch) {
  return {
    performLogin: () => dispatch(creators.loginAction()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
