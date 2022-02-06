import actions from "../actions/actions";

const initialState = {
    result:false,
    msg:false,
    AccessToken:false,
    RefreshToken: false,

    logout:false,
    codeVerified: false,
    codeSent: false
}
export const loginReducer = (state = initialState, action)=>{
    switch (action.type) {
        case actions.LOGIN:{
            return{
                ...state,
                result:false,
                msg:false,
                AccessToken:false,
                RefreshToken: false,
               
                logout:false,
                codeVerified: false,
                codeSent: false
            }
        }

        case actions.LOGIN_SUCCESS:{
            return{
                ...state,
                result: action?.data?.data?.loginProfile,
                msg: action?.data?.msg,
                AccessToken: action?.data?.data?.AuthenticationResult?.AccessToken,
                RefreshToken: action?.data?.data?.AuthenticationResult?.RefreshToken,
               
                logout:false,
                codeVerified: false,
                codeSent: false
            }
        }

        case actions.SET_TOKEN_REDUCER:{
            return{
                ...state,
                AccessToken: localStorage.getItem('AccessToken'),
                RefreshToken: localStorage.getItem('RefreshToken'),
                
                logout:false,
                codeVerified: false,
                codeSent: false
            }
        }

        case actions.GET_USER_PROFILE:{
            return {
                ...state,
                result:false,
                logout:false,
                codeVerified: false,
                codeSent: false
            }
        }
        case actions.GET_USER_PROFILE_SUCCESS: {
            return{
                ...state,
                result: action?.data?.data,
                logout:false,
                codeVerified: false,
                codeSent: false
            }
        }

        case actions.GET_USER_PROFILE_FAILED: {
            return{
                ...state,
                result: false,
                msg: action?.data?.msg,
                logout:false,
                codeVerified: false,
                codeSent: false
            }
        }

        case actions.LOGOUT_SUCCESS:{
            localStorage.clear()
            return{
                ...state,
                result:false,
                msg:false,
                AccessToken:false,
                RefreshToken: false,
               
                logout:true,
                codeVerified: false,
                codeSent: false
            }
        }

        case actions.CODE_VERIFICATION:
        case actions.CODE_VERIFICATION_FAILED:
        case actions.CODE_CONFIRMATION:
        case actions.CODE_CONFIRMATION_FAILED:{
            return{
                ...state,
                logout:false,
                codeVerified:false,
                codeSent: false
            }
        }

        case actions.CODE_VERIFICATION_SUCCESS:
        case actions.CODE_CONFIRMATION_SUCCESS:{
            return{
                ...state,
                logout: false,
                codeVerified: true,
                codeSent: false
            }
        }

        case actions.RESET_CODE_VERIFICATION:{
            return{
                ...state,
                codeVerified:false
            }
        }

        case actions.EMAIL_CODE_SENT:
        case actions.EMAIL_CODE_SENT_FAILED: {
            return{
                ...state,
                logout: false,
                codeVerified: false,
                codeSent: false

            }
        }

        case actions.EMAIL_CODE_SENT_SUCCESS:{
            return{
                ...state,
                logout: false,
                codeVerified: false,
                codeSent: true

            }
        }
    
        default:{
            return state;
        }
    }
}