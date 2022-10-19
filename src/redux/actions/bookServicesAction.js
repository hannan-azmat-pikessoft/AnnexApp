import { actionTypes } from '../services/actionTypes';

export function addServiceIntoCartAction(payload) {
    return {
        type: actionTypes.ADD_SERVICE_INTO_CART_METHOD,
        payload: payload,
    }
}

/////////////////////////////////////////////////////////////////////

export function removeServiceFromCartAction(payload) {
    return {
        type: actionTypes.REMOVE_SERVICE_FROM_CART_METHOD,
        payload: payload,
    }
}

/////////////////////////////////////////////////////////////////////

export function plusServiceQuantityInCartAction(payload) {
    return {
        type: actionTypes.PLUS_SERVICE_QUANTITY_IN_CART_METHOD,
        payload: payload,
    }
}

/////////////////////////////////////////////////////////////////////

export function minusServiceQuantityInCartAction(payload) {
    return {
        type: actionTypes.MINUS_SERVICE_QUANTITY_IN_CART_METHOD,
        payload: payload,
    }
}

/////////////////////////////////////////////////////////////////////