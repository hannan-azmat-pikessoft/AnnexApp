import NetInfo from '@react-native-community/netinfo';
import React, {useEffect, useState} from 'react';
import {View, Platform} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import {Provider} from 'react-redux';
import NoInternetModal from './components/modals/noInternetModel';
import Navigator from './navigations';
import notiListeners from './notifications/notiListeners';
import {createNotiChannel} from './notifications/notiPermissions';
import reduxStore from './redux/store';
import {
  changeInitialLanguage,
  changeStatusBarColor,
  getErrorMessage,
  loginUser,
  logoutUser,
} from './utility/commonFunctions';
import {KEY_USER_DATA, STATUS_BAR_CONSTANTS} from './utility/constants';
import {retrieveItem} from './utility/customAsyncStorage';
import colors from './utility/colors';
import {API_VERSIONING} from './redux/services/apiTypes';
import apiCall from './redux/services/apiCall';
import deviceInfoModule from 'react-native-device-info';
import AppUpdateModal from './components/modals/appUpdateModal';

const App = () => {
  const [isNetwork, setIsNetwork] = useState(true);
  const [showAppUpdate, setShowAppUpdate] = useState(false);

  useEffect(() => {
    changeInitialLanguage();
    checkUpdateRequired();
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsNetwork(state.isConnected);
    });
    return () => unsubscribe;
  });

  async function checkUpdateRequired() {
    const apiData = {
      type: API_VERSIONING,
      apiType: 'GET',
    };

    apiCall(apiData)
      .then(async versioningRes => {
        let currentAppVersion = await deviceInfoModule.getVersion();
        if (
          versioningRes.data.versions[Platform.OS].version_force >
          currentAppVersion
        ) {
          setShowAppUpdate(true);
          return;
        } else {
          setShowAppUpdate(false);
          getLoginStatus();
          return;
        }
      })
      .catch(err => {
        getErrorMessage(err);
      });
  }

  function onCloseNetworkModal() {
    setIsNetwork(false);
  }
  function onCloseUpdateModal() {
    setShowAppUpdate(false);
  }

  function getLoginStatus() {
    retrieveItem(KEY_USER_DATA).then(user => {
      if (user) {
        loginUser(user);
      } else {
        logoutUser();
      }
    });
  }
  return (
    <View style={{flex: 1}}>
      <Provider store={reduxStore}>
        <Navigator />
      </Provider>
      <FlashMessage position="top" />
      <NoInternetModal
        visible={!isNetwork}
        onClose={() => onCloseNetworkModal()}
      />
      <AppUpdateModal visible={showAppUpdate} onClose={onCloseUpdateModal} />
    </View>
  );
};

export default App;
