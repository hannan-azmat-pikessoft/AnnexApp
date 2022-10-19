import { actionTypes } from "../services/actionTypes";

export function getMyUpcomingBookingAction(payload) {
    return {
        type: actionTypes.GET_MY_UPCOMING_BOOKING_METHOD,
        apiType: "GET",
        payload: payload
    }
}
export function clearMyUpcomingBookingAction() {
    return {
        type: actionTypes.GET_MY_UPCOMING_BOOKING_CLEAR,
    }
}

// ////////////////////////////////////////////////////////

export function getMyPastBookingAction(payload) {
    return {
        type: actionTypes.GET_MY_PAST_BOOKING_METHOD,
        apiType: "GET",
        payload: payload
    }
}
export function clearMyPastBookingAction(payoad) {
    return {
        type: actionTypes.GET_MY_PAST_BOOKING_CLEAR,
    }
}
// ////////////////////////////////////////////////////////