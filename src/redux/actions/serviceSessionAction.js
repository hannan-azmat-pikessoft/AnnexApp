import { actionTypes } from "../services/actionTypes";

export function getServiceSessionDates(payload) {
    return {
        type: actionTypes.SERVICES_SESSION_DATES_METHOD,
        apiType: "GET",
    }
}
export function clearServiceSessionDates(payload) {
    return {
        type: actionTypes.SERVICES_SESSION_DATES_CLEAR,
    }
}

// /////////////////////////////////////////////////////

export function getServiceSession(payload) {
    return {
        type: actionTypes.SERVICES_SESSION_METHOD,
        apiType: "GET",
        payload: payload,
    }
}
export function clearServiceSession(payload) {
    return {
        type: actionTypes.SERVICES_SESSION_CLEAR,
    }
}

// /////////////////////////////////////////////////////


export function getServiceSessionSlots(payload) {
    return {
        type: actionTypes.SERVICES_SESSION_SLOTS_METHOD,
        apiType: "GET",
        payload: payload,
    }
}
export function clearServiceSessionSlots(payload) {
    return {
        type: actionTypes.SERVICES_SESSION_SLOTS_CLEAR,
    }
}