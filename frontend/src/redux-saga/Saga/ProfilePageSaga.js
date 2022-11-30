import {call,put} from 'redux-saga/effects'
import followerApi from '../../api/followerApi'

import { 
    GetAllFollowersSuccess,GetAllFollowersFailed
} from '../Action/ProfilePageAction'


function* handleGetAllFollowers(action){
    const {payload} = action
    try {
        const result = yield call(followerApi.list,payload)
        yield put(GetAllFollowersSuccess(result))
    } catch (error) {
        yield put(GetAllFollowersFailed(error))
    }
}

export {
    handleGetAllFollowers
}
