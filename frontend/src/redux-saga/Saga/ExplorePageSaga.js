import {call,put} from 'redux-saga/effects'
import tweetApi from '../../api/tweetApi'

import { 
    GetTopTweetsSuccess,GetTopTweetsFailed,
    GetLatestTweetsSuccess,GetLatestTweetsFailed
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

export {
    handleGetTopTweets,
    handleGetLatestTweets
}
