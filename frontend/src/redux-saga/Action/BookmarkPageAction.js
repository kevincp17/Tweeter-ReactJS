import * as ActionType from '../Constant/BookmarkPageConstant'

export const GetSavedTweetsRequest = (payload) => ({
    type : ActionType.GET_SAVED_TWEETS_REQUEST,
    payload
})

export const GetSavedTweetsSuccess = (payload) => ({
    type : ActionType.GET_SAVED_TWEETS_SUCCESS,
    payload
})

export const GetSavedTweetsFailed = (payload) => ({
    type : ActionType.GET_SAVED_TWEETS_FAILED,
    payload
})

export const GetLikedTweetsRequest = (payload) => ({
    type : ActionType.GET_LIKED_TWEETS_REQUEST,
    payload
})

export const GetLikedTweetsSuccess = (payload) => ({
    type : ActionType.GET_LIKED_TWEETS_SUCCESS,
    payload
})

export const GetLikedTweetsFailed = (payload) => ({
    type : ActionType.GET_LIKED_TWEETS_FAILED,
    payload
})
