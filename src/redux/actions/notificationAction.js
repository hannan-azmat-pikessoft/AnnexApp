import { actionTypes } from '../services/actionTypes';

export function getNotificationAction(payload) {
    return {
        type: actionTypes.GET_NOTIFICATION_METHOD,
        apiType: "GET",
        payload: payload,
    }
}


/////////////////////////////////