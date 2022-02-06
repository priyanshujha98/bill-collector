import { call, put, takeLatest } from "redux-saga/effects";
import BillService from "../../services/bill.service";
import actions from "../actions/actions";

const billService = new BillService()

const createBillEntry = async (payload) => {
    try {
        const resposnse = await billService.createBillEntry(payload)
        return resposnse
    } catch (error) {
        throw error
    }
}
const getBill = async (payload) => {
    try {
        const resposnse = await billService.getBill(payload)
        return resposnse
    } catch (error) {
        throw error
    }
}
const getAllBill = async (payload) => {
    try {
        const resposnse = await billService.getAllBill(payload)
        return resposnse
    } catch (error) {
        throw error
    }
}

function* dispatchCreateBillEntry(action) {
    try {
      yield put({ type: actions.API_FETCHING });
      const response = yield call(createBillEntry, action.payload);
  
      if (response?.data?.success) {
        yield put({
          type: actions?.CREATE_BILL_ENTRY_SUCCESS,
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
          type: actions?.CREATE_BILL_ENTRY_FAILED,
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
        type: actions.CREATE_BILL_ENTRY_FAILED,
        msg: error?.response?.msg,
      });
      yield put({
        type: actions.API_FAILED,
        data: error?.response || error,
      });
    }
  }

  function* dispatchGetBillEntry(action) {
    try {
      yield put({ type: actions.API_FETCHING });
      const response = yield call(getBill, action.payload);
  
      if (response?.data?.success) {
        yield put({
          type: actions?.GET_CREATED_BILL_SUCCESS,
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
          type: actions?.GET_CREATED_BILL_FAILED,
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
        type: actions.GET_CREATED_BILL_FAILED,
        msg: error?.response?.msg,
      });
      yield put({
        type: actions.API_FAILED,
        data: error?.response || error,
      });
    }
  }
  function* dispatchGetAllBillEntry(action) {
    try {
      yield put({ type: actions.API_FETCHING });
      const response = yield call(getAllBill, action.payload);
  
      if (response?.data?.success) {
        yield put({
          type: actions?.GET_ALL_BILL_SUCCESS,
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
          type: actions?.GET_ALL_BILL_FAILED,
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
        type: actions.GET_ALL_BILL_FAILED,
        msg: error?.response?.msg,
      });
      yield put({
        type: actions.API_FAILED,
        data: error?.response || error,
      });
    }
  }
  
  
  export function* listenCreateBillEntry() {
    yield takeLatest(actions.CREATE_BILL_ENTRY, dispatchCreateBillEntry);
  }

  export function* listenGetBillEntry() {
    yield takeLatest(actions.GET_CREATED_BILL, dispatchGetBillEntry);
  }

  export function* listenGetAllBillEntry() {
    yield takeLatest(actions.GET_ALL_BILL, dispatchGetAllBillEntry);
  }
