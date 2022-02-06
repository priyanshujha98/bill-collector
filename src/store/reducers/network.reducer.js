import actions from "../actions/actions";

const initialState = {
    data: false,
    isLoading: false
}
export const networkReducer = (state = initialState, action)=>{
    switch (action?.type) {
        case actions.API_FAILED:
        case actions.API_SUCCESS:
        case actions.API_WARNING:{
            return{
                ...state,
                msg: action?.data?.msg,
                isLoading: false
            }
        }
        case actions.API_FETCHING:{
            return{
                ...state,
                isLoading:true
            }
        }
            
    
        default:{
            return state
        }
            
    }
}