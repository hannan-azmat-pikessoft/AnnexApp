import colors from '../../utility/colors';
import { actionTypes } from '../services/actionTypes';

export default function configReducer(state = {
    safeAreaViewColor: {
        top: colors.white,
        bottom: colors.white
    }
}, action) {
    switch (action.type) {

        case actionTypes.CHANGE_APP_SAFE_AREA_VIEW_COLOR:
            return { ...state, safeAreaViewColor: action.payload }
            break;

        /////////////////////////////////////////////////////////////////////

        default:
            return state;
    }
}