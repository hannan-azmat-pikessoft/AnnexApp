import { actionTypes } from '../services/actionTypes';
import SplashScreen from 'react-native-splash-screen'

export default function authReducer(state = {
    isUserLoggedIn: undefined,
    isGuestUser: true,
}, action) {
    switch (action.type) {

        case actionTypes.LOGIN_USER_METHOD:
            SplashScreen.hide();
            return { ...state, isUserLoggedIn: true, isGuestUser: action.payload.isGuestUser };
            break;
        case actionTypes.LOGOUT_USER_METHOD:
            SplashScreen.hide();
            return { ...state, isUserLoggedIn: false, isGuestUser: true };
            break;

        /////////////////////////////////////////////////////////////////////

        default:
            return state;
    }
}