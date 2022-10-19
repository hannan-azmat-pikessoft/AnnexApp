import { actionTypes } from '../services/actionTypes';

export function getServiceBookingPromocodeAction() {
    return {
        type: actionTypes.GET_SERVICE_BOOKING_PROMOCODE_LIST_METHOD,
        apiType: "GET",
    }
}

/////////////////////////////////////////////////////////////////////

export function clearServiceBookingPromocodeAction() {
    return {
        type: actionTypes.GET_SERVICE_BOOKING_PROMOCODE_LIST_CLEAR,
    }
}