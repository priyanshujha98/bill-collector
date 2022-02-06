export const LOGIN = "LOGIN"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FALIED = "LOGIN_FAILED"

export const SET_TOKEN_REDUCER = "SET_TOKEN_REDUCER"

export const GET_USER_PROFILE = "GET_USER_PROFILE"
export const GET_USER_PROFILE_SUCCESS = "GET_USER_PROFILE_SUCCESS"
export const GET_USER_PROFILE_FAILED = "GET_USER_PROFILE_FAILED"

export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS"

export const CODE_VERIFICATION = "CODE_VERIFICATION"
export const CODE_VERIFICATION_SUCCESS = "CODE_VERIFICATION_SUCCESS"
export const CODE_VERIFICATION_FAILED = "CODE_VERIFICATION_FAILED"

export const EMAIL_CODE_SENT = "EMAIL_CODE_SENT"
export const EMAIL_CODE_SENT_SUCCESS = "EMAIL_CODE_SENT_SUCCESS"
export const EMAIL_CODE_SENT_FAILED = "EMAIL_CODE_SENT_FAILED"

export const RESET_CODE_VERIFICATION = "RESET_CODE_VERIFICATION"

export const CODE_CONFIRMATION = "CODE_CONFIRMATION"
export const CODE_CONFIRMATION_SUCCESS = "CODE_CONFIRMATION_SUCCESS"
export const CODE_CONFIRMATION_FAILED = "CODE_CONFIRMATION_FAILED"


export const login = (payload)=>{
    return{
        type: LOGIN,
        payload
    }
}

export const setTokenReducer = ()=>{
    return{
        type: SET_TOKEN_REDUCER
    }
}

export const getUserProfile = ()=>{
    return{
        type: GET_USER_PROFILE
    }
}

export const logout = () =>{
    return{
        type: LOGOUT_SUCCESS
    }
}


export const resetCodeVerification = ()=>{
    return {
        type:RESET_CODE_VERIFICATION
    }
}

export const codeVerification = (payload)=>{
    return{
        type: CODE_CONFIRMATION,
        payload
    }
}

export const emailCode = (payload) => {
    return{
        type: EMAIL_CODE_SENT,
        payload
    }
}