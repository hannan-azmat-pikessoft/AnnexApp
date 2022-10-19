import { actionTypes } from '../services/actionTypes';

export function loginUserAction(action) {
    return {
        type: actionTypes.LOGIN_USER_METHOD,
        payload: action,
    }
}

export function logoutUserAction(action) {
    return {
        type: actionTypes.LOGOUT_USER_METHOD,
        payload: action,
    }
}

/////////////////////////////////