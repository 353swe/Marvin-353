import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';


class ModalForm extends React.Component {
  constructor(props) {
    super(props);
    this.handle = this.handle.bind(this);
    this.close = this.close.bind(this);
    this.state = { showing: this.props.show };
  }

  componentWillReceiveProps(newProps) {
    this.setState({ showing: newProps.show });
  }

  handle() {
    this.setState({
      showing: false,
    });
    this.props.yesFunction(this.props.keyForModal);
  }

  close() {
    this.setState({
      showing: false,
    });
  }

  render() {
    return (
      <div>
        <Modal show={this.state.showing}>
          <Modal.Header>
            <b>{this.props.title}</b>
          </Modal.Header>
          <Modal.Body>
            {this.props.children}
          </Modal.Body>
          <Modal.Footer>
            {this.props.yesFunction !== undefined &&
              <Button bsStyle="primary" onClick={this.handle}>Yes</Button>}

            {this.props.noFunction !== undefined &&
              <Button onClick={this.props.noFunction}>Close</Button>}

            {this.props.noFunction === undefined &&
              <Button onClick={this.close}>Close</Button>}
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

ModalForm.propTypes = {
  title: PropTypes.string.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node,
  yesFunction: PropTypes.func,
  noFunction: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  keyForModal: PropTypes.object,

};

ModalForm.defaultProps = {
  show: false,
  children: null,
  yesFunction: undefined,
  noFunction: undefined,
  keyForModal: {},
};

export default ModalForm;
