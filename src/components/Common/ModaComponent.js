import { Modal } from 'react-bootstrap';
import React from 'react';
import { Col, Row } from 'react-bootstrap';

export const ModalComponent = (props) => {
    return(
        <Modal {...props} size={props?.size?props?.size:'md'} aria-labelledby="contained-modal-title-vcenter" centered>
            <div className='mt-3'>
                <Row>
                    <Col md={2}/>
                    <Col md={8} className='alignCenter'> 
                        <h5>{props.header || ""}</h5>
                    </Col>
                    <Col md={2} >
                    <span onClick={props.onHide} className="crosssign pointer">
                        <div className="crosssign_circle"></div>
                        <div className="crosssign_stem"></div>
                        <div className="crosssign_stem2"></div>
                    </span>
                       
                    </Col>
                </Row>
            </div>
            <Modal.Body>
                <div>
                    {props.body || ""}
                </div>
            </Modal.Body>

        </Modal>
    )
}