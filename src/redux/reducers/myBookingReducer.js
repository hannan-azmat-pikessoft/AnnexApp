import { PAGINATION_INITIAL_LIST_RES } from '../../utility/constants';
import { actionTypes } from '../services/actionTypes';

export default function myBookingReducer(state = {
    myUpcomingBookingRes: PAGINATION_INITIAL_LIST_RES,
    myPastBookingRes: PAGINATION_INITIAL_LIST_RES,
    myUpcomingBookingFetching: true,
    myPastBookingFetching: true,
}, action) {
    switch (action.type) {

        case actionTypes.GET_MY_UPCOMING_BOOKING_METHOD:
            return { ...state, myUpcomingBookingFetching: true, myUpcomingBookingError: null, isMyUpcomingBookingSuccess: false };
            break;
        case actionTypes.GET_MY_UPCOMING_BOOKING_PAGINATION_SUCCESS:
            {
                let res = {
                    "count": action.payload.count,
                    "next": action.payload.next,
                    "previous": action.payload.previous,
                    "results": [...state.myUpcomingBookingRes.results, ...action.payload.results]
                }
                return { ...state, myUpcomingBookingFetching: false, myUpcomingBookingError: null, myUpcomingBookingRes: res, isMyUpcomingBookingSuccess: true };
                break;
            }
        case actionTypes.GET_MY_UPCOMING_BOOKING_SUCCESS:
            return { ...state, myUpcomingBookingFetching: false, myUpcomingBookingError: action.error, myUpcomingBookingRes: action.payload, isMyUpcomingBookingSuccess: true };
            break;
        case actionTypes.GET_MY_UPCOMING_BOOKING_FAIL:
            return { ...state, myUpcomingBookingFetching: false, myUpcomingBookingError: action.error, myUpcomingBookingRes: state.myUpcomingBookingRes, isMyUpcomingBookingSuccess: false };
            break;
        case actionTypes.GET_MY_UPCOMING_BOOKING_CLEAR:
            return { ...state, myUpcomingBookingFetching: false, myUpcomingBookingError: undefined, myUpcomingBookingRes: PAGINATION_INITIAL_LIST_RES, isMyUpcomingBookingSuccess: false };
            break;

        /////////////////////////////////////////////////////////////////////

        case actionTypes.GET_MY_PAST_BOOKING_METHOD:
            return { ...state, myPastBookingFetching: true, myPastBookingError: null, isMyPastBookingSuccess: false };
            break;
        case actionTypes.GET_MY_PAST_BOOKING_SUCCESS:
            return { ...state, myPastBookingFetching: false, myPastBookingError: null, myPastBookingRes: action.payload, isMyPastBookingSuccess: true };
            break;
        case actionTypes.GET_MY_PAST_BOOKING_PAGINATION_SUCCESS:
            {
                let res = {
                    "count": action.payload.count,
                    "next": action.payload.next,
                    "previous": action.payload.previous,
                    "results": [...state.myPastBookingRes.results, ...action.payload.results]
                }
                return { ...state, myPastBookingFetching: false, myPastBookingError: null, myPastBookingRes: res, isMyPastBookingSuccess: true };
                break;
            }
        case actionTypes.GET_MY_PAST_BOOKING_FAIL:
            return { ...state, myPastBookingFetching: false, myPastBookingError: action.error, myPastBookingRes: state.myPastBookingRes, isMyPastBookingSuccess: false };
            break;
        case actionTypes.GET_MY_PAST_BOOKING_CLEAR:
            return { ...state, myPastBookingFetching: false, myPastBookingError: undefined, myPastBookingRes: PAGINATION_INITIAL_LIST_RES, isMyPastBookingSuccess: false };
            break;

        /////////////////////////////////////////////////////////////////////

        default:
            return state;
    }
}

