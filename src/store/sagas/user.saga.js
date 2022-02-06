import { call, put, takeLatest } from "redux-saga/effects";
import LoginService from "../../services/login.service";
import UserService from "../../services/user.service";
import actions from "../actions/actions";

const userService = new UserService();
const loginService = new LoginService()
const getUserList = async ({ searchKey, pageNo, sort, sortBy, limit }, conditions) => {
  try {
    const response = await userService.getUserList(
      searchKey,
      pageNo,
      sort,
      sortBy,
      limit,
      conditions
    );
    return response;
  } catch (error) {
    throw error;
  }
};

const activateDeactivateAdmin = async (id, payload) => {
  try {
    const response = await userService.updateAdminById(id, payload);
    return response;
  } catch (error) {
    throw error;
  }
};

const deleteAdmin = async (id) => {
  try {
    const response = await userService.deleteAdminById(id);
    return response;
  } catch (error) {
    throw error;
  }
};

const addAdmin = async(payload) => {
  try {
    const response  = await userService.addAdmin(payload)
    return response
  } catch (error) {
    throw error
  }
}

const postVerifyCodeRoom = async (payload) => {
  try {
      const response = await loginService.verifyCode(payload)
      return response
  } catch (error) {
      throw error
  }
}

const getAdminById = async (id) => {
  try {
      const response = await userService.getAdminById(id)
      return response
  } catch (error) {
      throw error
  }
}

const updateAdmin = async (id,payload) => {
  try {
      const response = await userService.updateAdminById(id,payload)
      return response
  } catch (error) {
      throw error
  }
}

function* dispatchGetUserList(action) {
  try {
    yield put({ type: actions.API_FETCHING });
    const response = yield call(getUserList, action.payload);

    if (response?.data?.success) {
      yield put({
        type: actions?.GET_USER_LIST_SUCCESS,
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
        type: actions?.GET_USER_LIST_FAILED,
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
      type: actions.GET_USER_LIST_FAILED,
      msg: error?.response?.msg,
    });
    yield put({
      type: actions.API_FAILED,
      data: error?.response || error,
    });
  }
}

function* dispatchActivateDeactivateAdminById(action) {
  try {
    yield put({ type: actions.API_FETCHING });
    const response = yield call(
      activateDeactivateAdmin,
      action.id,
      action.payload
    );

    if (response?.data?.success) {
      yield put({
        type: actions?.ACTIVATE_DEACTIVATE_ADMIN_SUCCESS,
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
        type: actions?.ACTIVATE_DEACTIVATE_ADMIN_FAILED,
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
      type: actions.ACTIVATE_DEACTIVATE_ADMIN_FAILED,
      msg: error?.response?.msg,
    });
    yield put({
      type: actions.API_FAILED,
      data: error?.response || error,
    });
  }
}

function* dispatchDeleteAdmin(action) {
  try {
    yield put({ type: actions.API_FETCHING });
    const response = yield call(deleteAdmin, action.id);

    if (response?.data?.success) {
      yield put({
        type: actions?.DELETE_ADMIN_SUCCESS,
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
        type: actions?.DELETE_ADMIN_FAILED,
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
      type: actions.DELETE_ADMIN_FAILED,
      msg: error?.response?.msg,
    });
    yield put({
      type: actions.API_FAILED,
      data: error?.response || error,
    });
  }
}

function* dispatchAddAdmin(action) {
  try {
    yield put({ type: actions.API_FETCHING });
    const response = yield call(addAdmin, action.payload);

    if (response?.data?.success) {
      yield put({
        type: actions?.ADD_ADMIN_SUCCESS,
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
        type: actions?.ADD_ADMIN_FAILED,
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
      type: actions.ADD_ADMIN_FAILED,
      msg: error?.response?.msg,
    });
    yield put({
      type: actions.API_FAILED,
      data: error?.response || error,
    });
  }
}

function* dispatchCodeVerifyRoom(action) {
  try {
      yield put({type: actions.API_FETCHING})
      const response = yield call(postVerifyCodeRoom, action.payload)
      if(response?.data?.success){
          yield put({
              type: actions.CODE_VERIFICATION_ROOM_SUCCESS,
              data: response?.data
          })
          yield put({
              type: actions.API_SUCCESS,
              data: response?.data
          })
      }else{
          yield put({
              type: actions.CODE_VERIFICATION_ROOM_FAILED,
              msg: response?.data?.msg
          })
          yield put({
              type: actions.API_WARNING,
              data: response?.data
          })
      }
  } catch (error) {
      yield put({
          type: actions.CODE_VERIFICATION_ROOM_FAILED,
          msg: error?.response?.msg
      })
      yield put({
          type: actions.API_FAILED,
          data: error?.response || error
      })
      
  }
}

function* dispatchGetAdminById(action) {
  try {
    yield put({ type: actions.API_FETCHING });
    const response = yield call(getAdminById, action.id);

    if (response?.data?.success) {
      yield put({
        type: actions?.GET_ADMIN_BY_ID_SUCCESS,
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
        type: actions?.GET_ADMIN_BY_ID_FAILED,
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
      type: actions.GET_ADMIN_TYPE_FAILED,
      msg: error?.response?.msg,
    });
    yield put({
      type: actions.API_FAILED,
      data: error?.response || error,
    });
  }
}

function* dispatchUpdateAdmin(action) {
  try {
    yield put({ type: actions.API_FETCHING });
    const response = yield call(updateAdmin, action.id,action.payload);

    if (response?.data?.success) {
      yield put({
        type: actions?.UPDATE_ADMIN_SUCCESS,
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
        type: actions?.UPDATE_ADMIN_FAILED,
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
      type: actions.UPDATE_ADMIN_FAILED,
      msg: error?.response?.msg,
    });
    yield put({
      type: actions.API_FAILED,
      data: error?.response || error,
    });
  }
}


export function* listenGetUserList() {
  yield takeLatest(actions.GET_USER_LIST, dispatchGetUserList);
}

export function* listenActivateDeactivateAdminById() {
  yield takeLatest(
    actions.ACTIVATE_DEACTIVATE_ADMIN,
    dispatchActivateDeactivateAdminById
  );
}

export function* listenDeleteAdmin() {
  yield takeLatest(actions.DELETE_ADMIN, dispatchDeleteAdmin);
}

export function* listenAddAdmin() {
  yield takeLatest(actions.ADD_ADMIN, dispatchAddAdmin)
}

export function* listenCodeVerifyRooms() {
  yield takeLatest(actions.CODE_VERIFICATION_ROOM, dispatchCodeVerifyRoom)
}

export function* listenGetAdminById() {
  yield takeLatest(actions.GET_ADMIN_BY_ID, dispatchGetAdminById)
}

export function* listenUpdateAdmin() {
  yield takeLatest(actions.UPDATE_ADMIN, dispatchUpdateAdmin)
}
