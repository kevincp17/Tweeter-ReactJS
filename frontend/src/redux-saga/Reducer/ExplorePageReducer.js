import * as ActionType from '../Constant/ExplorePageConstant'

const INIT_STATE = {
    top_tweets:[],

    latest_tweets:[],

}

const ExplorePageReduce = (state = INIT_STATE, action) => {
    switch (action.type) {
        case ActionType.GET_TOP_TWEETS_REQUEST:
            return { ...state }
        case ActionType.GET_TOP_TWEETS_SUCCESS:
            return GetTopTweetsSucceed(state, action)
        case ActionType.GET_LATEST_TWEETS_REQUEST:
            return { ...state }
        case ActionType.GET_LATEST_TWEETS_SUCCESS:
            return GetLatestTweetsSucceed(state, action)
        default:
            return state
    }
}

const GetTopTweetsSucceed = (state, action) => {
    return {
        ...state,
        top_tweets: action.payload
    }
}

const GetLatestTweetsSucceed = (state, action) => {
    return {
        ...state,
        latest_tweets: action.payload
    }
}

export default ExplorePageReduce