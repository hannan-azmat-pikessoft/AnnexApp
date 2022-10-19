import { put, takeLatest } from 'redux-saga/effects';
import { actionTypes } from '../services/actionTypes';
import callApis from '../services/apiCall';
import { API_BANNER } from '../services/apiTypes';

export function* getHomeBannerWatcher() {
    yield takeLatest(actionTypes.HOME_BANNER_METHOD, getHomeBannerWorker)
}

function* getHomeBannerWorker(action) {
    try {
        let apiData = {
            apiType: action.apiType,
            type: API_BANNER + action.payload.query,
        }
        const data = yield callApis(apiData)
        yield put({
            type: actionTypes.HOME_BANNER_SUCCESS,
            payload: data
        })
    } catch (error) {
        yield put({
            type: actionTypes.HOME_BANNER_FAIL,
            error: error
        })
    }
}

/////////////////////////////////////////////////////////////////////