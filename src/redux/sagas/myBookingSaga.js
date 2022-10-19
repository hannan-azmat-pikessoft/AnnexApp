import { put, takeLatest } from 'redux-saga/effects';
import { GET_LIST, GET_PAGINATION_LIST } from '../../utility/constants';
import { actionTypes } from '../services/actionTypes';
import callApis from '../services/apiCall';
import { API_SERVICE_REQUEST } from '../services/apiTypes';

export function* getMyUpcommingBookingWatcher() {
    yield takeLatest(actionTypes.GET_MY_UPCOMING_BOOKING_METHOD, getMyUpcommingBookingWorker)
}

function* getMyUpcommingBookingWorker(action) {
    try {
        let apiData = {
            apiType: action.apiType,
            type: API_SERVICE_REQUEST + action.payload.query,
        }
        const data = yield callApis(apiData)
        if (action.payload.reqType == GET_LIST) {
            yield put({ type: actionTypes.GET_MY_UPCOMING_BOOKING_SUCCESS, payload: data })
        }
        else if (action.payload.reqType == GET_PAGINATION_LIST) {
            yield put({ type: actionTypes.GET_MY_UPCOMING_BOOKING_PAGINATION_SUCCESS, payload: data })
        }
    } catch (error) {
        yield put({
            type: actionTypes.GET_MY_UPCOMING_BOOKING_FAIL,
            error: error
        })
    }
}

// /////////////////////////////////////////////////////////////////////////////

export function* getMyPastBookingWatcher() {
    yield takeLatest(actionTypes.GET_MY_PAST_BOOKING_METHOD, getMyPastBookingWorker)
}

function* getMyPastBookingWorker(action) {
    try {
        let apiData = {
            apiType: action.apiType,
            type: API_SERVICE_REQUEST + action.payload.query,
        }
        const data = yield callApis(apiData)
        if (action.payload.reqType == GET_LIST) {
            yield put({ type: actionTypes.GET_MY_PAST_BOOKING_SUCCESS, payload: data })
        }
        else if (action.payload.reqType == GET_PAGINATION_LIST) {
            yield put({ type: actionTypes.GET_MY_PAST_BOOKING_PAGINATION_SUCCESS, payload: data })
        }
    } catch (error) {
        yield put({
            type: actionTypes.GET_MY_PAST_BOOKING_FAIL,
            error: error
        })
    }
}

/////////////////////////////////////////////////////////////////////
