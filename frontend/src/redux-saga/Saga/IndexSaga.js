import { takeEvery, all } from "redux-saga/effects";
import * as ActionTypeHomePage from "../Constant/HomePageConstant";
import * as ActionTypeLoginPage from "../Constant/LoginPageConstant";
import * as ActionTypeProfilePage from "../Constant/ProfilePageConstant";
import * as ActionTypeExplorePage from "../Constant/ExplorePageConstant";

import {
  handleGetAllTweets,handleGetAllReplies,
  handleAddLike,handleUnlike,
  handleAddSave,handleUnsave
} from './HomePageSaga'
import {handleLogin,handleRegister,handleGetOneUser,handleLogout} from './LoginPageSaga'
import {handleGetAllFollowers} from './ProfilePageSaga'
import {handleGetTopTweets,handleGetLatestTweets} from './ExplorePageSaga'

function* watchAll() {
  yield all([
    takeEvery(ActionTypeHomePage.GET_ALL_TWEETS_REQUEST, handleGetAllTweets),
    takeEvery(ActionTypeHomePage.GET_ALL_REPLIES_REQUEST, handleGetAllReplies),
    takeEvery(ActionTypeHomePage.ADD_LIKES_REQUEST, handleAddLike),
    takeEvery(ActionTypeHomePage.UNLIKE_REQUEST, handleUnlike),
    takeEvery(ActionTypeHomePage.ADD_SAVE_REQUEST, handleAddSave),
    takeEvery(ActionTypeHomePage.UNSAVE_REQUEST, handleUnsave),

    takeEvery(ActionTypeLoginPage.LOGIN_REQUEST, handleLogin),
    takeEvery(ActionTypeLoginPage.REGISTER_REQUEST, handleRegister),
    takeEvery(ActionTypeLoginPage.GET_ONE_USER_REQUEST, handleGetOneUser),
    takeEvery(ActionTypeLoginPage.LOGOUT_REQUEST, handleLogout),

    takeEvery(ActionTypeProfilePage.GET_ALL_FOLLOWERS_REQUEST, handleGetAllFollowers),

    takeEvery(ActionTypeExplorePage.GET_TOP_TWEETS_REQUEST, handleGetTopTweets),
    takeEvery(ActionTypeExplorePage.GET_LATEST_TWEETS_REQUEST, handleGetLatestTweets),
  ]);
}

export default watchAll;