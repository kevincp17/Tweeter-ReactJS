import {call,put} from 'redux-saga/effects'
import tweetApi from '../../api/tweetApi'
import userApi from '../../api/userApi'
import replyApi from '../../api/replyApi'
import likeApi from '../../api/likeApi'
import saveApi from '../../api/saveApi'
import followerApi from '../../api/followerApi'

import { 
    GetAllTweetsSuccess,GetAllTweetsFailed,
    PostTweetSuccess,PostTweetFailed,
    GetOneUserSuccess,GetOneUserFailed,
    GetAllRepliesSuccess,GetAllRepliesFailed,
    GetWhoToFollowSuccess,GetWhoToFollowFailed,
    AddLikeSuccess,AddLikeFailed,
    UnlikeSuccess,UnlikeFailed ,
    AddSaveSuccess,AddSaveFailed,
    UnsaveSuccess,UnsaveFailed
} from '../Action/HomePageActions'


function* handleGetAllTweets(){
    try {
        const result = yield call(tweetApi.list)
        yield put(GetAllTweetsSuccess(result))
    } catch (error) {
        yield put(GetAllTweetsFailed(error))
    }
}

function* handlePostTweet(action){
    const {payload} = action
    try {
        const result = yield call(tweetApi.postTweet,payload)
        yield put(PostTweetSuccess(result.data))
    } catch (error) {
        yield put(PostTweetFailed(error))
    }
}

function* handleGetAllReplies(){
    try {
        const result = yield call(replyApi.list)
        yield put(GetAllRepliesSuccess(result))
    } catch (error) {
        yield put(GetAllRepliesFailed(error))
    }
}

function* handleGetWhoToFollow(action){
    const {payload} = action
    try {
        const result = yield call(followerApi.listWhoToFollow,payload)
        yield put(GetWhoToFollowSuccess(result))
    } catch (error) {
        yield put(GetWhoToFollowFailed(error))
    }
}

function* handleGetOneUser(){
    try {
        const result = yield call(userApi.findOne)
        yield put(GetOneUserSuccess(result))
    } catch (error) {
        yield put(GetOneUserFailed(error))
    }
}

function* handleAddLike(action){
    const {payload} = action
    try {
        const result = yield call(likeApi.create,payload)
        yield put(AddLikeSuccess(result.data))
    } catch (error) {
        yield put(AddLikeFailed(error))
    }
}

function* handleUnlike(action){
    const{payload} = action
    try {
        const result = yield call(likeApi.deleted,payload.tweet_id,payload.user_id)
        yield put(UnlikeSuccess(result))
    } catch (error) {
        yield put(UnlikeFailed(error))
    }
}

function* handleAddSave(action){
    const {payload} = action
    try {
        const result = yield call(saveApi.create,payload)
        yield put(AddSaveSuccess(result.data))
    } catch (error) {
        yield put(AddSaveFailed(error))
    }
}

function* handleUnsave(action){
    const {payload} = action
    try {
        const result = yield call(saveApi.deleted,payload.tweet_id,payload.user_id)
        yield put(UnsaveSuccess(result))
    } catch (error) {
        yield put(UnsaveFailed(error))
    }
}

export {
    handleGetAllTweets,
    handlePostTweet,
    handleGetOneUser,
    handleGetAllReplies,
    handleGetWhoToFollow,
    handleAddLike,
    handleUnlike,
    handleAddSave,
    handleUnsave
}
