import * as ActionType from '../Constant/LoginPageConstant'

const INIT_STATE = {
    users:[],
    user:[],
    isLoggedIn:false,
    userId:null
}

const LoginPageReduce = (state = INIT_STATE, action) => {
    switch (action.type) {
        case ActionType.LOGIN_REQUEST:
            return { ...state }
        case ActionType.LOGIN_SUCCESS:
            return LoginSucceed(state, action)
        case ActionType.REGISTER_REQUEST:
            return { ...state }
        case ActionType.REGISTER_SUCCESS:
            return RegisterSucceed(state, action)
        case ActionType.GET_ONE_USER_REQUEST:
            return { ...state }
        case ActionType.GET_ONE_USER_SUCCESS:
            return GetOneUserSucceed(state, action)
        case ActionType.LOGOUT_REQUEST:
            return { ...state }
        case ActionType.LOGOUT_SUCCESS:
            return LogoutSucceed(state, action)
        default:
            return state
    }
}

const LoginSucceed = (state, action) => {
    const {payload} = action
    sessionStorage.setItem('isLoggedIn',true)
    sessionStorage.setItem('userId',true)
    return {
        ...state,
        users : [...state.users,payload],
        isLoggedIn:sessionStorage.getItem('isLoggedIn')
    }
}

const RegisterSucceed = (state, action) => {
    const {payload} = action
    return {
        ...state,
        users : [...state.users,payload]
    }
}

const GetOneUserSucceed = (state, action) => {
    return {
        ...state,
        user: action.payload
    }
}

const LogoutSucceed = (state, action) => {
    const { payload } = action
    const filterUser = state.users.filter(el => el.user_id !== payload)
    sessionStorage.setItem('isLoggedIn',false)
    return {
        ...state,
        users: [...filterUser],
        isLoggedIn: sessionStorage.getItem('isLoggedIn')
    }
}

export default LoginPageReduce