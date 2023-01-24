import { takeEvery, all } from "redux-saga/effects";
import * as ActionTypeHomePage from "../Constant/HomePageConstant";
import * as ActionTypeLoginPage from "../Constant/LoginPageConstant";
import * as ActionTypeProfilePage from "../Constant/ProfilePageConstant";
import * as ActionTypeExplorePage from "../Constant/ExplorePageConstant";
import * as ActionTypeBookmarkPage from "../Constant/BookmarkPageConstant";

import {
  handleGetAllTweets,handleGetAllReplies,
  handleAddLike,handleUnlike,
  handleAddSave,handleUnsave,
  handlePostTweet,
  handleGetWhoToFollow
} from './HomePageSaga'
import {handleLogin,handleRegister,handleGetOneUser,handleLogout} from './LoginPageSaga'
import {handleGetAllFollowers,handleGetAllFollowing,handleGetOwnTweets} from './ProfilePageSaga'
import {handleGetTopTweets,handleGetLatestTweets,handleGetPopularUser} from './ExplorePageSaga'
import {handleGetSavedTweets,handleGetLikedTweets} from './BookmarkPageSaga'

function* watchAll() {
  yield all([
    takeEvery(ActionTypeHomePage.GET_ALL_TWEETS_REQUEST, handleGetAllTweets),
    takeEvery(ActionTypeHomePage.POST_TWEET_REQUEST, handlePostTweet),
    takeEvery(ActionTypeHomePage.GET_ALL_REPLIES_REQUEST, handleGetAllReplies),
    takeEvery(ActionTypeHomePage.GET_WHO_TO_FOLLOW_REQUEST, handleGetWhoToFollow),
    takeEvery(ActionTypeHomePage.ADD_LIKES_REQUEST, handleAddLike),
    takeEvery(ActionTypeHomePage.UNLIKE_REQUEST, handleUnlike),
    takeEvery(ActionTypeHomePage.ADD_SAVE_REQUEST, handleAddSave),
    takeEvery(ActionTypeHomePage.UNSAVE_REQUEST, handleUnsave),

    takeEvery(ActionTypeLoginPage.LOGIN_REQUEST, handleLogin),
    takeEvery(ActionTypeLoginPage.REGISTER_REQUEST, handleRegister),
    takeEvery(ActionTypeLoginPage.GET_ONE_USER_REQUEST, handleGetOneUser),
    takeEvery(ActionTypeLoginPage.LOGOUT_REQUEST, handleLogout),

    takeEvery(ActionTypeProfilePage.GET_OWN_TWEETS_REQUEST, handleGetOwnTweets),
    takeEvery(ActionTypeProfilePage.GET_ALL_FOLLOWERS_REQUEST, handleGetAllFollowers),
    takeEvery(ActionTypeProfilePage.GET_ALL_FOLLOWING_REQUEST, handleGetAllFollowing),
    

    takeEvery(ActionTypeExplorePage.GET_TOP_TWEETS_REQUEST, handleGetTopTweets),
    takeEvery(ActionTypeExplorePage.GET_LATEST_TWEETS_REQUEST, handleGetLatestTweets),
    takeEvery(ActionTypeExplorePage.GET_POPULAR_USER_REQUEST, handleGetPopularUser),

    takeEvery(ActionTypeBookmarkPage.GET_SAVED_TWEETS_REQUEST, handleGetSavedTweets),
    takeEvery(ActionTypeBookmarkPage.GET_LIKED_TWEETS_REQUEST, handleGetLikedTweets),
  ]);
}

export default watchAll;