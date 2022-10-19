import { actionTypes } from '../services/actionTypes';

export function getHomeSuggestionAction(payload) {
    return {
        type: actionTypes.GET_HOME_SUGGESTION_METHOD,
        apiType: "GET",
        payload: payload,
    }
}


/////////////////////////////////