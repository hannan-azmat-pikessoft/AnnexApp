import {put, takeLatest} from 'redux-saga/effects';
import {actionTypes} from '../services/actionTypes';
import callApis from '../services/apiCall';
import {API_BANNER, API_CATEGORY, API_SUGGESTION} from '../services/apiTypes';

export function* getFeaturedServiceCategoryWatcher() {
  yield takeLatest(
    actionTypes.FEATURED_SERVICE_CATEGORY_METHOD,
    getFeaturedServiceCategoryWorker,
  );
}

function* getFeaturedServiceCategoryWorker(action) {
  try {
    let apiData = {
      apiType: action.apiType,
      type: API_CATEGORY + action.payload.query,
    };
    const data = yield callApis(apiData);
    yield put({
      type: actionTypes.FEATURED_SERVICE_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: actionTypes.FEATURED_SERVICE_CATEGORY_FAIL,
      error: error,
    });
  }
}

/////////////////////////////////////////////////////////////////////

export function* getServiceCategoryWatcher() {
  yield takeLatest(
    actionTypes.SERVICE_CATEGORY_METHOD,
    getServiceCategoryWorker,
  );
}

function* getServiceCategoryWorker(action) {
  try {
    let apiData = {
      apiType: action.apiType,
      type: API_CATEGORY + action.payload.query,
    };
    const data = yield callApis(apiData);
    yield put({
      type: actionTypes.SERVICE_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: actionTypes.SERVICE_CATEGORY_FAIL,
      error: error,
    });
  }
}

/////////////////////////////////////////////////////////////////////

export function* getServicesWatcher() {
  yield takeLatest(actionTypes.SERVICES_METHOD, getServicesWorker);
}

function* getServicesWorker(action) {
  try {
    let apiData = {
      apiType: action.apiType,
      type: API_CATEGORY + action.payload.query,
    };
    const data = yield callApis(apiData);
    yield put({
      type: actionTypes.SERVICES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: actionTypes.SERVICES_FAIL,
      error: error,
    });
  }
}

/////////////////////////////////////////////////////////////////////
