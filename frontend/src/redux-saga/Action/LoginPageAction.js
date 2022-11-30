import * as ActionType from '../Constant/LoginPageConstant'

export const LoginRequest = (payload) => ({
    type : ActionType.LOGIN_REQUEST,
    payload
})

export const LoginSuccess = (payload) => ({
    type : ActionType.LOGIN_SUCCESS,
    payload
})

export const LoginFailed = (payload) => ({
    type : ActionType.LOGIN_FAILED,
    payload
})

export const RegisterRequest = (payload) => ({
    type : ActionType.REGISTER_REQUEST,
    payload
})

export const RegisterSuccess = (payload) => ({
    type : ActionType.REGISTER_SUCCESS,
    payload
})

export const RegisterFailed = (payload) => ({
    type : ActionType.REGISTER_FAILED,
    payload
})

export const GetOneUserRequest = (payload) => ({
    type : ActionType.GET_ONE_USER_REQUEST,
    payload
})

export const GetOneUserSuccess = (payload) => ({
    type : ActionType.GET_ONE_USER_SUCCESS,
    payload
})

export const GetOneUserFailed = (payload) => ({
    type : ActionType.GET_ONE_USER_FAILED,
    payload
})

export const LogoutRequest = (payload) => ({
    type : ActionType.LOGOUT_REQUEST,
    payload
})

export const LogoutSuccess = (payload) => ({
    type : ActionType.LOGOUT_SUCCESS,
    payload
})

export const LogoutFailed = (payload) => ({
    type : ActionType.LOGOUT_FAILED,
    payload
})



