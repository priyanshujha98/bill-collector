import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import actions from '../../store/actions/actions';
import { OutBillComponent } from './OutBillComponent';

export const OutComponent = () => {
    const dispatch = useDispatch()
    const formInitaialValues = {
        token_no: ""
    }

    const validationSchema = yup.object().shape({
        token_no: yup.string().required()
    })

    const billAction = useSelector((state)=>state?.bill?.result)

    return(
        <React.Fragment>
            <Formik
                initialValues={formInitaialValues}
                validationSchema={validationSchema}
                onSubmit = {(values)=>{
                    dispatch(actions.getBill(values))
                }}
            >
                {({handleChange, errors, touched, values, submitForm, resetForm})=>(
                    <Form>
                        <Row className="mt-5">
                            <Col  md={7} className='marginAuto' style={{marginRight:"inherit"}}>
                                <Card className=' loginImg text-center'>
                                    <Card.Header></Card.Header>
                                    <Card.Body>
                                        <Card.Title>
                                            Out 
                                        </Card.Title>
                                        <Row className='mt-3'>
                                            <Col md={3}>
                                                <Form.Label>
                                                    Token No <span style={{color:'red'}}>*</span> - 
                                                </Form.Label>
                                            </Col>
                                            <Col md={9}>
                                                <Form.Group>
                                                    <Form.Control
                                                        type='text'
                                                        name='token_no'
                                                        value= {values?.token_no}
                                                        onChange={handleChange}
                                                        isInvalid = {errors.token_no && touched.token_no}
                                                    ></Form.Control>
                                                </Form.Group>

                                            </Col>
                                        </Row>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Row>
                                            <Col md={6} className='alignEndText'>
                                                <Button variant='primary' type='submit' onClick={
                                                    (event)=>{
                                                        event.preventDefault()
                                                        submitForm()
                                                        
                                                    }
                                                }>Submit</Button>
                                            </Col>
                                            <Col md={6} className='alignStartText'>
                                                <Button variant='secondary' onClick={(event)=>{
                                                    
                                                    resetForm()
                                                }}>Reset</Button>
                                            </Col>
                                        </Row>
                                    </Card.Footer>
                                </Card>
                            </Col>
                            <OutBillComponent values={billAction}/>
                        </Row>
                    </Form>
                )}
            </Formik>
        </React.Fragment>
    )
}