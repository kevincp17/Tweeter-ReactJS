import {call,put} from 'redux-saga/effects'
import tweetApi from '../../api/tweetApi'

import { 
    GetUserProfileSuccess,GetUserProfileFailed
} from '../Action/OtherProfilePageAction'


function* handleGetUserProfile(action){
    const {payload} = action
    try {
        const result = yield call(tweetApi.findProfile,payload)
        yield put(GetUserProfileSuccess(result))
    } catch (error) {
        yield put(GetUserProfileFailed(error))
    }
}

export {
    handleGetUserProfile
}
