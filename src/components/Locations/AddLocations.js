import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Common/Loader';
import * as yup from "yup";
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import actions from '../../store/actions/actions';
export const AddLocations = ()=>{

    const dispatch = useDispatch()
    const history = useHistory()
    const [formInitaialValues, setFormInitialValue] = useState([{
        l_name:"", l_price:""
    }])
    const [allowAccess, setAllowAccess] = useState(0)
    const loogedInprofile = useSelector((state)=>state?.login?.result)
    const isLoading = useSelector((state)=>state?.network.isLoading)
    useEffect(()=>{
        if(loogedInprofile?.u_role_id === 1){
            setAllowAccess(1)
        }else{
            setAllowAccess(0)
        }
    },[loogedInprofile])

    const validationSchema = yup.object().shape({
        l_name: yup.string().required("Should not be empty"),
        l_price: yup.number().required("Should not be empty")
    })

    return(
        allowAccess?
        (<div className='content mt-5'>
            {!isLoading ? 
                <div className='overlayScroll'>
                    <h2>
                        Add Locations
                    </h2>
                    <Formik
                        initialValues={formInitaialValues}
                        validationSchema={validationSchema}
                        enableReinitialize={true}
                        onSubmit={()=>{
                            let valid = true
                            formInitaialValues.forEach((values)=>{
                                if(!values?.l_name && !values?.l_price){
                                    valid = false
                                }
                            })

                            if(valid){
                                dispatch(actions.createLocation(formInitaialValues))
                            }else{
                                alert("Please fill all the fields")
                            }
                        }}
                    >
                        {({values, errors, touched ,handleChange, submitForm})=>(
                            <React.Fragment>
                                <Row>
                                    <Col>
                                        <Button onClick={()=>{
                                            formInitaialValues.push({
                                                l_name:"", l_price:""
                                            })
                                            setFormInitialValue([...formInitaialValues])
                                        }}>Add</Button>
                                    </Col>
                                    <Col>
                                    
                                        <Button onClick={()=>{
                                            formInitaialValues.pop()
                                            setFormInitialValue([...formInitaialValues])
                                        }} variant={'secondary'}>Remove</Button>
                                    </Col>
                                </Row>
                                <Form>
                                    {
                                        formInitaialValues.map((initialValue, valueIndex)=>(
                                            <React.Fragment key={valueIndex}>
                                                <Row>
                                                    <Col>
                                                        <Form.Label>Location Name</Form.Label>
                                                        <Form.Group>
                                                            <Form.Control
                                                                type={'text'}
                                                                name="l_nane"
                                                                onChange={(event)=>{
                                                                    formInitaialValues[valueIndex].l_name = event.target.value
                                                                    setFormInitialValue([...formInitaialValues])
                                                                }}
                                                                value={values?.l_name || ""}
                                                                isInvalid = {errors.l_name && touched.l_name}
                                                            >
                                                            </Form.Control>
                                                        </Form.Group>
                                                        {
                                                            (errors.l_name && touched.l_name) && <i>
                                                                {
                                                                    errors.l_name
                                                                }
                                                            </i>
                                                        }
                                                    </Col>
                                                    <Col>
                                                        <Form.Label>Location Price</Form.Label>
                                                        <Form.Group>
                                                            <Form.Control
                                                                type={'number'}
                                                                name="l_price"
                                                                onChange={(event)=>{
                                                                    formInitaialValues[valueIndex].l_price = event.target.value
                                                                    setFormInitialValue([...formInitaialValues])
                                                                }}
                                                                value={values?.l_price || ""}
                                                                isInvalid = {errors.l_price && touched.l_price}
                                                            >
                                                            </Form.Control>
                                                        </Form.Group>
                                                        {
                                                            (errors.l_price && touched.l_price) && <i>
                                                                {
                                                                    errors.l_price
                                                                }
                                                            </i>
                                                        }
                                                    </Col>
                                                </Row>
                                            </React.Fragment>
                                        ))
                                    }
                                    <Row className='mt-3'>
                                        <Col>
                                            <Button type={'submit'} onClick={(event)=>{
                                                event.preventDefault()
                                                submitForm()
                                            }}>
                                                Submit
                                            </Button>
                                        </Col>
                                        <Col>
                                        
                                            <Button variant='secondary' onClick={()=>{
                                                history.push("/all-bills")
                                            }}>
                                                Cancel
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </React.Fragment>
                        )}
                    </Formik>
                </div>:(
                    <Loader></Loader>
                )
            }
        </div>):(
            <div className='content mt-5'>
                <div className='overlayScroll'>
                    <h2>
                        Unauthorised Access
                    </h2>
                </div>
            </div>
        )
    )
}