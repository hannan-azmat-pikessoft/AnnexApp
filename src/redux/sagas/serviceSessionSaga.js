import { put, takeLatest } from 'redux-saga/effects';
import { actionTypes } from '../services/actionTypes';
import callApis from '../services/apiCall';
import { API_SERVICE, API_SERVICE_DATES, API_SESSION } from '../services/apiTypes';

export function* getServiceSessionDatesWatcher() {
    yield takeLatest(actionTypes.SERVICES_SESSION_DATES_METHOD, getServiceSessionDatesWorker)
}

function* getServiceSessionDatesWorker(action) {
    try {
        let apiData = {
            apiType: action.apiType,
            type: API_SERVICE_DATES
        }
        const data = yield callApis(apiData)
        yield put({
            type: actionTypes.SERVICES_SESSION_DATES_SUCCESS,
            payload: data
        })
    } catch (error) {
        yield put({
            type: actionTypes.SERVICES_SESSION_DATES_FAIL,
            error: error
        })
    }
}

/////////////////////////////////////////////////////////////////////

export function* getServiceSessionWatcher() {
    yield takeLatest(actionTypes.SERVICES_SESSION_METHOD, getServiceSessionWorker)
}

function* getServiceSessionWorker(action) {
    try {
        let apiData = {
            apiType: action.apiType,
            type: API_SERVICE + action.payload.id + "/sessions?date=" + action.payload.date,
        }
        const data = yield callApis(apiData)
        yield put({
            type: actionTypes.SERVICES_SESSION_SUCCESS,
            payload: data
        })
    } catch (error) {
        yield put({
            type: actionTypes.SERVICES_SESSION_FAIL,
            error: error
        })
    }
}

/////////////////////////////////////////////////////////////////////

export function* getServiceSessionSlotsWatcher() {
    yield takeLatest(actionTypes.SERVICES_SESSION_SLOTS_METHOD, getServiceSessionSlotsWorker)
}

function* getServiceSessionSlotsWorker(action) {
    try {
        let apiData = {
            apiType: action.apiType,
            type: API_SESSION + action.payload.id + "/slots/",
        }
        const data = yield callApis(apiData)
        yield put({
            type: actionTypes.SERVICES_SESSION_SLOTS_SUCCESS,
            payload: data
        })
    } catch (error) {
        yield put({
            type: actionTypes.SERVICES_SESSION_SLOTS_FAIL,
            error: error
        })
    }
}
