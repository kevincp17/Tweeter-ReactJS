import * as ActionType from '../Constant/HomePageConstant'

export const GetAllTweetsRequest = () => ({
    type : ActionType.GET_ALL_TWEETS_REQUEST
})

export const GetAllTweetsSuccess = (payload) => ({
    type : ActionType.GET_ALL_TWEETS_SUCCESS,
    payload
})

export const GetAllTweetsFailed = (payload) => ({
    type : ActionType.GET_ALL_TWEETS_FAILED,
    payload
})

export const GetAllRepliesRequest = () => ({
    type : ActionType.GET_ALL_REPLIES_REQUEST
})

export const GetAllRepliesSuccess = (payload) => ({
    type : ActionType.GET_ALL_REPLIES_SUCCESS,
    payload
})

export const GetAllRepliesFailed = (payload) => ({
    type : ActionType.GET_ALL_REPLIES_FAILED,
    payload
})

export const GetOneUserRequest = () => ({
    type : ActionType.GET_ONE_USER_REQUEST
})

export const GetOneUserSuccess = (payload) => ({
    type : ActionType.GET_ONE_USER_SUCCESS,
    payload
})

export const GetOneUserFailed = (payload) => ({
    type : ActionType.GET_ONE_USER_FAILED,
    payload
})

export const AddLikeRequest = (payload) => ({
    type:ActionType.ADD_LIKES_REQUEST,
    payload
})

export const AddLikeSuccess = (payload) => ({
    type:ActionType.ADD_LIKES_SUCCESS,
    payload
})

export const AddLikeFailed = (payload) =>({
    type : ActionType.ADD_LIKES_FAILED,
    payload
})

export const UnlikeRequest = (payload) => ({
    type:ActionType.UNLIKE_REQUEST,
    payload
})

export const UnlikeSuccess = (payload) => ({
    type:ActionType.UNLIKE_SUCCESS,
    payload
})

export const UnlikeFailed = (payload) =>({
    type : ActionType.UNLIKE_FAILED,
    payload
})

export const AddSaveRequest = (payload) => ({
    type:ActionType.ADD_SAVE_REQUEST,
    payload
})

export const AddSaveSuccess = (payload) => ({
    type:ActionType.ADD_SAVE_SUCCESS,
    payload
})

export const AddSaveFailed = (payload) =>({
    type : ActionType.ADD_SAVE_FAILED,
    payload
})

export const UnsaveRequest = (payload) => ({
    type:ActionType.UNSAVE_REQUEST,
    payload
})

export const UnsaveSuccess = (payload) => ({
    type:ActionType.UNSAVE_SUCCESS,
    payload
})

export const UnsaveFailed = (payload) =>({
    type : ActionType.UNSAVE_FAILED,
    payload
})

export const LogoutRequest = () => ({
    type : ActionType.LOGOUT_REQUEST
})

export const LogoutSuccess = (payload) => ({
    type : ActionType.LOGOUT_SUCCESS,
    payload
})

export const LogoutFailed = (payload) => ({
    type : ActionType.LOGOUT_FAILED,
    payload
})

