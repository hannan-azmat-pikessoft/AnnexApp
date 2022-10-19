import { actionTypes } from '../services/actionTypes';
import SplashScreen from 'react-native-splash-screen'
import { PAGINATION_INITIAL_LIST_RES } from '../../utility/constants';

export default function serviceReducer(state = {
    featuredServiceCategoryRes: PAGINATION_INITIAL_LIST_RES,
    serviceCategoryRes: PAGINATION_INITIAL_LIST_RES,
    servicesRes: PAGINATION_INITIAL_LIST_RES,
    serviceCategoryFetching: true,
    featuredServiceCategoryFetching: true
}, action) {
    switch (action.type) {

        case actionTypes.FEATURED_SERVICE_CATEGORY_METHOD:
            return { ...state, featuredServiceCategoryFetching: true, featuredServiceCategoryError: null, isFeaturedServiceCategorySuccess: false };
            break;
        case actionTypes.FEATURED_SERVICE_CATEGORY_SUCCESS:
            return { ...state, featuredServiceCategoryFetching: false, featuredServiceCategoryError: null, featuredServiceCategoryRes: action.payload, isFeaturedServiceCategorySuccess: true };
            break;
        case actionTypes.FEATURED_SERVICE_CATEGORY_FAIL:
            return { ...state, featuredServiceCategoryFetching: false, featuredServiceCategoryError: action.error, featuredServiceCategoryRes: state.featuredServiceCategoryRes, isFeaturedServiceCategorySuccess: false };
            break;
        case actionTypes.FEATURED_SERVICE_CATEGORY_CLEAR:
            return { ...state, featuredServiceCategoryFetching: false, featuredServiceCategoryError: undefined, featuredServiceCategoryRes: null, isFeaturedServiceCategorySuccess: false };
            break;

        /////////////////////////////////////////////////////////////////////

        case actionTypes.SERVICE_CATEGORY_METHOD:
            return { ...state, serviceCategoryFetching: true, serviceCategoryError: null, isServiceCategorySuccess: false };
            break;
        case actionTypes.SERVICE_CATEGORY_SUCCESS:
            return { ...state, serviceCategoryFetching: false, serviceCategoryError: null, serviceCategoryRes: action.payload, isServiceCategorySuccess: true };
            break;
        case actionTypes.SERVICE_CATEGORY_FAIL:
            return { ...state, serviceCategoryFetching: false, serviceCategoryError: action.error, serviceCategoryRes: state.serviceCategoryRes, isServiceCategorySuccess: false };
            break;
        case actionTypes.SERVICE_CATEGORY_CLEAR:
            return { ...state, serviceCategoryFetching: false, serviceCategoryError: undefined, serviceCategoryRes: null, isServiceCategorySuccess: false };
            break;

        /////////////////////////////////////////////////////////////////////

        case actionTypes.SERVICES_METHOD:
            return { ...state, servicesFetching: true, servicesError: null, isServicesSuccess: false };
            break;
        case actionTypes.SERVICES_SUCCESS:
            return { ...state, servicesFetching: false, servicesError: null, servicesRes: action.payload, isServicesSuccess: true };
            break;
        case actionTypes.SERVICES_FAIL:
            return { ...state, servicesFetching: false, servicesError: action.error, servicesRes: null, isServicesSuccess: false };
            break;
        case actionTypes.SERVICES_CLEAR:
            return { ...state, servicesFetching: false, servicesError: undefined, servicesRes: null, isServicesSuccess: false };
            break;

        /////////////////////////////////////////////////////////////////////

        default:
            return state;
    }
}

