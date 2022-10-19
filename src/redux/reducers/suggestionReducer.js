import { actionTypes } from '../services/actionTypes';
import SplashScreen from 'react-native-splash-screen'
import { PAGINATION_INITIAL_LIST_RES } from '../../utility/constants';

export default function suggestionReducer(state = {
    homeSuggestionRes: PAGINATION_INITIAL_LIST_RES
}, action) {
    switch (action.type) {

        case actionTypes.GET_HOME_SUGGESTION_METHOD:
            return { ...state, homeSuggestionFetching: true, homeSuggestionError: null, isHomeSuggestionSuccess: false };
            break;
        case actionTypes.GET_HOME_SUGGESTION_SUCCESS:
            return { ...state, homeSuggestionFetching: false, homeSuggestionError: null, homeSuggestionRes: action.payload, isHomeSuggestionSuccess: true };
            break;
        case actionTypes.GET_HOME_SUGGESTION_FAIL:
            return { ...state, homeSuggestionFetching: false, homeSuggestionError: action.error, homeSuggestionRes: state.homeSuggestionRes, isHomeSuggestionSuccess: false };
            break;
        case actionTypes.GET_HOME_SUGGESTION_CLEAR:
            return { ...state, homeSuggestionFetching: false, homeSuggestionError: undefined, homeSuggestionRes: PAGINATION_INITIAL_LIST_RES, isHomeSuggestionSuccess: false };
            break;
        /////////////////////////////////////////////////////////////////////

        default:
            return state;
    }
}