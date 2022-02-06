import React from 'react';
import { NavBar } from './NavBar';

export const BaseLayout = ({children}) => {
    return (
        <React.Fragment>
            <div>
                <div><NavBar/></div>
                <div>{children}</div>
            </div>
        </React.Fragment>
    )
}

