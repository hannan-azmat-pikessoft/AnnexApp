import { actionTypes } from '../services/actionTypes';

export function getFeaturedServiceCategoryAction(payload) {
    return {
        type: actionTypes.FEATURED_SERVICE_CATEGORY_METHOD,
        apiType: "GET",
        payload: payload,
    }
}
export function clearFeaturedServiceCategoryAction(payload) {
    return {
        type: actionTypes.FEATURED_SERVICE_CATEGORY_CLEAR,
    }
}
/////////////////////////////////////////////////////////////////////

export function getServiceCategoryAction(payload) {
    return {
        type: actionTypes.SERVICE_CATEGORY_METHOD,
        apiType: "GET",
        payload: payload,
    }
}
export function clearServiceCategoryAction(payload) {
    return {
        type: actionTypes.SERVICE_CATEGORY_CLEAR,
    }
}
/////////////////////////////////////////////////////////////////////

export function getServicesAction(payload) {
    return {
        type: actionTypes.SERVICES_METHOD,
        apiType: "GET",
        payload: payload,
    }
}

export function clearServicesAction(payload) {
    return {
        type: actionTypes.SERVICES_CLEAR,
    }
}


/////////////////////////////////