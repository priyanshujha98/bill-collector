import React from 'react';

export const Status = (props)=>{
    return (
        <>
            <span className={props?.status?'dot':'dot-pending'}>
            </span>
            <span className="statusText m-2 mt-0 mb-0">{props?.status?"Active":"Inactive"} </span>
            
        </>
    )
}