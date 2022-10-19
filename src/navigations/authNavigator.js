import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import {SafeAreaView} from 'react-native';
import Login from '../components/screens/authScreens/login';
import SignupScreen from '../components/screens/authScreens/signup';
import VerificationScreen from '../components/screens/authScreens/verification';
import {
  SCREEN_LOGIN,
  SCREEN_SIGNUP,
  SCREEN_VERIFICATION,
} from '../utility/constants';

const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Stack.Navigator
        initialRouteName={SCREEN_LOGIN}
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name={SCREEN_LOGIN} component={Login} />
        <Stack.Screen
          name={SCREEN_VERIFICATION}
          component={VerificationScreen}
        />
        <Stack.Screen name={SCREEN_SIGNUP} component={SignupScreen} />
      </Stack.Navigator>
    </SafeAreaView>
  );
}

export default AuthNavigator;
