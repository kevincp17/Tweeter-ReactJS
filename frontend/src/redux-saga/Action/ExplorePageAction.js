import * as ActionType from '../Constant/ExplorePageConstant'

export const GetPopularUserRequest = (payload) => ({
    type : ActionType.GET_POPULAR_USER_REQUEST,
    payload
})

export const GetPopularUserSuccess = (payload) => ({
    type : ActionType.GET_POPULAR_USER_SUCCESS,
    payload
})

export const GetPopularUserFailed = (payload) => ({
    type : ActionType.GET_POPULAR_USER_FAILED,
    payload
})

export const GetTopTweetsRequest = () => ({
    type : ActionType.GET_TOP_TWEETS_REQUEST
})

export const GetTopTweetsSuccess = (payload) => ({
    type : ActionType.GET_TOP_TWEETS_SUCCESS,
    payload
})

export const GetTopTweetsFailed = (payload) => ({
    type : ActionType.GET_TOP_TWEETS_FAILED,
    payload
})

//Latest Tweet
export const GetLatestTweetsRequest = () => ({
    type : ActionType.GET_LATEST_TWEETS_REQUEST
})

export const GetLatestTweetsSuccess = (payload) => ({
    type : ActionType.GET_LATEST_TWEETS_SUCCESS,
    payload
})

export const GetLatestTweetsFailed = (payload) => ({
    type : ActionType.GET_LATEST_TWEETS_FAILED,
    payload
})