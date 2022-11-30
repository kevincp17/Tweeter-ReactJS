import {call,put} from 'redux-saga/effects'
import tweetApi from '../../api/tweetApi'
import userApi from '../../api/userApi'
import replyApi from '../../api/replyApi'
import likeApi from '../../api/likeApi'
import saveApi from '../../api/saveApi'

import { 
    GetAllTweetsSuccess,GetAllTweetsFailed,
    GetOneUserSuccess,GetOneUserFailed,
    GetAllRepliesSuccess,GetAllRepliesFailed,
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

function* handleGetAllReplies(){
    try {
        const result = yield call(replyApi.list)
        yield put(GetAllRepliesSuccess(result))
    } catch (error) {
        yield put(GetAllRepliesFailed(error))
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
    handleGetOneUser,
    handleGetAllReplies,
    handleAddLike,
    handleUnlike,
    handleAddSave,
    handleUnsave
}
