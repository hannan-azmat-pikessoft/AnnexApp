import { put, takeLatest } from 'redux-saga/effects';
import { actionTypes } from '../services/actionTypes';
import callApis from '../services/apiCall';
import { API_PROMOCODE } from '../services/apiTypes';

export function* getServiceBookingPromocodeWatcher() {
    yield takeLatest(actionTypes.GET_SERVICE_BOOKING_PROMOCODE_LIST_METHOD, getServiceBookingPromocodeWorker)
}

function* getServiceBookingPromocodeWorker(action) {
    try {
        let apiData = {
            apiType: action.apiType,
            type: API_PROMOCODE
        }
        const data = yield callApis(apiData)
        yield put({
            type: actionTypes.GET_SERVICE_BOOKING_PROMOCODE_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        yield put({
            type: actionTypes.GET_SERVICE_BOOKING_PROMOCODE_LIST_FAIL,
            error: error
        })
    }
}
