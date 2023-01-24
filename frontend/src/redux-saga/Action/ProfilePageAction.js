import * as ActionType from '../Constant/ProfilePageConstant'

export const GetOwnTweetsRequest = (payload) => ({
    type : ActionType.GET_OWN_TWEETS_REQUEST,
    payload
})

export const GetOwnTweetsSuccess = (payload) => ({
    type : ActionType.GET_OWN_TWEETS_SUCCESS,
    payload
})

export const GetOwnTweetsFailed = (payload) => ({
    type : ActionType.GET_OWN_TWEETS_FAILED,
    payload
})

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

export const GetAllFollowingRequest = (payload) => ({
    type : ActionType.GET_ALL_FOLLOWING_REQUEST,
    payload
})

export const GetAllFollowingSuccess = (payload) => ({
    type : ActionType.GET_ALL_FOLLOWING_SUCCESS,
    payload
})

export const GetAllFollowingFailed = (payload) => ({
    type : ActionType.GET_ALL_FOLLOWING_FAILED,
    payload
})