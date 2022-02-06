import React, { useState } from 'react';
import { Col, Form, InputGroup, Row } from 'react-bootstrap';
import { ReactComponent as CloseIconSVG } from '../Common/icons/closeIcon.svg';
const SearchBar = (props)=>{
    const [searchValue, setSearchValue] = useState("")
    const [isEnterPressed, setEnterPressed] = useState(false)

    const setSearch = (filterValue= searchValue)=>{
        props.search(filterValue)
    }

    return (
        <Row>
            <Col md={10} sm={8} xs={12}>
                <Form.Group>
                    <InputGroup >
                        <Form.Control
                            type="text"
                            placeholder='search'
                            className='search'
                            onKeyUp={(event)=>{
                                if(+event?.keyCode === 13){
                                    event.preventDefault()
                                    setEnterPressed(true)
                                    setSearch()
                                }
                            }}
                            onChange={(event)=>{
                                event.preventDefault()
                                setSearchValue(event?.target?.value)
                                if(!event?.target?.value && isEnterPressed) {
                                    setEnterPressed(false)
                                    setSearch("")
                                }
                            }}
                            ></Form.Control>
                    </InputGroup>
                </Form.Group>
            </Col>
            
        </Row>
    )
}

export default SearchBar