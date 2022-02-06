export const GET_USER_LIST = "GET_USER_LIST"
export const GET_USER_LIST_SUCCESS = "GET_USER_LIST_SUCCESS"
export const GET_USER_LIST_FAILED =  "GET_USER_LIST_FAILED"

export const ACTIVATE_DEACTIVATE_ADMIN = "ACTIVATE_DEACTIVATE_ADMIN"
export const ACTIVATE_DEACTIVATE_ADMIN_SUCCESS = "ACTIVATE_DEACTIVATE_ADMIN_SUCCESS"
export const ACTIVATE_DEACTIVATE_ADMIN_FAILED = "ACTIVATE_DEACTIVATE_ADMIN_FAILED"

export const DELETE_ADMIN = "DELETE_ADMIN"
export const DELETE_ADMIN_SUCCESS = "DELETE_ADMIN_SUCCESS"
export const DELETE_ADMIN_FAILED = "DELETE_ADMIN_FAILED"

export const ADD_ADMIN = "ADD_ADMIN"
export const ADD_ADMIN_SUCCESS = "ADD_ADMIN_SUCCESS"
export const ADD_ADMIN_FAILED = "ADD_ADMIN_FAILED"

export const CODE_VERIFICATION_ROOM = "CODE_VERIFICATION_ROOM"
export const CODE_VERIFICATION_ROOM_SUCCESS = "CODE_VERIFICATION_ROOM_SUCCESS"
export const CODE_VERIFICATION_ROOM_FAILED = "CODE_VERIFICATION_ROOM_FAILED"

export const UPDATE_ADMIN = "UPDATE_ADMIN"
export const UPDATE_ADMIN_SUCCESS = "UPDATE_ADMIN_SUCCESS"
export const UPDATE_ADMIN_FAILED = "UPDATE_ADMIN_FAILED"

export const GET_ADMIN_BY_ID = "GET_ADMIN_BY_ID"
export const GET_ADMIN_BY_ID_SUCCESS = "GET_ADMIN_BY_ID_SUCCESS"
export const GET_ADMIN_BY_ID_FAILED = "GET_ADMIN_BY_ID_FAILED"

export const getUserList = (payload)=>{
    return {
        type: GET_USER_LIST,
        payload
    }
}

export const activateInactivate = (id, payload) => {
    return{
        type: ACTIVATE_DEACTIVATE_ADMIN,
        id,
        payload
    }
}

export const deleteAdmin = (id) => {
    return{
        type: DELETE_ADMIN,
        id
    }
}

export const addAdmin = (payload) => {
    return{
        type: ADD_ADMIN,
        payload
    }
}

export const codeVerify = (payload) => {
    return{
        type:CODE_VERIFICATION_ROOM,
        payload
    }
}

export const getAdminById = (id) => {
    return{
        type: GET_ADMIN_BY_ID,
        id
    }
}

export const updateAdmin = (id,payload) => {
    return{
        type: UPDATE_ADMIN,
        id,
        payload
    }
}