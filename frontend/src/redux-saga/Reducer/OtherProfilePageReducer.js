import * as ActionType from '../Constant/OtherProfilePageConstant'

const INIT_STATE = {
    user_profile:[]
}

const OtherProfilePageReduce = (state = INIT_STATE, action) => {
    switch (action.type) {
        case ActionType.GET_USER_PROFILE_REQUEST:
            return { ...state }
        case ActionType.GET_USER_PROFILE_SUCCESS:
            return GetUserProfileSucceed(state, action)
        default:
            return state
    }
}

const GetUserProfileSucceed = (state, action) => {
    return {
        ...state,
        user_profile: action.payload
    }
}

export default OtherProfilePageReduce