import { combineReducers } from 'redux';
import homePageReducer from './HomePageReducer';
import loginPageReducer from './LoginPageReducer';
import profilePageReducer from './ProfilePageReducer';
import explorePageReducer from './ExplorePageReducer';

const rootReducer = combineReducers({
  homePageState: homePageReducer,
  loginPageState:loginPageReducer,
  profilePageState:profilePageReducer,
  explorePageState:explorePageReducer
});

export default rootReducer;