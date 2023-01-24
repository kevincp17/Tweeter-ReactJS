import * as ActionType from '../Constant/HomePageConstant'

const INIT_STATE = {
    tweets: [],
    tweet:[],
    tweet_contents:[],

    users:[],
    user:[],

    replies:[],

    likes:[],

    saves:[],

    who_to_follow:[]
}

const HomePageReduce = (state = INIT_STATE, action) => {
    switch (action.type) {
        case ActionType.GET_ALL_TWEETS_REQUEST:
            return { ...state }
        case ActionType.GET_ALL_TWEETS_SUCCESS:
            return GetAllTweetsSucceed(state, action)
        case ActionType.POST_TWEET_REQUEST:
            return { ...state }
        case ActionType.POST_TWEET_SUCCESS:
            return PostTweetSucceed(state, action)
        case ActionType.GET_ALL_REPLIES_REQUEST:
            return { ...state }
        case ActionType.GET_ALL_REPLIES_SUCCESS:
            return GetAllRepliesSucceed(state, action)
        case ActionType.GET_WHO_TO_FOLLOW_REQUEST:
            return { ...state }
        case ActionType.GET_WHO_TO_FOLLOW_SUCCESS:
            return GetWhoToFollowSucceed(state, action)
        case ActionType.GET_ONE_USER_REQUEST:
            return { ...state }
        case ActionType.GET_ONE_USER_SUCCESS:
            return GetOneUserSucceed(state, action)
        case ActionType.ADD_LIKES_REQUEST:
            return { ...state }
        case ActionType.ADD_LIKES_SUCCESS:
            return AddLikeSucceed(state, action)
        case ActionType.UNLIKE_REQUEST:
            return { ...state }
        case ActionType.UNLIKE_SUCCESS:
            return UnlikeSucceed(state, action)
        case ActionType.ADD_SAVE_REQUEST:
            return { ...state }
        case ActionType.ADD_SAVE_SUCCESS:
            return AddSaveSucceed(state, action)
        case ActionType.UNSAVE_REQUEST:
            return { ...state }
        case ActionType.UNSAVE_SUCCESS:
            return UnsaveSucceed(state, action)
        case ActionType.LOGOUT_REQUEST:
            return { ...state }
        case ActionType.LOGOUT_SUCCESS:
            return LogoutSucceed(state, action)
        default:
            return state
    }
}

const GetAllTweetsSucceed = (state, action) => {
    return {
        ...state,
        tweets: action.payload
    }
}

const PostTweetSucceed = (state,action) =>{
    const {payload} = action
    return {
        ...state,
        tweets : [...state.tweets,payload]
    }
}

const GetAllRepliesSucceed = (state, action) => {
    return {
        ...state,
        replies: action.payload
    }
}

const GetWhoToFollowSucceed = (state, action) => {
    return {
        ...state,
        who_to_follow: action.payload
    }
}

const GetOneUserSucceed = (state, action) => {
    return {
        ...state,
        user: action.payload
    }
}

const UnlikeSucceed = (state, action) => {
    const { payload } = action
    const filterLike = state.likes.filter(el => el.tweet_id !== payload && el.user_id !== payload)
    return {
        ...state,
        likes: [...filterLike]
    }
}

const AddLikeSucceed = (state,action) =>{
    const {payload} = action
    return {
        ...state,
        likes : [...state.likes,payload]
    }
}

const UnsaveSucceed = (state, action) => {
    const { payload } = action
    const filterSave = state.saves.filter(el => el.tweet_id !== payload && el.user_id !== payload)
    return {
        ...state,
        saves: [...filterSave]
    }
}
const AddSaveSucceed = (state,action) =>{
    const {payload} = action
    return {
        ...state,
        saves : [...state.saves,payload]
    }
}

const LogoutSucceed = (state, action) => {
    const { payload } = action
    const filterUser = state.users.filter(el => el.user_id !== payload)
    return {
        ...state,
        users: [...filterUser]
    }
}

export default HomePageReduce