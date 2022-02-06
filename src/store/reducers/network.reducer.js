import actions from "../actions/actions";

const initialState = {
    data: false,
    isLoading: false,
    isFailed: false,
    isSuccess: false
}
export const networkReducer = (state = initialState, action)=>{
    switch (action?.type) {
        case actions.API_SUCCESS:
        case actions.API_WARNING:{
            return{
                ...state,
                msg: action?.data?.data?.msg || action?.data?.msg,
                isLoading: false,
                isFailed: false,
                isSuccess: true
            }
        }

        case actions.API_FAILED:{
            
            return{
                ...state,
                msg: action?.data?.data?.msg || action?.data?.msg,
                isLoading: false,
                isFailed: true,
                isSuccess: false
            }
        }
        case actions.API_FETCHING:{
            return{
                ...state,
                isLoading:true,
                isFailed: false,
                isSuccess: false
            }
        }
            
    
        default:{
            return state
        }
            
    }
}