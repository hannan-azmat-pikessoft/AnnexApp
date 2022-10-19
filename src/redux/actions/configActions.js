import { actionTypes } from '../services/actionTypes';

export function changeSafeAreaViewColorAction(payload) {
    return {
        type: actionTypes.CHANGE_APP_SAFE_AREA_VIEW_COLOR,
        payload: payload
    }
}

/////////////////////////////////////////////////////////////////////