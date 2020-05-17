import React, { Component } from 'react'
import {Modal,Button} from 'react-bootstrap'

export default class ShowModal extends Component {
    render() {
        return (
            <Modal
            show={this.props.show}
            onHide={this.props.onHide}
            data={this.props.data}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {this.props.data.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='showModalSize'>
                    {this.props.data.body}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='dark' onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
        )
    }
}
