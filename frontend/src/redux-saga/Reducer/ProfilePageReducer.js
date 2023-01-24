import { GetAllFollowingSuccess } from '../Action/ProfilePageAction'
import * as ActionType from '../Constant/ProfilePageConstant'

const INIT_STATE = {
    posts:[],
    followers:[],
    followings:[],
}

const ProfilePageReduce = (state = INIT_STATE, action) => {
    switch (action.type) {
        case ActionType.GET_OWN_TWEETS_REQUEST:
            return { ...state }
        case ActionType.GET_OWN_TWEETS_SUCCESS:
            return GetOwnTweetsSucceed(state, action)
        case ActionType.GET_ALL_FOLLOWERS_REQUEST:
            return { ...state }
        case ActionType.GET_ALL_FOLLOWERS_SUCCESS:
            return GetAllFollowersSucceed(state, action)
        case ActionType.GET_ALL_FOLLOWING_REQUEST:
            return { ...state }
        case ActionType.GET_ALL_FOLLOWING_SUCCESS:
            return GetAllFollowingSucceed(state, action)
        default:
            return state
    }
}

const GetOwnTweetsSucceed = (state, action) => {
    return {
        ...state,
        posts: action.payload
    }
}

const GetAllFollowersSucceed = (state, action) => {
    return {
        ...state,
        followers: action.payload
    }
}

const GetAllFollowingSucceed = (state, action) => {
    return {
        ...state,
        followings: action.payload
    }
}

export default ProfilePageReduce