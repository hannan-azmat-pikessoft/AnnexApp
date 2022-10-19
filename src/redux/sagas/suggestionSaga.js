import { put, takeLatest } from 'redux-saga/effects';
import { actionTypes } from '../services/actionTypes';
import callApis from '../services/apiCall';
import { API_BANNER, API_SUGGESTION } from '../services/apiTypes';

export function* getHomeSuggestionWatcher() {
    yield takeLatest(actionTypes.GET_HOME_SUGGESTION_METHOD, getHomeSuggestionWorker)
}

function* getHomeSuggestionWorker(action) {
    try {
        let apiData = {
            apiType: action.apiType,
            type: API_SUGGESTION,
        }
        const data = yield callApis(apiData)
        yield put({
            type: actionTypes.GET_HOME_SUGGESTION_SUCCESS,
            payload: data
        })
    } catch (error) {
        yield put({
            type: actionTypes.GET_HOME_SUGGESTION_FAIL,
            error: error
        })
    }
}

/////////////////////////////////////////////////////////////////////