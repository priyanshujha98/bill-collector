import { call, put, takeLatest } from "redux-saga/effects";
import LoginService from "../../services/login.service";
import Utils from "../../Utils/Utils";
import actions from "../actions/actions";

const loginService = new LoginService()

const getLogin = async (payload)=>{
    try {
        const response = await loginService.getLogin(payload)
        return response 
    } catch (error) {
        throw error
    }
}

const getUserProfile = async(payload)=>{
    try {
        const response = await loginService.getUserProfile({token: payload})
        return response
    } catch (error) {
        throw error
    }
}


const postVerifyCode = async (payload) => {
    try {
        const response = await loginService.verifyCode(payload)
        return response
    } catch (error) {
        throw error
    }
}

const postConfirmCodeVerify = async (payload) => {
    try {
        const response = await loginService.confirmCodeVerify(payload)
        return response
    } catch (error) {
        throw error
    }
}

const postEmailSent = async (payload) => {
    try {
        const response = await loginService.emailSent(payload)
        return response
    } catch (error) {
        throw error
    }
}


function* dispatchLogin(action) {
    try {
        yield put({type: actions.API_FETCHING})
        const response = yield call(getLogin, action?.payload)
        if(response?.data?.success){
            Utils.storeTokenLocal(response?.data?.data)
            yield put({
                type: actions.LOGIN_SUCCESS,
                data: response?.data
            })
            yield put({
                type: actions.API_SUCCESS,
                data: response?.data
            })
        }else{
            yield put({
                type: actions.LOGIN_FALIED,
                msg: response?.data?.msg
            })
            yield put({
                type: actions.API_WARNING,
                data: response?.data
            })
        }
    } catch (error) {
        yield put({
            type: actions.LOGIN_FALIED,
            msg: error?.response?.msg
        })
        yield put({
            type: actions.API_FAILED,
            data: error?.response || error
        })
        
    }
}

function* dispatchGetUserProfile(action) {
    try {
        yield put({type: actions.API_FETCHING})
        const response = yield call(getUserProfile, localStorage.getItem("AccessToken"))
        if(response?.data?.success){
            yield put({
                type: actions.GET_USER_PROFILE_SUCCESS,
                data: response?.data
            })
            if(response?.headers?.istokenrefreshed){
                yield put({type:actions.SET_TOKEN_REDUCER})
            }
            yield put({
                type: actions.API_SUCCESS,
                data: response?.data
            })
        }else{
            yield put({
                type: actions.GET_USER_PROFILE_FAILED,
                msg: response?.data?.msg
            })
            yield put({
                type: actions.API_WARNING,
                data: response?.data
            })
        }
    } catch (error) {
        if(error?.response?.status === 401){
            yield put({
                type: actions.LOGOUT_SUCCESS
            })
        }
        
        yield put({
            type: actions.GET_USER_PROFILE_FAILED,
            msg: error?.response?.msg
        })
        yield put({
            type: actions.API_FAILED,
            data: error?.response || error
        })
        
    }
}


function* dispatchCodeVerify(action) {
    try {
        yield put({type: actions.API_FETCHING})
        const response = yield call(postVerifyCode, action.payload)
        if(response?.data?.success){
            yield put({
                type: actions.CODE_VERIFICATION_SUCCESS,
                data: response?.data
            })
            yield put({
                type: actions.API_SUCCESS,
                data: response?.data
            })
        }else{
            yield put({
                type: actions.CODE_VERIFICATION_FAILED,
                msg: response?.data?.msg
            })
            yield put({
                type: actions.API_WARNING,
                data: response?.data
            })
        }
    } catch (error) {
        yield put({
            type: actions.CODE_VERIFICATION_FAILED,
            msg: error?.response?.msg
        })
        yield put({
            type: actions.API_FAILED,
            data: error?.response || error
        })
        
    }
}

function* dispatchConfirmCodeVerify(action) {
    try {
        yield put({type: actions.API_FETCHING})
        const response = yield call(postConfirmCodeVerify, action.payload)
        if(response?.data?.success){
            yield put({
                type: actions.CODE_CONFIRMATION_SUCCESS,
                data: response?.data
            })
            yield put({
                type: actions.API_SUCCESS,
                data: response?.data
            })
        }else{
            yield put({
                type: actions.CODE_CONFIRMATION_FAILED,
                msg: response?.data?.msg
            })
            yield put({
                type: actions.API_WARNING,
                data: response?.data
            })
        }
    } catch (error) {
        yield put({
            type: actions.CODE_CONFIRMATION_FAILED,
            msg: error?.response?.msg
        })
        yield put({
            type: actions.API_FAILED,
            data: error?.response || error
        })
        
    }
}

function* dispatchEmailSent(action) {
    try {
        yield put({type: actions.API_FETCHING})
        const response = yield call(postEmailSent, action.payload)
        if(response?.data?.success){
            yield put({
                type: actions.EMAIL_CODE_SENT_SUCCESS,
                data: response?.data
            })
            yield put({
                type: actions.API_SUCCESS,
                data: response?.data
            })
        }else{
            yield put({
                type: actions.EMAIL_CODE_SENT_FAILED,
                msg: response?.data?.msg
            })
            yield put({
                type: actions.API_WARNING,
                data: response?.data
            })
        }
    } catch (error) {
        yield put({
            type: actions.EMAIL_CODE_SENT_FAILED,
            msg: error?.response?.msg
        })
        yield put({
            type: actions.API_FAILED,
            data: error?.response || error
        })
        
    }
}

export function* listenLogin() {
    yield takeLatest(actions.LOGIN, dispatchLogin)
}

export function* listenGetUserProfile() {
    yield takeLatest(actions.GET_USER_PROFILE, dispatchGetUserProfile)
}


export function* listenCodeVerify() {
    yield takeLatest(actions.CODE_VERIFICATION, dispatchCodeVerify)
}

export function* listenConfirmCodeVerify() {
    yield takeLatest(actions.CODE_CONFIRMATION, dispatchConfirmCodeVerify)
} 

export function* listenEmailSent() {
    yield takeLatest(actions.EMAIL_CODE_SENT, dispatchEmailSent)
} 
