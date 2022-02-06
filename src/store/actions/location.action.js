export const GET_ALL_LOCATION = "GET_ALL_LOCATION"
export const GET_ALL_LOCATION_SUCCESS = "GET_ALL_LOCATION_SUCCESS"
export const GET_ALL_LOCATION_FAILED = "GET_ALL_LOCATION_FAILED"

export const UPDATE_LOCATION = "UPDATE_LOCATION"
export const UPDATE_LOCATION_SUCCESS = "UPDATE_LOCATION_SUCCESS"
export const UPDATE_LOCATION_FAILED = "UPDATE_LOCATION_FAILED"

export const CREATE_LOCATION = "CREATE_LOCATION"
export const CREATE_LOCATION_SUCCESS = "CREATE_LOCATION_SUCCESS"
export const CREATE_LOCATION_FAILED = "CREATE_LOCATION_FAILED"

export const getAllLocation = ()=>{
    return{
        type: GET_ALL_LOCATION,
    }
}

export const updateLocations = (payload) =>{
    return{
        type : UPDATE_LOCATION,
        payload
    }
}

export const createLocation = (payload) => {
    return{
        type: CREATE_LOCATION,
        payload
    }
}