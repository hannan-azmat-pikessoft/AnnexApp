import { put, takeLatest } from 'redux-saga/effects';
import { GET_LIST, GET_PAGINATION_LIST } from '../../utility/constants';
import { actionTypes } from '../services/actionTypes';
import callApis from '../services/apiCall';
import { API_NOTIFICATION } from '../services/apiTypes';

export function* getNotificationWatcher() {
    yield takeLatest(actionTypes.GET_NOTIFICATION_METHOD, getNotificationWorker)
}

function* getNotificationWorker(action) {
    try {
        let apiData = {
            apiType: action.apiType,
            type: API_NOTIFICATION + action.payload.query,
        }
        const data = yield callApis(apiData)
        if (action.payload.reqType == GET_LIST) {
            yield put({ type: actionTypes.GET_NOTIFICATION_SUCCESS, payload: data })
        }
        else if (action.payload.reqType == GET_PAGINATION_LIST) {
            yield put({ type: actionTypes.GET_NOTIFICATION_PAGINATION_SUCCESS, payload: data })
        }
    } catch (error) {
        yield put({
            type: actionTypes.GET_NOTIFICATION_FAIL,
            error: error
        })
    }
}
