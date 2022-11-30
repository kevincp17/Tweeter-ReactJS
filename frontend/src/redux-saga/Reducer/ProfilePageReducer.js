import * as ActionType from '../Constant/ProfilePageConstant'

const INIT_STATE = {
    followers:[]
}

const ProfilePageReduce = (state = INIT_STATE, action) => {
    switch (action.type) {
        case ActionType.GET_ALL_FOLLOWERS_REQUEST:
            return { ...state }
        case ActionType.GET_ALL_FOLLOWERS_SUCCESS:
            return GetAllFollowersSucceed(state, action)
        default:
            return state
    }
}

const GetAllFollowersSucceed = (state, action) => {
    return {
        ...state,
        followers: action.payload
    }
}

export default ProfilePageReduce