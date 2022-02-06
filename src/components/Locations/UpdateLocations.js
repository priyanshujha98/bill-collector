import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import actions from '../../store/actions/actions';
import Loader from '../Common/Loader';

export const UpdateLocations = ()=>{

    const dispatch = useDispatch()
    const history = useHistory()
    const [formInitaialValues, setFormInitialValue] = useState([])
    const [allowAccess, setAllowAccess] = useState(0)

    const loggedInProfile = useSelector((state)=>state?.login?.result)
    const isLoading = useSelector((state)=>state?.network?.isLoading)
    const allLocations = useSelector((state) => state?.locationReducer?.result)
    useEffect(()=>{
        if(loggedInProfile?.u_role_id === 1){
            setAllowAccess(1)
        }else{
            setAllowAccess(0)
        }
    },[loggedInProfile])
    useEffect(()=>{
        
        dispatch(actions.getAllLocation())
        
    },[])


    useEffect(()=>{
        if(allLocations){
            setFormInitialValue(allLocations?.records)
        }
    },[allLocations])

    return( allowAccess?
        (<div className='content mt-5'>
            { !isLoading?
                <div className='overlayScroll'>
                    <h2>
                        Update Locations
                    </h2>
                    {
                        (formInitaialValues || [])?.map((initialValue, valueIndex)=>(
                            <React.Fragment key={valueIndex}>
                                <Row>
                                    <Col>
                                        <Form.Label>Location Name</Form.Label>
                                        <Form.Group>
                                            <Form.Control
                                                type={'text'}
                                                name="l_nane"
                                                onChange={(event)=>{
                                                    formInitaialValues[valueIndex].l_name = (event.target.value)
                                                    setFormInitialValue([...formInitaialValues])
                                                }}
                                                value={initialValue?.l_name || ""}
                                                
                                            >
                                            </Form.Control>
                                        </Form.Group>
                                       
                                    </Col>
                                    <Col>
                                        <Form.Label>Location Price</Form.Label>
                                        <Form.Group>
                                            <Form.Control
                                                type={'number'}
                                                name="l_price"
                                                onChange={(event)=>{
                                                    formInitaialValues[valueIndex].l_price = parseInt(event.target.value)
                                                    setFormInitialValue([...formInitaialValues])
                                                }}
                                                value={initialValue?.l_price || ""}
                                               
                                            >
                                            </Form.Control>
                                        </Form.Group>
                                        
                                        
                                    </Col>
                                </Row>
                            </React.Fragment>
                        ))
                    }
                    <Row className='mt-3'>
                        <Col>
                            <Button onClick={()=>{
                                let valid = true
                                formInitaialValues.forEach((values)=>{
                                    if(!values?.l_name && !values?.l_price){
                                        valid = false
                                    }
                                })
    
                                if(valid){
                                    dispatch(actions.updateLocations(formInitaialValues))
                                }else{
                                    alert("Please fill all the fields")
                                }
                            }}>Update</Button>
                        </Col>
                        <Col>
                        
                            <Button onClick={()=>{
                                history.push("/all-bills")
                            }} variant={'secondary'}>Cancel</Button>
                        </Col>
                    </Row>
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