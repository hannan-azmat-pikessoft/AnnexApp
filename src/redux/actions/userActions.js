import { actionTypes } from '../services/actionTypes';

export function saveUserAction(payload) {
    return {
        type: actionTypes.SAVE_USER_DATA,
        payload: payload,
    }
}

/////////////////////////////////////////////////////////////////////

export function updateUserAction(payload) {
    return {
        type: actionTypes.UPDATE_USER_METHOD,
        payload: payload,
        apiType: "PATCH"
    }
}

export function clearUpdateUserAction(payload) {
    return {
        type: actionTypes.UPDATE_USER_CLEAR,
    }
}

/////////////////////////////////////////////////////////////////////

export function getMyAddressAction(payload) {
    return {
        type: actionTypes.GET_MY_ADDRESS_METHOD,
        payload: payload,
        apiType: "GET"
    }
}

export function clearGetMyAddressAction(payload) {
    return {
        type: actionTypes.GET_MY_ADDRESS_CLEAR,
    }
}

/////////////////////////////////////////////////////////////////////

export function changeAppLanguageAction() {
    return {
        type: actionTypes.CHANGE_APP_LANGUAGE,
    }
}

/////////////////////////////////////////////////////////////////////