import * as ActionType from '../Constant/ProfilePageConstant'

export const GetAllFollowersRequest = (payload) => ({
    type : ActionType.GET_ALL_FOLLOWERS_REQUEST,
    payload
})

export const GetAllFollowersSuccess = (payload) => ({
    type : ActionType.GET_ALL_FOLLOWERS_SUCCESS,
    payload
})

export const GetAllFollowersFailed = (payload) => ({
    type : ActionType.GET_ALL_FOLLOWERS_FAILED,
    payload
})