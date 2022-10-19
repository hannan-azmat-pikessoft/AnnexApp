import { GET_PAGINATION_LIST, PAGINATION_INITIAL_LIST_RES } from '../../utility/constants';
import { actionTypes } from '../services/actionTypes';

export default function helpReducer(state = {
    getFAQSRes: PAGINATION_INITIAL_LIST_RES,
}, action) {
    switch (action.type) {

        case actionTypes.GET_FAQS_METHOD:
            return { ...state, getFAQSFetching: true, getFAQSError: null, isGetFAQSSuccess: false };
            break;
        case actionTypes.GET_FAQS_PAGINATION_SUCCESS:
            {
                let res = {
                    "count": action.payload.count,
                    "next": action.payload.next,
                    "previous": action.payload.previous,
                    "results": [...state.getFAQSRes.results, ...action.payload.results]
                }
                return { ...state, getFAQSFetching: false, getFAQSError: null, getFAQSRes: res, isGetFAQSSuccess: true };
                break;
            }
        case actionTypes.GET_FAQS_SUCCESS:
            return { ...state, getFAQSFetching: false, getFAQSError: action.error, getFAQSRes: action.payload, isGetFAQSSuccess: true };
            break;
        case actionTypes.GET_FAQS_FAIL:
            return { ...state, getFAQSFetching: false, getFAQSError: action.error, getFAQSRes: state.getFAQSRes, isGetFAQSSuccess: false };
            break;
        case actionTypes.GET_FAQS_CLEAR:
            return { ...state, getFAQSFetching: false, getFAQSError: undefined, getFAQSRes: [], isGetFAQSSuccess: false };
            break;

        /////////////////////////////////////////////////////////////////////

        default:
            return state;
    }
}

