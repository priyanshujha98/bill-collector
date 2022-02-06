import { useEffect, useRef, useState } from 'react'
import {  Switch } from 'react-router-dom'
import React from 'react'
import PublicRoutes from './publicRoutes'
import PrivateRoute from './privateRoute'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../store/actions/actions'
import { BaseLayout } from '../layout/BaseLayout'
export const AppRoute = ()=>{
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const history = useHistory()
    const recentPath = useRef(history?.location.pathname)
 
    const isSessionTokenExist = useSelector((state)=>state?.login?.AccessToken)
    const dispatch = useDispatch()
    useEffect(()=>{
        if( (isSessionTokenExist && isSessionTokenExist?.length> 1)){
            setIsAuthenticated(true)
            
        }else{
            setIsAuthenticated(false)
            
        }
    },[ isSessionTokenExist])

    useEffect(()=>{
        
        dispatch(actions.setTokenReducer())
    },[recentPath])
    const privateRoutes = (recentPath)=>{
       
        return (
                <BaseLayout>
                    <PrivateRoute recentPath={recentPath}/>
                </BaseLayout>
                )
    }
    const publicRoutes = (recentPath)=>{
        return <PublicRoutes recentPath = {recentPath}/>
    }
    const getRoutes = ()=>{
        return isAuthenticated ? privateRoutes(recentPath.current):publicRoutes(recentPath.current)
    }
    return (<Switch>{getRoutes()}</Switch>)
}