import {call,put} from 'redux-saga/effects'
import tweetApi from '../../api/tweetApi'

import { 
    GetSavedTweetsSuccess,GetSavedTweetsFailed,
    GetLikedTweetsSuccess,GetLikedTweetsFailed
} from '../Action/BookmarkPageAction'


function* handleGetSavedTweets(action){
    const {payload} = action
    try {
        const result = yield call(tweetApi.findSavedTweet,payload)
        yield put(GetSavedTweetsSuccess(result))
    } catch (error) {
        yield put(GetSavedTweetsFailed(error))
    }
}

function* handleGetLikedTweets(action){
    const {payload} = action
    try {
        const result = yield call(tweetApi.findLikedTweet,payload)
        yield put(GetLikedTweetsSuccess(result))
    } catch (error) {
        yield put(GetLikedTweetsFailed(error))
    }
}

export {
    handleGetSavedTweets,
    handleGetLikedTweets
}
