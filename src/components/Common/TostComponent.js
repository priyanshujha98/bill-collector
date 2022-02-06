import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

export const ToastComponent = () => {
    const apiResponse = useSelector((state)=>state?.network)
    useEffect(()=>{
        handleRespone()
    },[apiResponse])

    const handleRespone = () => {
        if(apiResponse && apiResponse?.msg === "Network Error"){

            toast.error("Something went wrong, please try again later", {style:{
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              }})
        }
        else if(!apiResponse?.isLoading){
            if(apiResponse?.isSuccess){

                toast.success(apiResponse?.msg, {style:{
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                  }})
            }else if(apiResponse?.isFailed){
                toast.error(apiResponse?.msg, {style:{
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                  }})
            }
        }
    }
        
    
    return(
        <></>
    )
}