import {put, takeLatest} from 'redux-saga/effects';
import {GET_LIST, GET_PAGINATION_LIST} from '../../utility/constants';
import {actionTypes} from '../services/actionTypes';
import callApis from '../services/apiCall';
import {API_ADDRESS, API_USERS} from '../services/apiTypes';

export function* updateUserWatcher() {
  yield takeLatest(actionTypes.UPDATE_USER_METHOD, updateUserWorker);
}

function* updateUserWorker(action) {
  try {
    let apiData = {
      apiType: action.apiType,
      type: API_USERS + action.payload.id + '/',
      payload: action.payload,
    };
    const data = yield callApis(apiData);
    yield put({
      type: actionTypes.UPDATE_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: actionTypes.UPDATE_USER_FAIL,
      error: null,
    });
  }
}

/////////////////////////////////////////////////////////////////////

export function* getMyAddressWatcher() {
  yield takeLatest(actionTypes.GET_MY_ADDRESS_METHOD, getMyAddressWorker);
}

function* getMyAddressWorker(action) {
  try {
    let apiData = {
      apiType: action.apiType,
      type: API_ADDRESS + action.payload.query,
    };
    const data = yield callApis(apiData);
    if (action.payload.reqType == GET_LIST) {
      yield put({type: actionTypes.GET_MY_ADDRESS_SUCCESS, payload: data});
    } else if (action.payload.reqType == GET_PAGINATION_LIST) {
      yield put({
        type: actionTypes.GET_MY_ADDRESS_PAGINATION_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    yield put({
      type: actionTypes.GET_MY_ADDRESS_FAIL,
      error: error,
    });
  }
}
