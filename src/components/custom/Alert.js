import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

class AlertDismissable extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleDismiss = this.handleDismiss.bind(this);
    this.message = props.message;
    this.type = props.type;
    // type = success (green) | warning (yellow) | danger (red) | info (blue)
    this.state = { show: true };
  }

  handleDismiss() {
    this.setState({ show: false });
  }

  render() {
    let title = null;
    switch (this.type) {
      case 'success':
        title = 'Success!';
        break;
      case 'warning':
        title = 'Warning!';
        break;
      case 'danger':
        title = 'Error!';
        break;
      case 'info':
        title = 'Info!';
        break;
      default:
        title = null;
        break;
    }

    if (this.state.show) {
      return (
        <Alert bsStyle={this.type} onDismiss={this.handleDismiss}>
          <h4>{title}</h4>
          <p>
            {this.message}
          </p>
        </Alert>
      );
    }
    return null;
  }
}

AlertDismissable.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default AlertDismissable;
