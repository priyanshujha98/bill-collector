import actions from "../actions/actions";

const initialState = {
    result:false,
    msg:false,
    isUpdated:false,
    isAdded: false,
    codeVerified:false
}

export const userReducer = (state= initialState, action)=>{
    switch (action.type) {
        case actions.GET_USER_LIST:{
            return{
                ...state,
                result:false,
                isUpdated:false,
                isAdded: false,
                codeVerified:false
            }
        }
        case actions.GET_USER_LIST_SUCCESS:{
            return{
                ...state,
                result: action?.data?.data,
                msg: action?.data?.msg,
                isUpdated:false,
                isAdded: false,
                codeVerified:false
                
            }
        }

        case actions.GET_USER_LIST_FAILED:{
            return{
                ...state,
                result:false,
                nsg: action?.data?.msg,
                isUpdated: false,
                isAdded: false,
                codeVerified:false
                
            }
        }

        case actions.ACTIVATE_DEACTIVATE_ADMIN:{
            return{
                ...state,
                isUpdated: false,
                isAdded:false,
                codeVerified:false
                
            }
        }

        case actions.ACTIVATE_DEACTIVATE_ADMIN_SUCCESS:{
            return{
                ...state,
                isUpdated:true,
                isAdded: false,
                msg: action?.data?.msg,
                codeVerified:false
                
            }
        }
        case actions.ACTIVATE_DEACTIVATE_ADMIN_FAILED:{
            return{
                ...state,
                isUpdated: false,
                isAdded: false,
                msg: action?.data?.msg,
                codeVerified:false
                
            }
        }

        case actions.DELETE_ADMIN: {
            return{
                ...state,
                isUpdated: false,
                isAdded: false,
                codeVerified:false
                
            }
        }

        case actions.DELETE_ADMIN_SUCCESS:{
            return{
                ...state,
                isUpdated: true,
                isAdded: false,
                msg: action?.data?.msg,
                codeVerified:false
                
            }
        }

        case actions.DELETE_ADMIN_FAILED:{
            return{
                ...state,
                isUpdated:false,
                isAdded: true,
                msg: action?.data?.msg,
                codeVerified:false
                
            }
        }

        case actions.ADD_ADMIN:{
            return{
                ...state,
                result: action?.data?.data,
                isAdded: false,
                isUpdated: false,
                msg: action?.data?.msg,
                codeVerified:false
                
            }
        }

        case actions.ADD_ADMIN_SUCCESS:{
            return{
                ...state,
                result: action?.data?.data,
                isAdded: true,
                isUpdated: false,
                msg: action?.data?.msg,
                codeVerified:false
                
            }
        }

        case actions.ADD_ADMIN_FAILED:{
            return{
                ...state,
                result:false,
                isAdded:false,
                isUpdated:false,
                msg: action?.data?.msg,
                codeVerified:false
                
            }
        }

        case actions.CODE_VERIFICATION_ROOM:
        case actions.CODE_VERIFICATION_ROOM_FAILED:{
            return{
                ...state,
                logout:false,
                isAdded:false,
                isUpdated:false,
                codeVerified:false
            }
        }

        case actions.CODE_VERIFICATION_ROOM_SUCCESS:{
            return{
                ...state,
                logout: false,
                isAdded:false,
                isUpdated:false,
                codeVerified: true
            }
        }

        case actions.GET_ADMIN_BY_ID:{
            return{
                ...state,
                result: false,
                logout: false,
                isAdded:false,
                isUpdated:false,
                codeVerified:true
            } 
        }

        case actions.GET_ADMIN_BY_ID_SUCCESS:{
            return{
                ...state,
                result: action?.data?.data,
                logout:false,
                isAdded:false,
                isUpdated:false,
                codeVerified:false,
                msg: action?.data?.msg
            }
        }

        case actions.GET_ADMIN_BY_ID_FAILED:{
            return{
                ...state,
                result:false,
                logout:false,
                isAdded:false,
                isUpdated:false,
                codeVerified:false,
                msg: action?.data?.msg
            }
        }

        case actions.UPDATE_ADMIN:
        case actions.UPDATE_ADMIN_FAILED:{
            return{
                ...state,
                result:false,
                logout:false,
                isAdded:false,
                isUpdated:false,
                codeVerified:false,
                msg: action?.data?.msg
            }
        }
        case actions.UPDATE_ADMIN_SUCCESS:{
            return{
                ...state,
                result: action?.data?.data,
                logout:false,
                isAdded:false,
                isUpdated:true,
                codeVerified:false,
                msg: action?.data?.msg
            }
        }

        default:{
            return state
        }
            
    }
}