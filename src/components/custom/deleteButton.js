import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';


class deleteButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.deleteFunction(this.props.objectToRemove.item);
  }

  render() {
    return (
      <Button bsStyle="danger" onClick={this.handleClick}>Delete</Button>
    );
  }
}

deleteButton.propTypes = {
  deleteFunction: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  objectToRemove: PropTypes.object.isRequired,
};

export default deleteButton;
