import React from 'react';
import PropTypes from 'prop-types';
// import { history } from '../../store';

class RedirectToHome extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      // history.push('/');
      document.location.href = `/?type=${this.props.type}&message=${this.props.message}`;
    }, 1000);
  }
  render() {
    return null;
  }
}

RedirectToHome.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default RedirectToHome;
