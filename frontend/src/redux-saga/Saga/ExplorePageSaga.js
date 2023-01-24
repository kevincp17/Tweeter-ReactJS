import {call,put} from 'redux-saga/effects'
import tweetApi from '../../api/tweetApi'
import followerApi from '../../api/followerApi'

import { 
    GetTopTweetsSuccess,GetTopTweetsFailed,
    GetLatestTweetsSuccess,GetLatestTweetsFailed,
    GetPopularUserSuccess,GetPopularUserFailed
} from '../Action/ExplorePageAction'


function* handleGetTopTweets(){
    try {
        const result = yield call(tweetApi.listTopTweet)
        yield put(GetTopTweetsSuccess(result))
    } catch (error) {
        yield put(GetTopTweetsFailed(error))
    }
}

function* handleGetLatestTweets(){
    try {
        const result = yield call(tweetApi.listLatestTweet)
        yield put(GetLatestTweetsSuccess(result))
    } catch (error) {
        yield put(GetLatestTweetsFailed(error))
    }
}

function* handleGetPopularUser(action){
    const {payload} = action
    try {
        const result = yield call(followerApi.listMostFollower,payload)
        yield put(GetPopularUserSuccess(result))
    } catch (error) {
        yield put(GetPopularUserFailed(error))
    }
}

export {
    handleGetTopTweets,
    handleGetLatestTweets,
    handleGetPopularUser
}
