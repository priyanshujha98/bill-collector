export const CREATE_BILL_ENTRY = "CREATE_BILL_ENTRY"
export const CREATE_BILL_ENTRY_SUCCESS = "CREATE_BILL_ENTRY_SUCCESS"
export const CREATE_BILL_ENTRY_FAILED = "CREATE_BILL_ENTRY_FAILED"

export const GET_CREATED_BILL = "GET_CREATED_BILL"
export const GET_CREATED_BILL_SUCCESS = "GET_CREATED_BILL_SUCCESS"
export const GET_CREATED_BILL_FAILED = "GET_CREATED_BILL_FAILED"

export const GET_ALL_BILL = "GET_ALL_BILL"
export const GET_ALL_BILL_SUCCESS = "GET_ALL_BILL_SUCCESS"
export const GET_ALL_BILL_FAILED = "GET_ALL_BILL_FAILED"

export const RESET_BILL_ADDED = "RESET_BILL_ADDED"

export const createBill = (payload) =>{
    return{
        type: CREATE_BILL_ENTRY,
        payload
    }
}

export const getBill = (payload)=>{
    return{
        type: GET_CREATED_BILL,
        payload
    }
}

export const getAllBill = (payload) => {
    return{
        type: GET_ALL_BILL,
        payload
    }
}

export const resetBillAdd = ()=>{
    return{
        type: RESET_BILL_ADDED
    }
}