import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RedirectToHome from './RedirectToHome';
import { creators } from '../../sagas/SessionSaga';

class LoginPage extends React.Component {
  componentDidMount() {
    this.props.performLogin();
  }

  render() {
    console.log(this.props.metamask, this.props.account, this.props.loginLoading);
    if (!this.props.metamask) {
      return (
        <div>
          Metamask not found! Please read the <a href="/help">guide</a> for more info!
        </div>
      );
    }
    if (this.props.account === '' || this.props.account === null) {
      return (
        <div>
          Metamask locked or without address! Please unlock it or create an account and then <a href="/login">reload</a> this page!
        </div>
      );
    }
    if (this.props.loginLoading) {
      return (
        <div>
          Logging...
        </div>
      );
    }
    if (this.props.loginFailed) {
      return (
        <div>
          Login failed! Please check your internet connection!
          <RedirectToHome time={5000} />
        </div>
      );
    }
    if (this.props.role === 0) {
      return (
        <div>
          No user found with this address!
          <RedirectToHome time={5000} />
        </div>
      );
    }
    if (this.props.role === 13 || this.props.role === 14) {
      return (
        <div>
          Your account is still not confirmed!
          <RedirectToHome time={5000} />
        </div>
      );
    }
    return (
      <div>
        Logged!
        <RedirectToHome time={2000} />
      </div>
    );
  }
}

LoginPage.propTypes = {
  loginLoading: PropTypes.bool,
  loginFailed: PropTypes.bool,
  metamask: PropTypes.bool,
  account: PropTypes.string,
  role: PropTypes.number,
  performLogin: PropTypes.func,
};

LoginPage.defaultProps = {
  loginLoading: false,
  loginFailed: false,
  metamask: false,
  account: null,
  role: 0,
  performLogin: () => {},
};


const mapStateToProps = state => ({
  loginLoading: state.user.loading,
  loginFailed: state.user.errored,
  metamask: state.metamask.present,
  account: state.metamask.account,
  role: state.user.role,
});

function mapDispatchToProps(dispatch) {
  return {
    performLogin: () => dispatch(creators.loginAction()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

