import React from "react"
import { Redirect, Route } from "react-router-dom"
import { BillList } from "../components/BillList/BillList"
import { InComponent } from "../components/InComponent/InComponent"
import { AddLocations } from "../components/Locations/AddLocations"
import { UpdateLocations } from "../components/Locations/UpdateLocations"
import { OutComponent } from "../components/OutComponent/OutComponent"
import { UserList } from "../components/UserList/UserList"

import { PublicUrl } from "../helper/constant"
const PrivateRoute = ({recentPath})=>{
    const lastRoute = ()=>{
        const notToRedirect = PublicUrl
        if(recentPath && recentPath.length && !notToRedirect.includes(recentPath)){
            return recentPath
        }else{
            return "/home"
        }
    }
    return(
        <>
            <Route
                exact
                path={"/home"}
                component={InComponent}
            ></Route>
            <Route
                exact
                path={"/out"}
                component={OutComponent}
            ></Route>
            <Route
                exact
                path={"/all-bills"}
                component={BillList}
            ></Route>
            <Route
                exact
                path={"/all-users"}
                component={UserList}
            ></Route>
            <Route
                exact
                path={"/add/locations"}
                component={AddLocations}
            ></Route>
            <Route
                exact
                path={"/update/locations"}
                component={UpdateLocations}
            ></Route>
           
           <Redirect to={lastRoute()}/>
           
        </>
    )
}

export default PrivateRoute