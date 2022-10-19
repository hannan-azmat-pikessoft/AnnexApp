import { actionTypes } from '../services/actionTypes';
import SplashScreen from 'react-native-splash-screen'
import { PAGINATION_INITIAL_LIST_RES } from '../../utility/constants';

export default function bannerReducer(state = {
    homeBannerRes: PAGINATION_INITIAL_LIST_RES,
    homeBannerFetching: true
}, action) {
    switch (action.type) {

        case actionTypes.HOME_BANNER_METHOD:
            return { ...state, homeBannerFetching: true, homeBannerError: null, isHomeBannerSuccess: false };
            break;
        case actionTypes.HOME_BANNER_SUCCESS:
            return { ...state, homeBannerFetching: false, homeBannerError: null, homeBannerRes: action.payload, isHomeBannerSuccess: true };
            break;
        case actionTypes.HOME_BANNER_FAIL:
            return { ...state, homeBannerFetching: false, homeBannerError: action.error, homeBannerRes: state.homeBannerRes, isHomeBannerSuccess: false };
            break;
        case actionTypes.HOME_BANNER_CLEAR:
            return { ...state, homeBannerFetching: false, homeBannerError: undefined, homeBannerRes: PAGINATION_INITIAL_LIST_RES, isHomeBannerSuccess: false };
            break;
        /////////////////////////////////////////////////////////////////////

        default:
            return state;
    }
}