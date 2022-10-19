import { StatusBar } from "react-native"

//SCREEN CONSTANTS
export const KEY_SPLASH = 'splashScreen'
export const KEY_AUTH = 'auth'
export const KEY_APP_NAVIGATOR = 'appNavigator'
export const KEY_BOTTOM_TAB_NAVIGATOR = 'bottomTabNavigator'

export const SCREEN_LOGIN = 'loginScreen'
export const SCREEN_VERIFICATION = 'verificationScreen'
export const SCREEN_SIGNUP = 'signupScreen'

export const SCREEN_HOME = 'homeScreen'
export const SCREEN_SELECT_SERVICE = 'selectServiceScreen'
export const SCREEN_SERVICE_BOOKING = 'serviceBookingScreen'
export const SCREEN_SERVICE_BOOKING_DESCRIPTION = 'serviceBookingDescriptionScreen'
export const SCREEN_SERVICE_BOOKING_APPOINTMENT = 'serviceBookingAppointmentScreen'
export const SCREEN_SERVICE_BOOKING_PAYMENT_SUMMARY = 'serviceBookingPaymentSummaryScreen'
export const SCREEN_SERVICE_BOOKING_CONFIRMATION = 'serviceBookingConfirmationScreen'
export const SCREEN_ADD_CARD = 'AddCardScreen'
export const SCREEN_SELECT_LOCATION = 'SelectLocationScreen'
export const SCREEN_SELECT_LOCATION_ON_MAP = 'SelectLocationOnMapScreen'
export const SCREEN_ADD_ADDRESS = 'addAddresScreen'
export const SCREEN_UPCOMING_BOOKING = 'UpcomingBookingScreen'
export const SCREEN_PAST_BOOKING = 'PastBookingScreen'
export const SCREEN_MY_BOOKING = 'MyBookingScreen'
export const SCREEN_SETTING = 'settingScreen'
export const SCREEN_ABOUT_US = 'aboutUsScreen'
export const SCREEN_EDIT_PROFILE = 'editProfileScreen'
export const SCREEN_HELP = 'helpScreen'
export const SCREEN_MANAGE_ADDRESS = 'manageAddressScreen'
export const SCREEN_MANAGE_CARD = 'manageCardScreen'
export const SCREEN_ANNEX_WALLET = 'annexWalletScreen'
export const SCREEN_NOTIFICATIONS = 'notificationsScreen'

//OTHER CONSTANTS
export const KEY_USER_TOKEN = 'userToken'
export const KEY_USER_ID = 'userid'
export const KEY_USER_DATA = 'userData'
export const KEY_DEVICE_TOKEN = 'deviceToken'
export const KEY_DEVICE_ID = 'DEVICEID'
export const KET_DEVICE_INFO = 'DEVICEINFO'
export const KEY_CHANGE_LANGUAGE = 'KEY_CHANGE_LANGUAGE'
export const KEY_IS_GUEST_USER = 'isGuestUser'

export const KEYBOARD = {
  DEFAULT: 'default',
  NUMBER_PAD: 'number-pad',
  DECIMAL_PAD: 'decimal-pad',
  NUMERIC: 'numeric',
  EMAIL_ADDRESS: 'email-address',
  PHONE_PAD: 'phone-pad'
}

// GOOGLE MAP
export const GOOGLE_MAP_API_KEY = "AIzaSyB2la24JkJheWkp_oNhqcCU9zbtD3fY3PA"

// DEEPLINKIN CONSTANTS
export const DEEPLINK_BASE = 'flogapp'

//LISTING CONSTANTS
export const GET_LIST = 'getList'
export const GET_PAGINATION_LIST = 'getPaginationList'
export const PAGINATION_INITIAL_LIST_RES = {
  "count": null,
  "next": null,
  "previous": null,
  "results": []
}


//LANGUAGE
export const LANGUAGE = 'language'
export const LANGUAGES = {
  english: 'en',
  arabic: 'ar',
}

//NOTIFICATION TYPES
export const NOTI_TYPE = {
  PROMO: 'promo',
  SERVICES: "services",
  PROFILE: "profile",
  BOOKING: "booking",
  SYSTEM: "system"
}

//NOTIFICATION CONSTANTS
export const NOTI_CHANNEL_ID = "fcm_FirebaseNotifiction_default_channel"
export const NOTI_CHANNEL_NAME = "fcm_FirebaseNotifiction_default_channel"
export const NOTI_CHANNEL_DESC = "fcm_FirebaseNotifiction_default_channel"

export const NOTI_GROUP_CHANNEL_ID = "fcm_FirebaseNotifiction_default_channel"
export const NOTI_GROUP_CHANNEL_NAME = "fcm_FirebaseNotifiction_default_channel"
export const NOTI_GROUP_CHANNEL_DESC = "fcm_FirebaseNotifiction_default_channel"

export const NOTI_GROUP_NAME = "fcm_FirebaseNotifiction_default_channel"
export const NOTI_TAG_NAME = "fcm_FirebaseNotifiction_default_channel"

//DEEPLINK TYPES
export const DEEPLINK_TYPE = {
}

//CONSTANT VALUES
export const COUNTRY_CODE = '+971'

// animation constant
export const ANIMATION_TYPES = {
  BOUNCE: 'bounce',
  FLASH: 'flash',
  JELLO: 'jello',
  PULSE: 'pulse',
  ROTATE: 'rotate',
  RUBBER_BAND: 'rubberBand',
  SHAKE: 'shake',
  SWING: 'swing',
  TADA: 'tada',
  WOBBLE: 'wobble',
  BOUNCE_IN: 'bounceIn',
  BOUNCE_IN_DOWN: 'bounceInDown',
  BOUNCE_IN_UP: 'bounceInUp',
  BOUNCE_IN_LEFT: 'bounceInLeft',
  BOUNCE_IN_RIGHT: 'bounceInRight',
  BOUNCE_OUT: 'bounceOut',
  BOUNCE_OUT_DOWN: 'bounceOutDown',
  BOUNCE_OUT_UP: 'bounceOutUp',
  BOUNCE_OUT_LEFT: 'bounceOutLeft',
  BOUNCE_OUT_RIGHT: 'bounceOutRight',
  FADE_IN: 'fadeIn',
  FADE_IN_DOWN: 'fadeInDown',
  FADE_IN_DOWN_BIG: 'fadeInDownBig',
  FADE_IN_UP: 'fadeInUp',
  FADE_IN_UP_BIG: 'fadeInUpBig',
  FADE_IN_LEFT: 'fadeInLeft',
  FADE_IN_LEFT_BIG: 'fadeInLeftBig',
  FADE_IN_RIGHT: 'fadeInRight',
  FADE_IN_RIGHT_BIG: 'fadeInRightBig',
  FADE_OUT: 'fadeOut',
  FADE_OUT_DOWN: 'fadeOutDown',
  FADE_OUT_DOWN_BIG: 'fadeOutDownBig',
  FADE_OUT_UP: 'fadeOutUp',
  FADE_OUT_UP_BIG: 'fadeOutUpBig',
  FADE_OUT_LEFT: 'fadeOutLeft',
  FADE_OUT_LEFT_BIG: 'fadeOutLeftBig',
  FADE_OUT_RIGHT: 'fadeOutRight',
  FADE_OUT_RIGHT_BIG: 'fadeOutRightBig',
  FLIP_IN_X: 'flipInX',
  FLIP_IN_Y: 'flipInY',
  FLIP_OUT_X: 'flipOutX',
  FLIP_OUT_X: 'flipOutY',
  LIGHT_SPEED_IN: 'lightSpeedIn',
  LIGHT_SPEED_OUT: 'lightSpeedOut',
  SLIDE_IN_DOWN: 'slideInDown',
  SLIDE_IN_UP: 'slideInUp',
  SLIDE_IN_LEFTT: 'slideInLeft',
  SLIDE_IN_RIGHT: 'slideInRight',
  SLIDE_OUT_DOWN: 'slideOutDown',
  SLIDE_OUT_UP: 'slideOutUp',
  SLIDE_OUT_LEFT: 'slideOutLeft',
  SLIDE_OUT_RIGHT: 'slideOutRight',
  ZOOM_IN: 'zoomIn',
  ZOOM_IN_DOWN: 'zoomInDown',
  ZOOM_IN_UP: 'zoomInUp',
  ZOOM_IN_LEFT: 'zoomInLeft',
  ZOOM_IN_RIGHT: 'zoomInRight',
  ZOOM_OUT: 'zoomOut',
  ZOOM_OUT_DOWN: 'zoomOutDown',
  ZOOM_OUT_UP: 'zoomOutUp',
  ZOOM_OUT_LEFT: 'zoomOutLeft',
  ZOOM_OUT_RIGHT: 'zoomOutRight',
}

export const EASING_TYPE = {
  LINEAR: 'linear',
  EASE: 'ease',
  EASE_IN: 'ease-in',
  EASE_OUT: 'ease-out',
  EASE_IN_OUT: 'ease-in-out',
  EASE_IN_CUBIC: 'ease-in-cubic',
  EASE_OUT_CUBIC: 'ease-out-cubic',
  EASE_IN_OUT_CUBIC: 'ease-in-out-cubic',
  EASE_IN_CIRC: 'ease-in-circ',
  EASE_OUT_CIRC: 'ease-out-circ',
  EASE_IN_OUT_CIRC: 'ease-in-out-circ',
  EASE_IN_EXPO: 'ease-in-expo',
  EASE_OUT_EXPO: 'ease-out-expo',
  EASE_IN_OUT_EXPO: 'ease-in-out-expo',
  EASE_IN_QUAD: 'ease-in-quad',
  EASE_OUT_QUAD: 'ease-out-quad',
  EASE_IN_OUT_QUAD: 'ease-in-out-quad',
  EASE_IN_QART: 'ease-in-quart',
  EASE_OUT_QUART: 'ease-out-quart',
  EASE_IN_OUT_QUART: 'ease-in-out-quart',
  EASE_IN_QUINT: 'ease-in-quint',
  EASE_OUT_QUINT: 'ease-out-quint',
  EASE_IN_OUT_QUINT: 'ease-in-out-quint',
  EASE_IN_SINE: 'ease-in-sine',
  EASE_OUT_SINE: 'ease-out-sine',
  EASE_IN_OUT_SINE: 'ease-in-out-sine',
  EASE_IN_BACK: 'ease-in-back',
  EASE_OUT_BACK: 'ease-out-back',
  EASE_IN_OUT_BACK: 'ease-in-out-back',
}

//STATUS BAR CONSTANTS
export const STATUS_BAR_CONSTANTS = {
  DARK: 'dark-content',
  LIGHT: 'light-content',
  DEFAULT: 'default'
}