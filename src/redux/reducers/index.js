import { combineReducers } from 'redux';
import { actionTypes } from '../services/actionTypes';
import authReducer from './authReducer';
import bannerReducer from './bannerReducer';
import bookServiceReducer from './bookServiceReducer';
import helpReducer from './helpReducer';
import configReducer from './configReducer';
import myBookingReducer from './myBookingReducer';
import promocodeReducer from './promocodeReducer';
import serviceReducer from './serviceReducer';
import serviceSessionReducer from './serviceSessionReducer';
import suggestionReducer from './suggestionReducer';
import userReducer from './userReducer';
import notificationReducer from './notificationReducer';

const appReducer = combineReducers({
    authReducer,
    userReducer,
    bannerReducer,
    serviceReducer,
    serviceSessionReducer,
    bookServiceReducer,
    suggestionReducer,
    myBookingReducer,
    promocodeReducer,
    helpReducer,
    configReducer,
    notificationReducer
});
const rootReducer = (state, action) => {
    if (action.type == actionTypes.LOGOUT_METHOD) {
        state = undefined
    }
    return appReducer(state, action)
}

export default rootReducer;