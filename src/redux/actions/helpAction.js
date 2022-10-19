import { actionTypes } from '../services/actionTypes';

export function getFAQSAction(payload) {
    return {
        type: actionTypes.GET_FAQS_METHOD,
        payload: payload,
        apiType: "GET",
    }
}

/////////////////////////////////////////////////////////////////////

export function clearFAQSAction() {
    return {
        type: actionTypes.GET_FAQS_CLEAR,
    }
}