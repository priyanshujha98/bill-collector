import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Common/Loader';
import * as yup from "yup";
import actions from '../../store/actions/actions';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { VerifyCode } from '../Common/VerifyCode';

export const SignUp = () => {

    const [formInitialValue, setFormInitialValue] = useState({
        username: "",
        name: "",
        dob: "",
        password: "",
        confirm_password: "",
      });

    const formSchema = yup.object().shape({
        username: yup.string().required("This field cannot be blank"),
        name: yup.string().required("This field cannot be blank"),
        dob: yup.date("Please select something").required("Please select something"),
        password: yup
            .string()
            .min(7, "Minimum 7 characters")
            .required("This field cannot be blank"),
        confirm_password: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required("This field cannot be blank")
      });
    const dispatch = useDispatch()
    const history = useHistory()

    const isLoading = useSelector((state)=>state?.network?.isLoading)
    const isAdded = useSelector((state)=>state?.user?.isAdded)


    useEffect(()=>{
        if(isAdded){
           
            history.push("/login")
        }
      },[isAdded])
    return(
        <>
            {
                !isLoading ? (
                    <div className='content mt-3'>
                        <div className='overlayScroll'>
                            <div className="ml-3">
                                <h1>Sign Up</h1>
                                
                                    <Formik
                                        initialValues={formInitialValue}
                                        enableReinitialize={true}
                                        validationSchema={formSchema}
                                        onSubmit={(values)=>{
                                            setFormInitialValue(values)
                                            const payload={
                                                    "username":values?.username,
                                                    "name":values?.name,
                                                    "dob": values?.dob,
                                                    "password": values?.password,
                                                }
                                                
                                            
                                            dispatch(actions.addAdmin(payload))
                                        }}
                                    >
                                        {({handleChange, errors, values, touched, setFieldValue, submitForm}) => (
                                            <>
                                                <Form>
                                                    <Row>
                                                        <Col md={6}>
                                                            <Form.Label>
                                                                Username <span style={{color:'red'}}>*</span>
                                                            </Form.Label>
                                                            <Form.Control
                                                             type='text'
                                                             name='username'
                                                             onChange={handleChange}
                                                             value={values?.username || ""}
                                                             isInvalid = {errors.username && touched?.username}
                                                            ></Form.Control>
                                                        </Col>
                                                        {
                                                            (errors.username && touched?.username) && <i style={{color:'red'}}>
                                                                {errors.username}
                                                            </i>
                                                        }
                                                    </Row>
                                                    <Row>
                                                        <Col md={6}>
                                                            <Form.Label>
                                                                Name <span style={{color:'red'}}>*</span>
                                                            </Form.Label>
                                                            <Form.Control
                                                             type='text'
                                                             name='name'
                                                             onChange={handleChange}
                                                             value={values?.name || ""}
                                                             isInvalid = {errors.name && touched?.name}
                                                            ></Form.Control>
                                                        </Col>
                                                        {
                                                            (errors.name && touched?.name) && <i style={{color:'red'}}>
                                                                {errors.name}
                                                            </i>
                                                        }
                                                    </Row>
                                                    <Row>
                                                        <Col md={6}>
                                                            <Form.Label>
                                                                Date of Birth <span style={{color:'red'}}>*</span>
                                                            </Form.Label>
                                                            <Form.Control
                                                             type='date'
                                                             name='dob'
                                                             onChange={handleChange}
                                                             value={values?.dob || ""}
                                                             isInvalid = {errors.dob && touched?.dob}
                                                            ></Form.Control>
                                                        </Col>
                                                        {
                                                            (errors.dob && touched?.dob) && <i style={{color:'red'}}>
                                                                {errors.dob}
                                                            </i>
                                                        }
                                                    </Row>
                                                    <Row>
                                                        <Col md={6}>
                                                            <Form.Label>
                                                                Password <span style={{color:'red'}}>*</span>
                                                            </Form.Label>
                                                            <Form.Control
                                                             type='password'
                                                             name='password'
                                                             onChange={handleChange}
                                                             value={values?.password || ""}
                                                             isInvalid = {errors.password && touched?.password}
                                                            ></Form.Control>
                                                        </Col>
                                                        {
                                                            (errors.password && touched?.password) && <i style={{color:'red'}}>
                                                                {errors.password}
                                                            </i>
                                                        }
                                                    </Row>
                                                    <Row>
                                                        <Col md={6}>
                                                            <Form.Label>
                                                                Confirm Password <span style={{color:'red'}}>*</span>
                                                            </Form.Label>
                                                            <Form.Control
                                                             type='password'
                                                             name='confirm_password'
                                                             onChange={handleChange}
                                                             value={values?.confirm_password || ""}
                                                             isInvalid = {errors.confirm_password && touched?.confirm_password}
                                                            ></Form.Control>
                                                        </Col>
                                                        {
                                                            (errors.confirm_password && touched?.confirm_password) && <i style={{color:'red'}}>
                                                                {errors.confirm_password}
                                                            </i>
                                                        }
                                                    </Row>
                                                </Form>
                                                <Row className="mt-4" md={5}>
                                                    <Col>
                                                        <Button type="submit" className='loginSubmitButton' onClick={(e)=>{
                                                            e.preventDefault()
                                                            submitForm()
                                                        }}>Submit</Button>
                                                    </Col>
                                                    <Col>
                                                        <Button variant="secondary" className='cancelButton' onClick={()=>{
                                                            history.goBack()
                                                        }}>Cancel</Button>
                                                    </Col>
                                                </Row>
                                            </>
                                        )}
                                    </Formik>
                                
                            </div>
                        </div>
                    </div>
                ):(<Loader/>)
            }
        </>
    )
}