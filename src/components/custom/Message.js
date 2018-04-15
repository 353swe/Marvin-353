import React from 'react';
import PropType from 'prop-types';
import { Button, Modal } from 'react-bootstrap';

class MessageBox extends React.Component {
  constructor(props) {
    super(props);
    this.message = this.props.message;
    this.onHide = this.props.onHide;
  }
  render() {
    let title = null;
    let icon = null;
    switch (this.props.type) {
      case 'success':
        title = 'Success';
        icon = 'glyphicon glyphicon-ok';
        break;
      case 'error':
        title = 'Error';
        icon = 'glyphicon glyphicon-remove';
        break;
      default:
        title = 'Info';
        icon = 'glyphicon glyphicon-info-sign';
    }
    return (
      <div className="modal-container" style={{ height: 200 }}>
        <Modal
          {...this.props}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">
              <span className={icon} />
              {title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.message}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

MessageBox.propTypes = {
  message: PropType.string.isRequired,
  type: PropType.string.isRequired,
  onHide: PropType.func.isRequired,
};

export default (MessageBox);

