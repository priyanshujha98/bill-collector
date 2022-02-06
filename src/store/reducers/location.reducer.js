import actions from "../actions/actions";

const initialState = {
    result:false,
    msg:false,
    isUpdated:false,
    isAdded: false
}

export const locationReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_ALL_LOCATION:
        case actions.UPDATE_LOCATION:
        case actions.CREATE_LOCATION:{
            return{
                ...state,
                result: false,
                msg: false,
                isUpdated: false,
                isAdded: false
            }
        }
            
        case actions.GET_ALL_LOCATION_SUCCESS:{
            return{
                ...state,
                result: action.data?.data,
                msg:action?.data?.msg,
                isUpdated: false,
                isAdded: false
            }
        }

        case actions.GET_ALL_LOCATION_FAILED:{
            return{
                ...state,
                result: false,
                msg:action?.data?.msg,
                isUpdated: false,
                isAdded: false
            }
        }
        
        case actions.UPDATE_LOCATION_SUCCESS:{
            return{
                ...state,
                result: action?.data?.data,
                msg: action?.data?.msg,
                isUpdated: true,
                isAdded: false
            }
        }

        case actions.UPDATE_LOCATION_FAILED:{
            return{
                ...state,
                result: false,
                msg: action?.data?.msg,
                isUpdated: false,
                isAdded: false
            }
        }

        case actions.CREATE_LOCATION_SUCCESS:{
            return{
                ...state,
                result: action?.data?.data,
                msg: action?.data?.msg,
                isUpdated: false,
                isAdded: true
            }
        }

        case actions.CREATE_LOCATION_FAILED:{
            return{
                ...state,
                result: false,
                msg: action?.data?.msg,
                isUpdated: false,
                isAdded: false
            }
        }
    
        default:{
            return state
        }
            
    }
}
