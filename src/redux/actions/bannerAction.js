import { actionTypes } from '../services/actionTypes';

export function getHomeBannerAction(payload) {
    return {
        type: actionTypes.HOME_BANNER_METHOD,
        apiType: "GET",
        payload: payload,
    }
}


/////////////////////////////////