import { call, put, takeLatest } from "redux-saga/effects";
import LocationService from "../../services/location.service";
import actions from "../actions/actions";

const locationService  = new LocationService()

const getAllLocation = async () => {
    try {
        const response = await locationService.getAllLocation()
        return response
    } catch (error) {
        throw error
    }
}

const createLocations = async (payload) => {
    try {
        const response = await locationService.createLocations(payload)
        return response
    } catch (error) {
        throw error
    }
}

const updateLocations = async (payload) => {
    try {
        const response = await locationService.updateLocations(payload)
        return response
    } catch (error) {
        throw error
    }
}

function* dispatchGetAllLocation(action) {
    try {
      yield put({ type: actions.API_FETCHING });
      const response = yield call(getAllLocation,);
  
      if (response?.data?.success) {
        yield put({
          type: actions?.GET_ALL_LOCATION_SUCCESS,
          data: response?.data,
        });
        if (response?.headers?.istokenrefreshed) {
          yield put({ type: actions.SET_TOKEN_REDUCER });
        }
        yield put({
          type: actions.API_SUCCESS,
          data: response?.data,
        });
      } else {
        yield put({
          type: actions?.GET_ALL_LOCATION_FAILED,
          msg: response?.data?.msg,
        });
        yield put({
          type: actions.API_WARNING,
          data: response?.data,
        });
      }
    } catch (error) {
      if(error?.response?.status === 401){
        yield put({
            type: actions.LOGOUT_SUCCESS
        })
      }
      yield put({
        type: actions.GET_ALL_LOCATION_FAILED,
        msg: error?.response?.msg,
      });
      yield put({
        type: actions.API_FAILED,
        data: error?.response || error,
      });
    }
  }

  function* dispatchCreateLocations(action) {
    try {
      yield put({ type: actions.API_FETCHING });
      const response = yield call(createLocations, action.payload);
  
      if (response?.data?.success) {
        yield put({
          type: actions?.CREATE_LOCATION_SUCCESS,
          data: response?.data,
        });
        if (response?.headers?.istokenrefreshed) {
          yield put({ type: actions.SET_TOKEN_REDUCER });
        }
        yield put({
          type: actions.API_SUCCESS,
          data: response?.data,
        });
      } else {
        yield put({
          type: actions?.CREATE_LOCATION_FAILED,
          msg: response?.data?.msg,
        });
        yield put({
          type: actions.API_WARNING,
          data: response?.data,
        });
      }
    } catch (error) {
      if(error?.response?.status === 401){
        yield put({
            type: actions.LOGOUT_SUCCESS
        })
      }
      yield put({
        type: actions.CREATE_LOCATION_FAILED,
        msg: error?.response?.msg,
      });
      yield put({
        type: actions.API_FAILED,
        data: error?.response || error,
      });
    }
  }
  
  function* dispatchUpdateLocations(action) {
    try {
      yield put({ type: actions.API_FETCHING });
      const response = yield call(updateLocations, action.payload);
  
      if (response?.data?.success) {
        yield put({
          type: actions?.UPDATE_LOCATION_SUCCESS,
          data: response?.data,
        });
        if (response?.headers?.istokenrefreshed) {
          yield put({ type: actions.SET_TOKEN_REDUCER });
        }
        yield put({
          type: actions.API_SUCCESS,
          data: response?.data,
        });
        yield put({
          type: actions.GET_ALL_LOCATION
        })
      } else {
        yield put({
          type: actions?.UPDATE_LOCATION_FAILED,
          msg: response?.data?.msg,
        });
        yield put({
          type: actions.API_WARNING,
          data: response?.data,
        });
      }
    } catch (error) {
      if(error?.response?.status === 401){
        yield put({
            type: actions.LOGOUT_SUCCESS
        })
      }
      yield put({
        type: actions.UPDATE_LOCATION_FAILED,
        msg: error?.response?.msg,
      });
      yield put({
        type: actions.API_FAILED,
        data: error?.response || error,
      });
    }
  }
  
  
  export function* listenGetLocationList() {
    yield takeLatest(actions.GET_ALL_LOCATION, dispatchGetAllLocation);
  }

  export function* listenCreateLocations() {
    yield takeLatest(actions.CREATE_LOCATION, dispatchCreateLocations);
  }
  
  export function* listenUpdateLocations() {
    yield takeLatest(actions.UPDATE_LOCATION, dispatchUpdateLocations);
  }