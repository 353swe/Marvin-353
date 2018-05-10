import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';


class TemplateButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.clickFunction(this.props.objectToWorkOn);
  }

  render() {
    return (
      <div>
        <Button
          bsStyle={this.props.type}
          onClick={this.handleClick}
        >{this.props.text}
        </Button>
      </div>
    );
  }
}

TemplateButton.propTypes = {
  clickFunction: PropTypes.func.isRequired,
  objectToWorkOn: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]).isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default TemplateButton;
