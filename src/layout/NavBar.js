import React, { useEffect, useState } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { FunctionHighlight } from '../helper/constant';
import actions from '../store/actions/actions';

export const NavBar = () => {
    const dispatch = useDispatch()
    const [activeLink, setActiveLink] = useState(1)
    const profile = useSelector((state)=>state?.login?.result)
    const logout = useSelector((state)=>state?.login?.logout)
    const history = useHistory()
    const location = useLocation()
    useEffect(()=>{
        if(!profile && !logout){

            dispatch(actions.getUserProfile())
        }
    },[profile])

    useEffect(()=>{
        switch (location.pathname) {
            case "/home":
                setActiveLink(0)
                break;

            case "/out":
                setActiveLink(1)
                break;

            case "/all-bills":
                setActiveLink(2)
                break;
            
            case "/all-users":
                setActiveLink(3)
                break;
        
            default:
                setActiveLink(0)
                break;
        }
        
    },[location])


    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className='navPositionFix'>
            
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                
                <Navbar.Collapse id="responsive-navbar-nav" className='justifySpaceBetween'>
                    <Link className='pointer navbar-brand logo' to='/home' onClick={()=>{setActiveLink(1)}}>Bill-Collector</Link>
               
                    <Nav>
                            
                        
                            <Link to='/home' className={`nav-link ${activeLink===0?"active": ""}`}  onClick={()=>{
                                setActiveLink(0)
                                
                            }}>In</Link>
                        
                        
                        <Link  to="/out" className={`nav-link ${activeLink===1?"active": ""}`} onClick={()=>{
                            setActiveLink(1)
                            }}>Out</Link>
                        
                       {profile?.u_role_id ===1 && <Link  to="/all-bills" className={`nav-link ${activeLink===2?"active": ""}`} onClick={()=>{
                            setActiveLink(2)
                            }}>All Bills</Link>}
                        
                        {profile?.u_role_id ===1 && <Link  to="/all-users" className={`nav-link ${activeLink===3?"active": ""}`} onClick={()=>{
                            setActiveLink(3)
                            }}>All Users</Link>}
                    
                    </Nav>
                
                    <Nav className='profileDropdown' >
                        <NavDropdown title={`${profile?.u_name}`} id="collasible-nav-dropdown " >
                            <NavDropdown.Item href="#" onClick={()=>{
                                dispatch(actions.logout())
                            }}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
               
                </Navbar.Collapse>
                
               {/*  </Row> */}
            </Navbar>
    )
}