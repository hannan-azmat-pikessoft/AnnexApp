import { all } from 'redux-saga/effects';
import { getHomeBannerWatcher } from './bannerSaga';
import { getFAQSWatcher } from './helpSaga';
import { getMyPastBookingWatcher, getMyUpcommingBookingWatcher } from './myBookingSaga';
import { getNotificationWatcher } from './notificationSaga';
import { getServiceBookingPromocodeWatcher } from './promocodSaga';
import { getServiceSessionDatesWatcher, getServiceSessionSlotsWatcher, getServiceSessionWatcher } from './serviceSessionSaga';
import { getFeaturedServiceCategoryWatcher, getServiceCategoryWatcher, getServicesWatcher } from './servicesSaga';
import { getHomeSuggestionWatcher } from './suggestionSaga';
import { getMyAddressWatcher, updateUserWatcher } from './userSaga';

function* rootSaga() {
    yield all([
        updateUserWatcher(),
        getHomeBannerWatcher(),
        getFeaturedServiceCategoryWatcher(),
        getServiceCategoryWatcher(),
        getServicesWatcher(),
        getServiceSessionWatcher(),
        getServiceSessionDatesWatcher(),
        getServiceSessionSlotsWatcher(),
        getMyAddressWatcher(),
        getHomeSuggestionWatcher(),
        getMyUpcommingBookingWatcher(),
        getMyPastBookingWatcher(),
        getServiceBookingPromocodeWatcher(),
        getFAQSWatcher(),
        getNotificationWatcher(),
    ])
}
export default rootSaga;