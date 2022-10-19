import { actionTypes } from '../services/actionTypes';

export default function serviceSessionReducer(state = {
    serviceSessionDatesFetching: true,
    serviceSessionSlotsFetching: true,
    serviceSessionFetching: true,
}, action) {
    switch (action.type) {

        case actionTypes.SERVICES_SESSION_DATES_METHOD:
            return { ...state, serviceSessionDatesFetching: true, serviceSessionDatesError: null, isServiceSessionDatesSuccess: false };
            break;
        case actionTypes.SERVICES_SESSION_DATES_SUCCESS:
            return { ...state, serviceSessionDatesFetching: false, serviceSessionDatesError: null, serviceSessionDatesRes: action.payload, isServiceSessionDatesSuccess: true };
            break;
        case actionTypes.SERVICES_SESSION_DATES_FAIL:
            return { ...state, serviceSessionDatesFetching: false, serviceSessionDatesError: action.error, serviceSessionDatesRes: state.serviceSessionDatesRes, isServiceSessionDatesSuccess: false };
            break;
        case actionTypes.SERVICES_SESSION_DATES_CLEAR:
            return { ...state, serviceSessionDatesFetching: false, serviceSessionDatesError: undefined, serviceSessionDatesRes: undefined, isServiceSessionDatesSuccess: false };
            break;

        /////////////////////////////////////////////////////////////////////

        case actionTypes.SERVICES_SESSION_METHOD:
            return { ...state, serviceSessionFetching: true, serviceSessionError: null, isServiceSessionSuccess: false };
            break;
        case actionTypes.SERVICES_SESSION_SUCCESS:
            return { ...state, serviceSessionFetching: false, serviceSessionError: null, serviceSessionRes: action.payload, isServiceSessionSuccess: true };
            break;
        case actionTypes.SERVICES_SESSION_FAIL:
            return { ...state, serviceSessionFetching: false, serviceSessionError: action.error, serviceSessionRes: state.serviceSessionRes, isServiceSessionSuccess: false };
            break;
        case actionTypes.SERVICES_SESSION_CLEAR:
            return { ...state, serviceSessionFetching: false, serviceSessionError: undefined, serviceSessionRes: undefined, isServiceSessionSuccess: false };
            break;

        /////////////////////////////////////////////////////////////////////

        case actionTypes.SERVICES_SESSION_SLOTS_METHOD:
            return { ...state, serviceSessionSlotsFetching: true, serviceSessionSlotsError: null, isServiceSessionSlotsSuccess: false };
            break;
        case actionTypes.SERVICES_SESSION_SLOTS_SUCCESS:
            return { ...state, serviceSessionSlotsFetching: false, serviceSessionSlotsError: null, serviceSessionSlotsRes: action.payload, isServiceSessionSlotsSuccess: true };
            break;
        case actionTypes.SERVICES_SESSION_SLOTS_FAIL:
            return { ...state, serviceSessionSlotsFetching: false, serviceSessionSlotsError: action.error, serviceSessionSlotsRes: state.serviceSessionSlotsRes, isServiceSessionSlotsSuccess: false };
            break;
        case actionTypes.SERVICES_SESSION_SLOTS_CLEAR:
            return { ...state, serviceSessionSlotsFetching: false, serviceSessionSlotsError: undefined, serviceSessionSlotsRes: undefined, isServiceSessionSlotsSuccess: false };
            break;

        /////////////////////////////////////////////////////////////////////
        default:
            return state;
    }
}