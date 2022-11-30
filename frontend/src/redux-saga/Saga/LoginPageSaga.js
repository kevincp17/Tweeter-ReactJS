import {call,put} from 'redux-saga/effects'
import userApi from '../../api/userApi'

import { LoginSuccess,LoginFailed,GetOneUserSuccess,GetOneUserFailed,LogoutSuccess,LogoutFailed,RegisterSuccess,RegisterFailed } from '../Action/LoginPageAction'


function* handleLogin(action){
    const {payload} = action
    try {
        const result = yield call(userApi.login,payload)
        yield put(LoginSuccess(result.data))
    } catch (error) {
        yield put(LoginFailed(error))
    }
}

function* handleRegister(action){
    const {payload} = action
    try {
        const result = yield call(userApi.register,payload)
        yield put(RegisterSuccess(result.data))
    } catch (error) {
        yield put(RegisterFailed(error))
    }
}

function* handleGetOneUser(action){
    const {payload} = action
    try {
        const result = yield call(userApi.findOne,payload)
        yield put(GetOneUserSuccess(result))
    } catch (error) {
        yield put(GetOneUserFailed(error))
    }
}

function* handleLogout(action){
    const{payload} = action
    try {
        const result = yield call(userApi.logout,payload)
        yield put(LogoutSuccess(result))
    } catch (error) {
        yield put(LogoutFailed(error))
    }
}

export {
    handleLogin,
    handleRegister,
    handleGetOneUser,
    handleLogout
}
