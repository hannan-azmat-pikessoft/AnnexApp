import { GET_PAGINATION_LIST, PAGINATION_INITIAL_LIST_RES } from '../../utility/constants';
import { actionTypes } from '../services/actionTypes';

export default function promocodeReducer(state = {
    getServiceBookingPromocodeListRes: [],
}, action) {
    switch (action.type) {

        case actionTypes.GET_SERVICE_BOOKING_PROMOCODE_LIST_METHOD:
            return { ...state, getServiceBookingPromocodeListFetching: true, getServiceBookingPromocodeListError: null, isGetServiceBookingPromocodeListSuccess: false };
            break;
        case actionTypes.GET_SERVICE_BOOKING_PROMOCODE_LIST_SUCCESS:
            return { ...state, getServiceBookingPromocodeListFetching: false, getServiceBookingPromocodeListError: action.error, getServiceBookingPromocodeListRes: action.payload, isGetServiceBookingPromocodeListSuccess: true };
            break;
        case actionTypes.GET_SERVICE_BOOKING_PROMOCODE_LIST_FAIL:
            return { ...state, getServiceBookingPromocodeListFetching: false, getServiceBookingPromocodeListError: action.error, getServiceBookingPromocodeListRes: state.getServiceBookingPromocodeListRes, isGetServiceBookingPromocodeListSuccess: false };
            break;
        case actionTypes.GET_SERVICE_BOOKING_PROMOCODE_LIST_CLEAR:
            return { ...state, getServiceBookingPromocodeListFetching: false, getServiceBookingPromocodeListError: undefined, getServiceBookingPromocodeListRes: [], isGetServiceBookingPromocodeListSuccess: false };
            break;

        /////////////////////////////////////////////////////////////////////

        default:
            return state;
    }
}

