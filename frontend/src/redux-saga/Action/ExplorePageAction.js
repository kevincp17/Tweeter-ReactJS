import * as ActionType from '../Constant/ExplorePageConstant'

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