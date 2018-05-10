import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { creators } from '../../sagas/SessionSaga';
import CardWithIcon from '../custom/CardWithIcon';
import AlertDismissable from '../custom/AlertDismissable';

export class Index extends React.Component {
  constructor(props) {
    super(props);
    this.metamask = this.props.metamask;
    this.account = this.props.account;
  }
  render() {
    let errorMetamask;
    let errorLocked;

    if (!this.metamask) {
      errorMetamask = (
        <AlertDismissable type="danger" message="MetaMask not found! Install the extension for the browser." />
      );
    }

    if (this.props.account === '' || this.props.account === null) {
      errorLocked = (
        <AlertDismissable type="danger" message="MetaMask locked or no address! Please unlock it or create an account." />
      );
    }
    return (
      <div>
        {errorMetamask}
        {errorLocked}
        <h3 className="text-center">Welcome to Marvin!</h3>
        <img alt="" className="img-responsive imageIndexTop" src="/media/cards/publicIndex.png" />
        <CardWithIcon
          title="Login"
          text="Enter in the website using a confirmed account, for students, teachers and administrators"
          image="login.png"
          links={[{ path: 'login', label: 'Click here to login' }]}
        />
        <CardWithIcon
          title="Register"
          text="Request a new account, for both students and teachers"
          image="register.png"
          links={[{ path: 'request', label: 'Click here to request a new account' }]}
        />
      </div>
    );
  }
}

Index.propTypes = {
  // loginLoading: PropTypes.bool,
  // loginFailed: PropTypes.bool,
  metamask: PropTypes.bool,
  account: PropTypes.string,
  // performLogin: PropTypes.func,
};

Index.defaultProps = {
  // loginLoading: false,
  // loginFailed: false,
  metamask: false,
  account: null,
  // performLogin: () => {},
};

const mapStateToProps = state => ({
  loginLoading: state.user.loading,
  loginFailed: state.user.errored,
  metamask: state.metamask.present,
  account: state.metamask.account,
});

function mapDispatchToProps(dispatch) {
  return {
    performLogin: () => dispatch(creators.loginAction()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
