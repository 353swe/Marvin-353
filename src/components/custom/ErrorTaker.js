import React from 'react';
import PropTypes from 'prop-types';

class ErrorTaker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState(state => ({ ...state, hasError: true }));
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h3>Sorry, something went wrong somewhere</h3>
          <p>We are working to solve this issue.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

ErrorTaker.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorTaker;

