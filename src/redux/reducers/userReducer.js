import { actionTypes } from '../services/actionTypes';
import { PAGINATION_INITIAL_LIST_RES } from '../../utility/constants';
import { saveUserData } from '../../utility/commonFunctions';

export default function userReducer(state = {
    userRes: undefined,
    myAddressListRes: PAGINATION_INITIAL_LIST_RES,
    isAppLanguageChanged: false,
    myAddressListFetching: true,
}, action) {
    switch (action.type) {

        case actionTypes.SAVE_USER_DATA:
            return { ...state, userRes: action.payload }
            break;

        /////////////////////////////////////////////////////////////////////

        case actionTypes.UPDATE_USER_METHOD:
            return { ...state, isUpdateUserFetching: true, isUpdateUserSuccess: false, updateUserError: undefined }
            break;
        case actionTypes.UPDATE_USER_SUCCESS:
            saveUserData(action.payload)
            return { ...state, userRes: action.payload, isUpdateUserFetching: false, isUpdateUserSuccess: true, updateUserError: undefined }
            break;
        case actionTypes.UPDATE_USER_FAIL:
            return { ...state, userRes: state.userRes, isUpdateUserFetching: false, isUpdateUserSuccess: false, updateUserError: action.error }
            break;
        case actionTypes.UPDATE_USER_CLEAR:
            return { ...state, isUpdateUserFetching: false, isUpdateUserSuccess: false, updateUserError: undefined }
            break;

        /////////////////////////////////////////////////////////////////////

        case actionTypes.GET_MY_ADDRESS_METHOD:
            return { ...state, myAddressListFetching: true, myAddressListError: null, isMyAddressListSuccess: false };
            break;
        case actionTypes.GET_MY_ADDRESS_SUCCESS:
            return { ...state, myAddressListFetching: false, myAddressListError: null, myAddressListRes: action.payload, isMyAddressListSuccess: true };
            break;
        case actionTypes.GET_MY_ADDRESS_PAGINATION_SUCCESS:
            {
                let res = {
                    "count": action.payload.count,
                    "next": action.payload.next,
                    "previous": action.payload.previous,
                    "results": [...state.myAddressListRes.results, ...action.payload.results]
                }
                return { ...state, myAddressListFetching: false, myAddressListError: null, myAddressListRes: res, isMyAddressListSuccess: true };
                break;
            }
        case actionTypes.GET_MY_ADDRESS_FAIL:
            return { ...state, myAddressListFetching: false, myAddressListError: action.error, myAddressListRes: state.myAddressListRes, isMyAddressListSuccess: false };
            break;
        case actionTypes.GET_MY_ADDRESS_CLEAR:
            return { ...state, myAddressListFetching: false, myAddressListError: undefined, myAddressListRes: PAGINATION_INITIAL_LIST_RES, isMyAddressListSuccess: false };
            break;

        /////////////////////////////////////////////////////////////////////

        case actionTypes.CHANGE_APP_LANGUAGE:
            return { ...state, isAppLanguageChanged: !state.isAppLanguageChanged }
            break;

        /////////////////////////////////////////////////////////////////////

        default:
            return state;
    }
}