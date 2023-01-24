import { combineReducers } from 'redux';
import homePageReducer from './HomePageReducer';
import loginPageReducer from './LoginPageReducer';
import profilePageReducer from './ProfilePageReducer';
import otherProfilePageReducer from './OtherProfilePageReducer';
import explorePageReducer from './ExplorePageReducer';
import bookmarkPageReducer from './BookmarkPageReducer';

const rootReducer = combineReducers({
  homePageState: homePageReducer,
  loginPageState:loginPageReducer,
  profilePageState:profilePageReducer,
  otherProfilePageState:otherProfilePageReducer,
  explorePageState:explorePageReducer,
  bookmarkPageState:bookmarkPageReducer
});

export default rootReducer;