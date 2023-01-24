import {call,put} from 'redux-saga/effects'
import followerApi from '../../api/followerApi'
import tweetApi from '../../api/tweetApi'

import { 
    GetAllFollowersSuccess,GetAllFollowersFailed,
    GetAllFollowingSuccess,GetAllFollowingFailed,
    GetOwnTweetsSuccess,GetOwnTweetsFailed
} from '../Action/ProfilePageAction'

function* handleGetOwnTweets(action){
    const {payload} = action
    try {
        const result = yield call(tweetApi.findOwnTweet,payload)
        yield put(GetOwnTweetsSuccess(result))
    } catch (error) {
        yield put(GetOwnTweetsFailed(error))
    }
}

function* handleGetAllFollowers(action){
    const {payload} = action
    try {
        const result = yield call(followerApi.list,payload)
        yield put(GetAllFollowersSuccess(result))
    } catch (error) {
        yield put(GetAllFollowersFailed(error))
    }
}

function* handleGetAllFollowing(action){
    const {payload} = action
    try {
        const result = yield call(followerApi.listFollowing,payload)
        yield put(GetAllFollowingSuccess(result))
    } catch (error) {
        yield put(GetAllFollowingFailed(error))
    }
}

export {
    handleGetOwnTweets,
    handleGetAllFollowers,
    handleGetAllFollowing
}
