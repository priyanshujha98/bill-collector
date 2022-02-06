import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import actions from '../../store/actions/actions';
import { DropDown } from '../Common/DropDown';
import Loader from '../Common/Loader';
import { BillComponent } from './BillComoponent';


export const InComponent = () => {

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(actions.getAllLocation())
    },[])

    useEffect(()=>{
        return()=>{
            dispatch(actions.resetBillAdd())
        }
    },[])

    const profile = useSelector((state)=>state?.login?.result)
    const locationRecord = useSelector((state)=>state?.locationReducer?.result)
    const billAction = useSelector((state)=>state?.bill)
    const isLoading = useSelector((state)=>state?.network?.isLoading)
    const [formInitaialValues, setFormInitialValue] = useState({
        token_no: `T_${ new Date().getTime() }`,
        pnr_no:"",
        people_count:"",
        mobile_no:"",
        name:"",
        location_id:"",
        created_by: profile?.id
    })

    const validationSchema = yup.object().shape({
        token_no: yup.string().required(),
        pnr_no: yup.string().required("Pnr No cannot be empty"),
        name: yup.string().required("Name cannot be empty"),
        people_count: yup.number().required("No of people required"),
        location_id: yup.number().required("Please select a location")
    })

    return(
        <React.Fragment>
            <Formik
                initialValues={formInitaialValues}
                validationSchema={validationSchema}
                enableReinitialize={true}
                onSubmit={(values)=>{
                    dispatch(actions.createBill(values))
                }}
            >
                {({handleChange, errors, touched, values, submitForm, resetForm,setFieldValue})=>(
                    <Form>
                        <Row className="mt-5">

                            { !isLoading?
                                <Col  md={7} className='marginAuto' style={{marginRight:"inherit"}}>
                                    <Card className=' loginImg text-center'>
                                        <Card.Header></Card.Header>
                                        <Card.Body>
                                            <Card.Title>
                                                In 
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
                                                            disabled={true}
                                                            value= {values?.token_no}
                                                            onChange={handleChange}
                                                            isInvalid = {errors.token_no && touched.token_no}
                                                        ></Form.Control>
                                                    </Form.Group>

                                                </Col>
                                                
                                            </Row>
                                            <Row className='mt-3'>
                                                <Col md={3}>
                                                    <Form.Label>
                                                        PNR No <span style={{color:'red'}}>*</span> - 
                                                    </Form.Label>
                                                </Col>
                                                <Col md={9}>
                                                    <Form.Group>
                                                        <Form.Control
                                                            type='text'
                                                            name='pnr_no'
                                                            value= {values?.pnr_no}
                                                            onChange={handleChange}
                                                            isInvalid = {errors.pnr_no && touched.pnr_no}
                                                        ></Form.Control>
                                                    </Form.Group>

                                                </Col>
                                                {
                                                    (errors.pnr_no && touched.pnr_no) && <i  style={{color:'red'}}>
                                                        {
                                                            errors.pnr_no
                                                        }
                                                    </i>
                                                }
                                            </Row>
                                            <Row className='mt-3'>
                                                <Col md={3}>
                                                    <Form.Label>
                                                        Mobile No 
                                                    </Form.Label>
                                                </Col>
                                                <Col md={9}>
                                                    <Form.Group>
                                                        <Form.Control
                                                            type='text'
                                                            name='mobile_no'
                                                            value= {values?.mobile_no}
                                                            onChange={handleChange}
                                                            isInvalid = {errors.mobile_no && touched.mobile_no}
                                                        ></Form.Control>
                                                    </Form.Group>

                                                </Col>
                                                {
                                                    (errors.mobile_no && touched.mobile_no) && <i  style={{color:'red'}}>
                                                        {
                                                            errors.mobile_no 
                                                        }
                                                    </i>
                                                }
                                            </Row>
                                            <Row className='mt-3'>
                                                <Col md={3}>
                                                    <Form.Label>
                                                        Name <span style={{color:'red'}}>*</span> - 
                                                    </Form.Label>
                                                </Col>
                                                <Col md={9}>
                                                    <Form.Group>
                                                        <Form.Control
                                                            type='text'
                                                            name='name'
                                                            value= {values?.name}
                                                            onChange={handleChange}
                                                            isInvalid = {errors.name && touched.name}
                                                        ></Form.Control>
                                                    </Form.Group>

                                                </Col>
                                                {
                                                    (errors.name && touched.name) && <i  style={{color:'red'}}>
                                                        {
                                                            errors.name
                                                        }
                                                    </i>
                                                }
                                            </Row>
                                            <Row className='mt-3'>
                                                <Col md={3}>
                                                    <Form.Label>
                                                        People Count <span style={{color:'red'}}>*</span> - 
                                                    </Form.Label>
                                                </Col>
                                                <Col md={9}>
                                                    <Form.Group>
                                                        <Form.Control
                                                            type='number'
                                                            name='people_count'
                                                            value= {values?.people_count}
                                                            onChange={handleChange}
                                                            isInvalid = {errors.people_count && touched.people_count}
                                                        ></Form.Control>
                                                    </Form.Group>

                                                </Col>
                                                {
                                                    (errors.people_count && touched.people_count) && <i  style={{color:'red'}}>
                                                        {
                                                            errors.people_count
                                                        }
                                                    </i>
                                                }
                                            </Row>
                                            <Row className='mt-3'>
                                                <Col md={3}>
                                                    <Form.Label>
                                                        Location <span style={{color:'red'}}>*</span> - 
                                                    </Form.Label>
                                                </Col>
                                                <Col md={9}>
                                                    <DropDown
                                                        name={"location_id"}
                                                        dropdownValue = {(locationRecord?.records || [])?.map((location)=>{
                                                            return {id:location?.id, value: location?.l_name}
                                                        })}
                                                        isInvalid = {errors.location_id}
                                                        placeholder="Select location"
                                                        setFieldValue = {setFieldValue}
                                                        selected={values}
                                                    ></DropDown>
                                                    
                                                </Col>
                                                {
                                                    (errors.location_id && touched.location_id) && <i  style={{color:'red'}}>
                                                        {
                                                            errors.location_id
                                                        }
                                                    </i>
                                                }
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
                                                        setFormInitialValue({...formInitaialValues, token_no: `T_${ new Date().getTime() }`})
                                                    }}>Reset</Button>
                                                </Col>
                                            </Row>
                                        </Card.Footer>
                                    </Card>
                                </Col>:(
                                    <Loader/>
                                )
                            }
                            <BillComponent submitCalled={billAction?.isAdded} values={values}/>
                        </Row>
                    </Form>
                )}
            </Formik>
        </React.Fragment>
    )
}