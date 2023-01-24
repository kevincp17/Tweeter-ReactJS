import * as ActionType from '../Constant/BookmarkPageConstant'

const INIT_STATE = {
    saved_tweets:[],
    liked_tweets:[],
}

const BookmarkPageReduce = (state = INIT_STATE, action) => {
    switch (action.type) {
        case ActionType.GET_SAVED_TWEETS_REQUEST:
            return { ...state }
        case ActionType.GET_SAVED_TWEETS_SUCCESS:
            return GetSavedTweetsSucceed(state, action)
        case ActionType.GET_LIKED_TWEETS_REQUEST:
            return { ...state }
        case ActionType.GET_LIKED_TWEETS_SUCCESS:
            return GetLikedTweetsSucceed(state, action)
        default:
            return state
    }
}

const GetSavedTweetsSucceed = (state, action) => {
    return {
        ...state,
        saved_tweets: action.payload
    }
}

const GetLikedTweetsSucceed = (state, action) => {
    return {
        ...state,
        liked_tweets: action.payload
    }
}

export default BookmarkPageReduce