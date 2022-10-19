import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import React from 'react';
import {View} from 'react-native';
import {shallowEqual, useSelector} from 'react-redux';
import {navigationRef} from '../NavigationService';
import * as Utils from '../utility';
import AppNavigator from './appNavigator';
import AuthNavigator from './authNavigator';

const Stack = createStackNavigator();

function AppStack({}) {
  const {isUserLoggedIn} = useSelector(
    state => ({
      isUserLoggedIn: state.authReducer.isUserLoggedIn,
    }),
    shallowEqual,
  );

  return (
    <View style={{flex: 1}}>
      {isUserLoggedIn !== undefined && (
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator
            initialRouteName={Utils.Constants.KEY_AUTH}
            screenOptions={{headerShown: false}}>
            {!isUserLoggedIn ? (
              <Stack.Screen
                name={Utils.Constants.KEY_AUTH}
                component={AuthNavigator}
              />
            ) : (
              <Stack.Screen
                name={Utils.Constants.KEY_APP_NAVIGATOR}
                component={AppNavigator}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </View>
  );
}

export default AppStack;
