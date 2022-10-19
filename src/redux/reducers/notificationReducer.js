import { PAGINATION_INITIAL_LIST_RES } from '../../utility/constants';
import { actionTypes } from '../services/actionTypes';

export default function notificationReducer(state = {
    getNotificationRes: PAGINATION_INITIAL_LIST_RES,
}, action) {
    switch (action.type) {

        case actionTypes.GET_NOTIFICATION_METHOD:
            return { ...state, getNotificationFetching: state.getNotificationRes.results.length > 0 ? false : true, getNotificationError: null, isGetNotificationSuccess: false };
            break;
        case actionTypes.GET_NOTIFICATION_PAGINATION_SUCCESS:
            {
                let res = {
                    "count": action.payload.count,
                    "next": action.payload.next,
                    "previous": action.payload.previous,
                    "results": [...state.getNotificationRes.results, ...action.payload.results]
                }
                return { ...state, getNotificationFetching: false, getNotificationError: null, getNotificationRes: res, isGetNotificationSuccess: true };
                break;
            }
        case actionTypes.GET_NOTIFICATION_SUCCESS:
            return { ...state, getNotificationFetching: false, getNotificationError: action.error, getNotificationRes: action.payload, isGetNotificationSuccess: true };
            break;
        case actionTypes.GET_NOTIFICATION_FAIL:
            return { ...state, getNotificationFetching: false, getNotificationError: action.error, getNotificationRes: state.getNotificationRes, isGetNotificationSuccess: false };
            break;
        case actionTypes.GET_NOTIFICATION_CLEAR:
            return { ...state, getNotificationFetching: false, getNotificationError: undefined, getNotificationRes: [], isGetNotificationSuccess: false };
            break;

        /////////////////////////////////////////////////////////////////////

        default:
            return state;
    }
}

