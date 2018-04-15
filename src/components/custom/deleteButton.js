import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';


class deleteButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.deleteFunction(this.props.objectToRemove);
  }

  render() {
    return (
      <Button bsStyle="danger" onClick={this.handleClick}>Delete</Button>
    );
  }
}

deleteButton.propTypes = {
  deleteFunction: PropTypes.func.isRequired,
  objectToRemove: PropTypes.string.isRequired,
};

export default deleteButton;
