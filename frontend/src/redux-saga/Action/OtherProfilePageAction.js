import * as ActionType from '../Constant/OtherProfilePageConstant'

export const GetUserProfileRequest = (payload) => ({
    type : ActionType.GET_USER_PROFILE_REQUEST,
    payload
})

export const GetUserProfileSuccess = (payload) => ({
    type : ActionType.GET_USER_PROFILE_SUCCESS,
    payload
})

export const GetUserProfileFailed = (payload) => ({
    type : ActionType.GET_USER_PROFILE_FAILED,
    payload
})