import React, { Component } from 'react';
import './style.css'; 
import { Modal, Button } from 'react-bootstrap';
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 
class alert extends Component {
    render() { 
        return (
            <div>
                  <Modal
                    show={true}
                    backdrop="static"
                    keyboard={false}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    animation={false}
                >
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title className="resetpwd">{this.props.alertmsg}  <FontAwesomeIcon icon={faCheckCircle}/>
                        {this.props.alertBodyMsg !==''?
                        <p className="alertBodyMsg">{this.props.alertBodyMsg}</p>
                        :null}
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                         <Button variant="primary" onClick={this.props.handleAlertClick}>{this.props.btn}</Button>
                    </Modal.Footer>
                </Modal.Dialog>
                </Modal>
            </div>
        )
    }
}

export default alert;