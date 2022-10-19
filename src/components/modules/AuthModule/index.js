import React, {useEffect, useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import apiCall from '../../../redux/services/apiCall';
import {
  API_USERS,
  API_USERS_LOGIN,
  API_USERS_RESEND_OTP,
  API_USERS_VERIFY_OTP,
} from '../../../redux/services/apiTypes';
import Strings from '../../../translation/language';
import {
  getErrorMessage,
  loginUser,
  onLoginSignupSuccess,
  requestFcmPermission,
} from '../../../utility/commonFunctions';
import {
  KEY_USER_DATA,
  SCREEN_LOGIN,
  SCREEN_SIGNUP,
  SCREEN_VERIFICATION,
} from '../../../utility/constants';
import {retrieveItem} from '../../../utility/customAsyncStorage';
import useCounter from '../../../utility/useCounter';
import flashMessage from '../../common/CustomFlashAlert';
import MobileNumberScreen from './mobileNumberScreen';
import OtpVerficationScreen from './otpVerficationScreen';
import SignupScreen from './signupScreen';

const LoginModule = ({from, onSuccess}) => {
  const [currentState, setCurrentState] = useState(SCREEN_LOGIN);
  const [mobileNo, setMobileNo] = useState('');

  const [timerState, setTimerState] = useState('stop');
  const [timerValue, setTimerValue] = useState(30);
  const [canResendOtp, setCanResendOtp] = useState(false);
  const [loading, setLoading] = useState(false);

  useCounter(timerState, setTimerValue, timerValue);

  useEffect(() => {
    if (currentState == SCREEN_VERIFICATION) {
      setTimerState('start');
      setCanResendOtp(false);
    } else {
      setTimerState('stop');
      setCanResendOtp(false);
      setTimerValue(30);
    }
  }, [currentState]);

  useEffect(() => {
    if (currentState == SCREEN_VERIFICATION) {
      if (timerValue == 0) {
        setTimerState('stop');
        setCanResendOtp(true);
      }
    }
  }, [timerValue, currentState]);

  function onSubmitMobileNo(loginData) {
    setMobileNo(loginData.phone);
    const apiData = {
      type: API_USERS_LOGIN,
      apiType: 'POST',
      payload: loginData,
    };

    apiCall(apiData)
      .then(res => {
        setCurrentState(SCREEN_VERIFICATION);
      })
      .catch(err => {
        getErrorMessage(err);
      });
  }

  async function onPressVerifyOTP(otp) {
    setLoading(true);
    let token = await requestFcmPermission();
    const loginData = {
      phone: mobileNo,
      otp: otp,
      device_token: token,
      device_type: Platform.OS,
    };

    const apiData = {
      type: API_USERS_VERIFY_OTP,
      apiType: 'POST',
      payload: loginData,
    };

    apiCall(apiData)
      .then(res => {
        onLoginSignupSuccess(res, false).then(() => {
          setLoading(false);
          if (res.is_new_user) {
            setCurrentState(SCREEN_SIGNUP);
          } else {
            setTimeout(() => {
              loginUser(res);
              onSuccess();
            }, 2000);
          }
        });
      })
      .catch(err => {
        setLoading(false);
        getErrorMessage(err);
      });
  }

  function onPressResendOTP() {
    const loginData = {
      phone: mobileNo,
    };
    const apiData = {
      type: API_USERS_RESEND_OTP,
      apiType: 'POST',
      payload: loginData,
    };

    apiCall(apiData)
      .then(res => {
        flashMessage(Strings.msg_otp_resended, 'success');
        setTimerState('start');
        setCanResendOtp(false);
        setTimerValue(30);
      })
      .catch(err => {
        getErrorMessage(err);
      });
  }

  function onPressSignup(payload) {
    setLoading(true);
    const apiData = {
      type: API_USERS,
      apiType: 'PATCH',
      payload: payload,
    };
    retrieveItem(KEY_USER_DATA).then(res => {
      apiData.type = API_USERS + res.id + '/';
      apiCall(apiData)
        .then(res => {
          onLoginSignupSuccess(res, true).then(() => {
            setLoading(false);
            onSuccess();
          });
        })
        .catch(err => {
          setLoading(false);
          getErrorMessage(err);
        });
    });
  }

  return (
    <View style={{flex: 1}}>
      {currentState == SCREEN_LOGIN && (
        <MobileNumberScreen onSubmitMobileNo={onSubmitMobileNo} from={from} />
      )}
      {currentState == SCREEN_VERIFICATION && (
        <OtpVerficationScreen
          onPressVerifyOTP={onPressVerifyOTP}
          onPressResendOTP={onPressResendOTP}
          canResendOtp={canResendOtp}
          timerValue={timerValue}
          mobileNo={mobileNo}
          loading={loading}
        />
      )}
      {currentState == SCREEN_SIGNUP && (
        <SignupScreen onPressSignup={onPressSignup} loading={loading} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default LoginModule;
