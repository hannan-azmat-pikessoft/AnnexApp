import messaging from '@react-native-firebase/messaging';
import moment from 'moment';
import {Linking, PermissionsAndroid, Platform, StatusBar} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Geolocation from 'react-native-geolocation-service';
import ImagePicker from 'react-native-image-crop-picker';
import flashMessage from '../components/common/CustomFlashAlert';
import NavigationService from '../NavigationService';
import {loginUserAction, logoutUserAction} from '../redux/actions/authActions';
import {changeSafeAreaViewColorAction} from '../redux/actions/configActions';
import {
  changeAppLanguageAction,
  saveUserAction,
} from '../redux/actions/userActions';
import reduxStore from '../redux/store';
import Strings from '../translation/language';
import {
  GOOGLE_MAP_API_KEY,
  KEY_DEVICE_TOKEN,
  KEY_IS_GUEST_USER,
  KEY_USER_DATA,
  KEY_USER_TOKEN,
  LANGUAGE,
} from './constants';
import {clearAsyncKeyData, retrieveItem, storeItem} from './customAsyncStorage';
import {Images} from './imagePaths';

//NAVIGATION FUNCTIONS
export const navigate = (routeName, params = {}) => {
  NavigationService.navigate(routeName, params);
};

export const replace = (routeName, params = {}) => {
  NavigationService.replace(routeName, params);
};

export const goBack = () => {
  NavigationService.back();
};

export const openDrawer = () => {
  NavigationService.openDrawer();
};

export const closeDrawer = () => {
  NavigationService.closeDrawer();
};

export const clearStack = (routeName, params) => {
  NavigationService.clearStack(routeName, params);
};

export const push = (routeName, params) => {
  NavigationService.push(routeName, params);
};

//MEDIA PICKER FUNCTIONS
export function OpenGallary(callback, options) {
  ImagePicker.openPicker(options).then(image => {
    if (options.multiple && options.multiple == true) {
      let images = [];
      for (let i = 0; i < image.length; i++) {
        var fileNameA = image[i].path.split('/');
        var fileName = fileNameA[fileNameA.length - 1];

        let tempImageObject = {
          uri: image[i].path,
          type: image[i].mime,
          name: fileName,
        };
        images.push(tempImageObject);
      }
      callback(images);
      return images;
    } else {
      var fileNameA = image.path.split('/');
      var fileName = fileNameA[fileNameA.length - 1];

      let tempImageObject = {
        uri: image.path,
        type: image.mime,
        name: fileName,
      };
      callback(tempImageObject);
      return tempImageObject;
    }
  });
}

export function OpenCamera(callback, options) {
  ImagePicker.openCamera(options).then(image => {
    var fileNameA = image.path.split('/');
    var fileName = fileNameA[fileNameA.length - 1];
    let tempImageObject = {
      uri: image.path,
      type: image.mime,
      name: fileName,
    };
    callback(tempImageObject);
    return tempImageObject;
  });
}

export async function PickSingleDocument(callback, options, maxSize) {
  try {
    const res = await DocumentPicker.pickSingle(options);
    if (res.size > maxSize) {
      flashMessage(
        Strings.error_file_size + maxSize / 1000000 + ' mb',
        'danger',
      );
      return;
    }
    let file = {
      uri: res.uri,
      type: res.type,
      name: res.name,
    };
    callback(file);
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
    } else {
      throw err;
    }
  }
}

//get default image functions
export function getImage(url, defaultImage) {
  let path = defaultImage ? defaultImage : Images.IMG_APP_LOGO;
  if (url == null || url == '') {
    return path;
  } else {
    path = getImageUrl(url);
    return {uri: path};
  }
}

export function getImageUrl(url) {
  if (url) {
    const str = url;
    const n = str.includes('http');
    if (n) {
      return url;
    } else {
      return BASE_MEDIA_URL + '/' + url;
    }
  }
}

export async function PickMutipleDocument(callback, options, maxSize) {
  try {
    const res = await DocumentPicker.pickMultiple(options);
    let files = [];
    for (let i = 0; i < res.length; i++) {
      if (res[i].size > maxSize) {
        flashMessage(
          Strings.error_file_size + maxSize / 1000000 + ' mb',
          'danger',
        );
        return;
      }
      let file = {
        uri: res[i].uri,
        type: res[i].type,
        name: res[i].name,
      };
      files.push(file);
    }
    callback(files);
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
    } else {
      throw err;
    }
  }
}

//DATE TIME FUNCTIONS
export function convertDateTime(value, format, isUtc) {
  if (isUtc == true) {
    let convertedValue = moment(value).utc().format(format);
    return convertedValue;
  } else {
    let convertedValue = moment(value).format(format);
    return convertedValue;
  }
}

export function timeSince(date) {
  var seconds = Math.floor((new Date() - new Date(date)) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + ' years';
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + ' months';
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + ' days';
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + ' hours';
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + ' minutes';
  }
  return Math.floor(seconds) + ' seconds';
}

//location functions
export const requestLocationPermission = async () => {
  if (Platform.OS == 'ios') return true;
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      {
        title: 'Annex wants to detect your location',
        message: 'Enable location',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  } catch (err) {}
};

export async function getGeoLocation(callback) {
  Geolocation.getCurrentPosition(
    position => {
      let loc = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      callback(loc);
    },
    error => {
      // getErrorMessage(error)
    },
    {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
  );
}

export function openMap(lat, long, labelText = '') {
  const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
  const latLng = `${lat},${long}`;
  const label = labelText;
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`,
  });
  Linking.openURL(url);
}

export async function searchLocation(query) {
  return new Promise(async (resolve, reject) => {
    let BASE_URL = 'https://maps.googleapis.com/maps/api/';
    let apiUrl =
      BASE_URL +
      'place/textsearch/json?query=' +
      query +
      '&key=' +
      GOOGLE_MAP_API_KEY;

    fetch(apiUrl)
      .then(response => response.json())
      .then(responseJson => {
        resolve(responseJson);
      })
      .catch(err => {
        reject(err);
        getErrorMessage(err);
      });
  });
}

//FIREBASE FUNCTIONS
export async function requestFcmPermission() {
  return new Promise(async (resolve, reject) => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      getFcmToken().then(token => {
        resolve(token);
      });
    }
  });
}

export async function getFcmToken() {
  return new Promise((resolve, reject) => {
    messaging()
      .hasPermission()
      .then(enabled => {
        if (enabled) {
          messaging()
            .getToken()
            .then(tkn => {
              resolve(tkn);
            });
        } else {
          requestFcmPermission();
        }
      });
  });
}

//user related functions
export async function onLoginSignupSuccess(res, doLogin) {
  storeItem(KEY_USER_DATA, res).then(() => {
    storeItem(KEY_USER_TOKEN, res.token).then(() => {
      if (doLogin) {
        loginUser(res);
      }
    });
  });
}

export function saveUserData(data) {
  storeItem(KEY_USER_DATA, data).then(() => {
    reduxStore.dispatch(saveUserAction(data));
  });
}

export function loginUser(user) {
  reduxStore.dispatch(loginUserAction({isGuestUser: false}));
  reduxStore.dispatch(saveUserAction(user));
  return;
}

export function loginGuestUser() {
  reduxStore.dispatch(loginUserAction({isGuestUser: true}));
  return;
}

export function logoutUser() {
  reduxStore.dispatch(logoutUserAction());
  return;
}

export async function clearUserData() {
  await clearAsyncKeyData(KEY_USER_DATA);
  await clearAsyncKeyData(KEY_USER_TOKEN);
  await clearAsyncKeyData(KEY_DEVICE_TOKEN);

  global[KEY_USER_TOKEN] = undefined;
  global[KEY_DEVICE_TOKEN] = undefined;
  logoutUser();
}

export function isGuestUser() {
  if (global[KEY_IS_GUEST_USER] == true) {
    return true;
  } else {
    return false;
  }
}

// FILE EXTENSION FUNCTIONS
export function getFileExt(file) {
  let lastIndex = file.lastIndexOf('?X-A');
  if (lastIndex == -1) {
    let ext = file.split('.').pop();
    return ext;
  } else {
    let path = file.substring(0, lastIndex);
    let ext = path.split('.').pop();
    return ext;
  }
}

export function isImage(file) {
  let lastIndex = file.lastIndexOf('?X-A');
  if (lastIndex == -1) {
    let ext = file.split('.').pop();
    var arrayExtensions = ['jpg', 'jpeg', 'png', 'bmp', 'gif', 'heic'];
    if (arrayExtensions.lastIndexOf(ext) == -1) {
      return false;
    } else {
      return true;
    }
  } else {
    let path = file.substring(0, lastIndex);
    let ext = path.split('.').pop();
    var arrayExtensions = ['jpg', 'jpeg', 'png', 'bmp', 'gif', 'heic'];
    if (arrayExtensions.lastIndexOf(ext) == -1) {
      return false;
    } else {
      return true;
    }
  }
}

export function isAudio(file) {
  let lastIndex = file.lastIndexOf('?X-A');
  if (lastIndex == -1) {
    let ext = file.split('.').pop();
    // ext = ext[ext.length - 1].toLowerCase();
    var arrayExtensions = [
      '3gp',
      'aa',
      'aac',
      'aax',
      'm4a',
      'm4p',
      'mp3',
      'raw',
      'wav',
      'wma',
      'webm',
    ];
    if (arrayExtensions.lastIndexOf(ext) == -1) {
      return false;
    } else {
      return true;
    }
  } else {
    let path = file.substring(0, lastIndex);
    let ext = path.split('.').pop();
    var arrayExtensions = [
      '3gp',
      'aa',
      'aac',
      'aax',
      'm4a',
      'm4p',
      'mp3',
      'raw',
      'wav',
      'wma',
      'webm',
    ];
    if (arrayExtensions.lastIndexOf(ext) == -1) {
      return false;
    } else {
      return true;
    }
  }
}

export function isVideo(file) {
  let lastIndex = file.lastIndexOf('?X-A');
  if (lastIndex == -1) {
    let ext = file.split('.').pop();
    // ext = ext[ext.length - 1].toLowerCase();
    var arrayExtensions = ['m4v', 'avi', 'mpg', 'mp4', 'webm', 'mov'];
    if (arrayExtensions.lastIndexOf(ext) == -1) {
      return false;
    } else {
      return true;
    }
  } else {
    let path = file.substring(0, lastIndex);
    let ext = path.split('.').pop();
    var arrayExtensions = ['m4v', 'avi', 'mpg', 'mp4', 'webm', 'mov'];
    if (arrayExtensions.lastIndexOf(ext) == -1) {
      return false;
    } else {
      return true;
    }
  }
}

export function isDocument(file) {
  let lastIndex = file.lastIndexOf('?X-A');
  if (lastIndex == -1) {
    let ext = file.split('.').pop();
    var arrayExtensions = ['docx', 'pages', 'txt', 'doc', 'ppt'];
    if (arrayExtensions.lastIndexOf(ext) == -1) {
      return false;
    } else {
      return true;
    }
  } else {
    let path = file.substring(0, lastIndex);
    let ext = path.split('.').pop();
    var arrayExtensions = ['docx', 'pages', 'txt', 'doc', 'ppt'];
    if (arrayExtensions.lastIndexOf(ext) == -1) {
      return false;
    } else {
      return true;
    }
  }
}

export function isPdf(file) {
  let lastIndex = file.lastIndexOf('?X-A');
  if (lastIndex == -1) {
    var ext = file.split('.');
    ext = ext[ext.length - 1].toLowerCase();
    var arrayExtensions = ['pdf'];
    if (arrayExtensions.lastIndexOf(ext) == -1) {
      return false;
    } else {
      return true;
    }
  } else {
    let path = file.substring(0, lastIndex);
    var ext = path.split('.');
    ext = ext[ext.length - 1].toLowerCase();
    var arrayExtensions = ['pdf'];
    if (arrayExtensions.lastIndexOf(ext) == -1) {
      return false;
    } else {
      return true;
    }
  }
}

export function getFileNameFromUrl(file) {
  let lastIndex = file.lastIndexOf('?X-A');
  if (lastIndex == -1) {
    let ext = file.split('/').pop();
    return decodeURIComponent(ext);
  } else {
    let path = file.substring(0, lastIndex);
    let ext = path.split('/').pop();
    return decodeURIComponent(ext);
  }
}

//STRING FUNCTIONS
export function getStringFromArray(array, key) {
  let string = '';
  for (let i = 0; i < array.length; i++) {
    // string += array[i][key]
    if (i == 0 && i == array.length - 1) {
      string += array[i][key];
    } else {
      string += array[i][key] + ', ';
    }
  }
  return string;
}

//LANGUAGE FUNCTIONS
export function changeInitialLanguage() {
  retrieveItem(LANGUAGE).then(lang => {
    Strings.setLanguage(lang);
  });
}

export async function changeAppLanguage(lang) {
  Strings.setLanguage(lang);
  storeItem(LANGUAGE, lang);
  reduxStore.dispatch(changeAppLanguageAction());
}

//MAIL
export function openMailApp(email) {
  Linking.openURL(`mailto:${email}`);
}
//BROWSER
export function openURL(link) {
  Linking.openURL(link);
}

//CALL
export function dialCall(phoneNumber) {
  if (Platform.OS === 'android') {
    phoneNumber = `tel:${phoneNumber}`;
  } else {
    phoneNumber = `telprompt:${phoneNumber}`;
  }

  Linking.openURL(phoneNumber);
}

//WHATSAPP
export function openWhatsApp(phone) {
  Linking.openURL(`https://wa.me/${phone}`);
}

//PARSE ERROR MESSAGES
export function getErrorMessage(data) {
  if (typeof data == 'object') {
    for (const [key, value] of Object.entries(data)) {
      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          if (typeof value[i] === 'object') {
            for (const [key, value] of Object.entries(data)) {
              flashMessage(`${value}`, 'danger');
              return value;
            }
          } else {
            flashMessage(`${value[i]}`, 'danger');
            return value[i];
          }
        }
      } else {
        flashMessage(`${JSON.stringify(value)}`, 'danger');
        return value;
      }
    }
  } else {
    flashMessage(`${JSON.stringify(data)}`, 'danger');
  }
}

//STATUSBAR & SAFEAREAVIEW FUNCTIONS
export const changeStatusBarColor = (top, style, bottom) => {
  reduxStore.dispatch(changeSafeAreaViewColorAction({top, bottom}));
  StatusBar.setBarStyle(style);
  if (Platform.OS == 'android') {
    StatusBar.setBackgroundColor(top);
  }
};
