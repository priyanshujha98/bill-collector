import React, { useRef } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useReactToPrint } from 'react-to-print';

export const OutBillComponent = ({values}) => {

    const componentRef = useRef()
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        pageStyle: 
        `@page { 
            size: auto; margin: 0mm; 
          } 
          @media print { 
              body { 
                  -webkit-print-color-adjust: exact; 
                  padding: 0px !important; 
                  margin:0px !important;
                  margin-top:0 !important; 
                  font-size: 13px !important;
              } 
              .card-text {
                margin-top:0 !important; 
              }
          }`
    })

    return  (
        <Col md={2} className="marginAuto" style={{ marginLeft: "0" }}>
            <Card style={{ width: "23rem" }} className="loginImg">
                <Card.Body style={{ marginTop: "0px",marginLeft: "5px" }} ref={componentRef}>
                    <Card.Title style={{ fontSize: "15px" }}>
                        <b>SVVS Enterprise AC WAITING HALLS</b>
                    </Card.Title>
                    <Card.Subtitle style={{ fontSize: "15px" }} className="mt-1 alignCenterText">
                        OUT TOKEN
                    </Card.Subtitle>
                    <hr></hr>
                    <div className="card-text">
                        <Card.Title style={{ fontSize: "15px" }}>
                            <b>
                                Final Amount : ₹{values?.b_amount}
                            </b>
                        </Card.Title>
                        
                        <div>Tariff :  ₹{values?.b_amount}</div>
                        <div className="text-muted">
                            Customer Name : {values?.b_name}
                        </div>
                        <div className="text-muted">
                            PNR No : {values?.b_pnr}
                        </div>
                        <div className="text-muted">
                            <span style={{paddingRight:'25px'}}>
                                In Date :{" "}
                                {new Date(values?.createdAt).toLocaleDateString("en-GB").replaceAll("/", "-")}
                            </span>
                            <span>
                                In Time :{" "}
                                {new Date(values?.createdAt).toLocaleTimeString()}
                            </span>
                        </div>
                        <div className="text-muted">
                            <span style={{paddingRight:'25px'}}>
                                Out Date :{" "}
                                {new Date(values?.updatedAt).toLocaleDateString("en-GB").replaceAll("/", "-")}
                            </span>
                            <span>
                                Out Time :{" "}
                                {new Date(values?.updatedAt).toLocaleTimeString()}
                            </span>
                        </div>
                        <div className="text-muted">
                            Location : {values?.created_location?.l_name}
                        </div>
                        <div className="text-muted">
                            Total Duration : {values?.totalTime}
                        </div>
                        
                        <div>
                            <b>
                                GST NO : 36AIMPK6778R1Z1
                            </b>
                        </div>
                    </div>
                </Card.Body>
                <Card.Footer>
                    <Row>
                        <Col className='alignCenterText'>
                            <Button variant='primary'  onClick={
                                (event)=>{
                                    event.preventDefault()
                                    handlePrint()
                                    
                                }
                            }>Print</Button>
                        </Col>
                        
                    </Row>
                </Card.Footer>
            </Card>
        </Col>
    )

}