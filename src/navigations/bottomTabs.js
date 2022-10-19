import crashlytics from '@react-native-firebase/crashlytics';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {shallowEqual, useSelector} from 'react-redux';
import GuestUserFullScreenLoginModel from '../components/modals/loginModel/loginFullScreenModel';
import Home from '../components/screens/appScreens/home';
import MyBooking from '../components/screens/appScreens/myBooking';
import Setting from '../components/screens/appScreens/setting';
import {spacing} from '../styles/spacing';
import * as Utils from '../utility';
import colors from '../utility/colors';
import {navigate} from '../utility/commonFunctions';
import {
  KEY_BOTTOM_TAB_NAVIGATOR,
  SCREEN_HOME,
  SCREEN_MANAGE_ADDRESS,
} from '../utility/constants';
import {Images} from '../utility/imagePaths';

const Tab = createBottomTabNavigator();
const activeTabColor = colors.theme;
const inActiveTabColor = colors.grey400;
const tabBarColor = colors.white;

const tabData = [
  {
    label: '',
    name: Utils.Constants.SCREEN_HOME,
    active_icon: Images.IMG_HOME_ACTIVE,
    inactive_icon: Images.IMG_HOME_INACTIVE,
    component: Home,
  },
  {
    label: '',
    name: Utils.Constants.SCREEN_MY_BOOKING,
    active_icon: Images.IMG_CALENDAR_ACTIVE,
    inactive_icon: Images.IMG_CALENDAR_INACTIVE,
    component: MyBooking,
  },
  {
    label: '',
    name: Utils.Constants.SCREEN_SETTING,
    active_icon: Images.IMG_PROFILE_ACTIVE,
    inactive_icon: Images.IMG_PROFILE_INACTIVE,
    component: Setting,
  },
];

function BottomTabs({}) {
  const [showLoginModel, setShowLoginModel] = useState(false);

  const {isGuestUser} = useSelector(
    state => ({isGuestUser: state.authReducer.isGuestUser}),
    shallowEqual,
  );

  function onTabPress(e, navigation, rte) {
    crashlytics().log(`User navigate to ${rte.name} tab`);
    if (isGuestUser && rte.name != Utils.Constants.SCREEN_HOME)
      setShowLoginModel(true);
  }

  function onCloseLoginModel() {
    if (isGuestUser) navigate(KEY_BOTTOM_TAB_NAVIGATOR, {screen: SCREEN_HOME});
    setShowLoginModel(false);
  }

  function onLoginSignupSuccess() {
    setShowLoginModel(false);
  }

  return (
    <View style={{flex: 1}}>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: activeTabColor,
          tabBarInactiveTintColor: inActiveTabColor,
          tabBarStyle: {
            backgroundColor: tabBarColor,
            paddingBottom: 0,
            height: spacing.HEIGHT_56,
          },
          tabBarLabelStyle: {alignSelf: 'center'},
          tabBarAllowFontScaling: true,
          // tabBarItemStyle: { alignSelf: 'center', justifyContent: 'center' },
          headerShown: false,
        }}>
        {tabData.map((item, index) => {
          return (
            <Tab.Screen
              key={`bottomTabMain_${index.toString()}`}
              name={item.name}
              component={item.component}
              listeners={({navigation, route}) => ({
                tabPress: e => {
                  onTabPress(e, navigation, route);
                },
              })}
              options={{
                tabBarLabel: item.label,
                tabBarIcon: ({focused}) => {
                  return (
                    <Image
                      source={focused ? item.active_icon : item.inactive_icon}
                      style={[styles.iconStyle]}
                      resizeMode="contain"
                    />
                  );
                },
              }}
            />
          );
        })}
      </Tab.Navigator>
      <GuestUserFullScreenLoginModel
        key={'guestFullScreenModel'}
        onClose={onCloseLoginModel}
        visible={showLoginModel}
        onLoginSignupSuccess={onLoginSignupSuccess}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  iconStyle: {
    height: spacing.HEIGHT_18,
    width: spacing.HEIGHT_18,
  },
  badgeStyle: {
    backgroundColor: colors.red600,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default React.memo(BottomTabs);
