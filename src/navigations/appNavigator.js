import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { shallowEqual, useSelector } from 'react-redux';
import AboutUs from '../components/screens/appScreens/aboutUs';
import AddAddress from '../components/screens/appScreens/addAddress';
import AddCard from '../components/screens/appScreens/addCard';
import AnnexWallet from '../components/screens/appScreens/annexWallet';
import EditProfile from '../components/screens/appScreens/editProfile';
import Help from '../components/screens/appScreens/help';
import ManageAddress from '../components/screens/appScreens/manageAddress';
import ManageCards from '../components/screens/appScreens/manageCard';
import MyBooking from '../components/screens/appScreens/myBooking';
import Notifications from '../components/screens/appScreens/notification';
import SelectLocationOnMap from '../components/screens/appScreens/selectLocationOnMap';
import ServiceBooking from '../components/screens/appScreens/serviceBooking';
import ServiceDetail from '../components/screens/appScreens/serviceDetail';
import Setting from '../components/screens/appScreens/setting';
import * as Utils from '../utility';
import BottomTabs from './bottomTabs';

const Stack = createStackNavigator();

function AppNavigation() {

  const { safeAreaViewColor, } = useSelector(state => ({
    safeAreaViewColor: state.configReducer.safeAreaViewColor,
  }), shallowEqual)

  return (
    <View style={{ flex: 1 }} >
      <SafeAreaView style={{ backgroundColor: safeAreaViewColor.top, }} />
      <Stack.Navigator
        initialRouteName={Utils.Constants.KEY_BOTTOM_TAB_NAVIGATOR}
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}>
        <Stack.Screen name={Utils.Constants.KEY_BOTTOM_TAB_NAVIGATOR} component={BottomTabs} />
        <Stack.Screen name={Utils.Constants.SCREEN_SELECT_SERVICE} component={ServiceDetail} options={{ cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS }} />
        <Stack.Screen name={Utils.Constants.SCREEN_SERVICE_BOOKING} component={ServiceBooking} />
        <Stack.Screen name={Utils.Constants.SCREEN_ADD_CARD} component={AddCard} />
        <Stack.Screen name={Utils.Constants.SCREEN_SELECT_LOCATION_ON_MAP} component={SelectLocationOnMap} />
        <Stack.Screen name={Utils.Constants.SCREEN_ADD_ADDRESS} component={AddAddress} />
        <Stack.Screen name={Utils.Constants.SCREEN_MY_BOOKING} component={MyBooking} />
        <Stack.Screen name={Utils.Constants.SCREEN_SETTING} component={Setting} />
        <Stack.Screen name={Utils.Constants.SCREEN_ABOUT_US} component={AboutUs} />
        <Stack.Screen name={Utils.Constants.SCREEN_EDIT_PROFILE} component={EditProfile} />
        <Stack.Screen name={Utils.Constants.SCREEN_MANAGE_ADDRESS} component={ManageAddress} />
        <Stack.Screen name={Utils.Constants.SCREEN_MANAGE_CARD} component={ManageCards} />
        <Stack.Screen name={Utils.Constants.SCREEN_ANNEX_WALLET} component={AnnexWallet} />
        <Stack.Screen name={Utils.Constants.SCREEN_HELP} component={Help} />
        <Stack.Screen name={Utils.Constants.SCREEN_NOTIFICATIONS} component={Notifications} />
      </Stack.Navigator>
      < SafeAreaView style={{ backgroundColor: safeAreaViewColor.bottom }} />
    </View>
  );
}

export default AppNavigation;