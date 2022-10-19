import React, {useEffect, useState} from 'react';
import {ImageBackground, Keyboard, StyleSheet, View} from 'react-native';
import {textScale} from '../../../styles/responsiveStyles';
import {spacing} from '../../../styles/spacing';
import {fontNames} from '../../../styles/typography';
import Strings from '../../../translation/language';
import colors from '../../../utility/colors';
import {loginGuestUser} from '../../../utility/commonFunctions';
import {COUNTRY_CODE, KEYBOARD, KEY_AUTH} from '../../../utility/constants';
import {Images} from '../../../utility/imagePaths';
import {validateMobileNumber} from '../../../utility/validations';
import CommonButton from '../../common/buttons/CommonButton';
import CommonTextInput from '../../common/inputBoxes/CommonTextInput';
import RegularText from '../../common/RegularText';
import CommonImage from '../../common/views/CommonImage';
import CarousalComponent from '../carousalComponent';

const RenderCarousalText = () => {
  return (
    <View style={styles.carousalMainView}>
      <RegularText style={styles.carousalText}>
        {' '}
        100+ {Strings.services}{' '}
      </RegularText>
    </View>
  );
};

const TextInputLeftComponent = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <RegularText
        style={{fontSize: textScale(16), marginHorizontal: spacing.MARGIN_16}}>
        {COUNTRY_CODE}
      </RegularText>
      <View
        style={{
          backgroundColor: colors.grey300,
          width: spacing.WIDTH_2,
          height: spacing.HEIGHT_34,
        }}
      />
    </View>
  );
};

const MobileNumberScreen = ({onSubmitMobileNo, from}) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [mobileNo, setMobileNo] = useState('');
  const [mobileNoError, setMobileNoError] = useState('');

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    if (mobileNo.length == 9) {
      Keyboard.dismiss();
      onSubmit();
    }
  }, [mobileNo]);

  function onSubmit() {
    const validateMobileNo = validateMobileNumber(mobileNo);
    if (!validateMobileNo.success) {
      setMobileNoError(validateMobileNo.msg);
    } else {
      setMobileNoError('');
    }
    if (!validateMobileNo.success) {
      return;
    }

    const loginData = {
      phone: mobileNo,
    };

    onSubmitMobileNo(loginData);
  }

  function onPressSkip() {
    loginGuestUser();
  }

  return (
    <ImageBackground
      style={styles.mainContainer}
      source={Images.IMG_LOGIN_BG}
      resizeMode="stretch">
      {!isKeyboardVisible && (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <CommonImage
            source={Images.IMG_APP_LOGO}
            style={styles.appLogoContainer}
          />
        </View>
      )}
      {!isKeyboardVisible && (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <CarousalComponent
            dataArray={[1, 1, 1]}
            rowComponent={() => <RenderCarousalText />}
            autoScroll={true}
            scrollDuration={5000}
          />
        </View>
      )}
      <View style={styles.signInContainer}>
        <RegularText style={styles.signInText}>{Strings.signin}</RegularText>
        <RegularText style={styles.welcomeText}>
          {Strings.welcome_back + '! ' + Strings.enter_your_number}
        </RegularText>
        <CommonTextInput
          placeHolder={'Ex. 56 668 2413'}
          inputStyle={styles.inputStyle}
          leftComponent={<TextInputLeftComponent />}
          onSubmitEditing={() => onSubmit()}
          onChangeText={text => setMobileNo(text)}
          editable={true}
          value={mobileNo}
          error={mobileNoError}
          keyboardType={KEYBOARD.NUMBER_PAD}
        />
        {from == KEY_AUTH && (
          <CommonButton
            title={Strings.skip}
            backgroundColor={colors.transparent}
            marginTop={spacing.MARGIN_12}
            onPressButton={onPressSkip}
            textStyle={styles.skipText}
          />
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: spacing.PADDING_30,
  },
  carousalMainView: {
    width: spacing.FULL_WIDTH - spacing.WIDTH_62,
    alignItems: 'center',
    marginBottom: spacing.MARGIN_32,
  },
  carousalText: {
    fontSize: textScale(20),
    color: colors.thirdThemeColor,
  },
  appLogoContainer: {
    alignSelf: 'center',
  },
  signInContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  signInText: {
    fontSize: textScale(22),
    color: colors.white,
    fontFamily: fontNames.FONT_FAMILY_BOLD,
  },
  welcomeText: {
    fontSize: textScale(11),
    color: colors.white,
    fontFamily: fontNames.FONT_FAMILY_MEDIUM,
    marginBottom: spacing.MARGIN_20,
    marginTop: spacing.MARGIN_4,
  },
  inputStyle: {
    // fontSize: textScale(16),
    marginLeft: spacing.MARGIN_16,
  },
  skipText: {
    textDecorationLine: 'underline',
    letterSpacing: spacing.WIDTH_1,
    fontSize: textScale(12),
    fontFamily: fontNames.FONT_FAMILY_MEDIUM,
  },
});

export default MobileNumberScreen;
