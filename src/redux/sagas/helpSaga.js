import { put, takeLatest } from 'redux-saga/effects';
import { GET_LIST, GET_PAGINATION_LIST } from '../../utility/constants';
import { actionTypes } from '../services/actionTypes';
import callApis from '../services/apiCall';
import { API_FAQ } from '../services/apiTypes';

export function* getFAQSWatcher() {
    yield takeLatest(actionTypes.GET_FAQS_METHOD, getFAQSWorker)
}

function* getFAQSWorker(action) {
    try {
        let apiData = {
            apiType: action.apiType,
            type: API_FAQ + action.payload.query,
        }
        const data = yield callApis(apiData)
        if (action.payload.reqType == GET_LIST) {
            yield put({ type: actionTypes.GET_FAQS_SUCCESS, payload: data })
        }
        else if (action.payload.reqType == GET_PAGINATION_LIST) {
            yield put({ type: actionTypes.GET_FAQS_PAGINATION_SUCCESS, payload: data })
        }
    } catch (error) {
        yield put({
            type: actionTypes.GET_FAQS_FAIL,
            error: error
        })
    }
}
