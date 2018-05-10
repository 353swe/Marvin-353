import React from 'react';
import PropTypes from 'prop-types';

class LoadingSpinner extends React.Component {
  render() {
    if (this.props.isLoading) {
      return (
        <div className="loadingSpinner">
          <div className="spinner" />
        </div>
      );
    }
    return this.props.children;
  }
}

LoadingSpinner.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default LoadingSpinner;
