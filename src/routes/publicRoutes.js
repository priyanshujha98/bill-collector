import { Route, Redirect } from "react-router-dom"
import { Login } from "../components/login/login"
import React from "react"
import { PublicUrl } from "../helper/constant"
import { ForgotPassword } from "../components/ForgotPassword/ForgotPassword"
import { SignUp } from "../components/SignUp/SignUp"

const PublicRoutes = ({recentPath})=>{
    const lastRoute = ()=>{
        const notToRedirect = PublicUrl
        if(notToRedirect.includes(recentPath) && recentPath !=="/"){
            return recentPath
        }else{
            return "/login"
        }
    }
    return(
        <>
            <Route
                exact
                path="/login"
                component={Login}
            ></Route>
            <Route
                exact
                path="/forgot-password"
                component={ForgotPassword}
            ></Route>
            <Route
                exact
                path="/sign-up"
                component={SignUp}
            ></Route>
            <Redirect to={lastRoute()}></Redirect>
            
        </>
    )
}

export default PublicRoutes