import actions from "../actions/actions";

const initialState = {
    result:false,
    msg:false,
    isUpdated:false,
    isAdded: false
}

export const billReducer = (state = initialState, action)=>{
    switch (action.type) {
        case actions.CREATE_BILL_ENTRY:
        case actions.GET_CREATED_BILL:
        case actions.GET_ALL_BILL: 
        case actions.RESET_BILL_ADDED:{
            return{
                ...state,
                result:false,
                msg:false,
                isUpdated:false,
                isAdded: false
            }
        }

        case actions.CREATE_BILL_ENTRY_SUCCESS:{
            return{
                ...state,
                result:action?.data?.data,
                msg:action?.data?.msg,
                isUpdated:false,
                isAdded: true
            }
        }

        case actions.GET_CREATED_BILL_SUCCESS:
        case actions.GET_ALL_BILL_SUCCESS:{
            return{
                ...state,
                result:action?.data?.data,
                msg:action?.data?.msg,
                isUpdated:false,
                isAdded: false
            }
        }

        case actions.CREATE_BILL_ENTRY_FAILED:
        case actions.GET_CREATED_BILL_FAILED:
        case actions.GET_ALL_BILL_FAILED:{
            return{
                ...state,
                result:false,
                msg:action?.data?.msg,
                isUpdated:false,
                isAdded: false
            }
        }
    
        default:{
            return state
        }
    }
} 