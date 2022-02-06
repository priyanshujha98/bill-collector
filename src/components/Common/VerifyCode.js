import { Formik } from 'formik';
import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import * as yup from "yup";

export const VerifyCode = (props)=>{
    const formInitialValue = {
        verify_code:""
    }
    const formSchema = yup.object().shape({
        verify_code: yup.string().required("This field cannot be blank")
    })
    const history = useHistory()
    return(
        <>
            <Formik
                initialValues={formInitialValue}
                validationSchema={formSchema}
                onSubmit={(values)=>{
                    const payload = {
                        email: props?.email,
                        verificationCode: values?.verify_code
                    }
                    props.codeSubmit(payload)
                    
                }}
            >
                {({handleChange, errors, values, touched, submitForm})=>(
                    <>
                        <Row>
                            <Col md={5} className='mt-3'>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>
                                            Use the verification code emailed to you <span style={{color:'red'}}>*</span>
                                        </Form.Label>
                                        <Form.Control
                                            type='text'
                                            name='verify_code'
                                            onChange={handleChange}
                                            isInvalid={touched?.verify_code && errors?.verify_code}
                                        >
                                        </Form.Control>
                                        {touched?.verify_code && errors?.verify_code &&(
                                            <span className='formError'>
                                                <i>{errors?.verify_code}</i>
                                            </span>
                                        )}
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                        <Row className="mt-4" md={5}>
                            <Col>
                            <Button type="submit" className="loginSubmitButton" onClick={(e)=>{
                                e.preventDefault()
                                submitForm()
                                
                            }}>Verify</Button>
                            </Col>
                            <Col>
                            <Button variant="secondary" className="cancelButton" onClick={()=>{
                                history.goBack()
                            }}>Cancel</Button>
                            </Col>
                        </Row>
                    </>
                )}
            </Formik>
        </>
    )
}