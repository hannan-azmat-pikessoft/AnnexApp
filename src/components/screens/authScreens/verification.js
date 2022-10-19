import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, View, Platform, TouchableOpacity } from 'react-native';
import apiCall from '../../../redux/services/apiCall';
import { API_USERS_RESEND_OTP, API_USERS_VERIFY_OTP } from '../../../redux/services/apiTypes';
import { textScale } from '../../../styles/responsiveStyles';
import { spacing } from '../../../styles/spacing';
import { fontNames } from '../../../styles/typography';
import Strings from '../../../translation/language';
import colors from '../../../utility/colors';
import { getErrorMessage, loginUser, navigate, onLoginSignupSuccess, requestFcmPermission } from '../../../utility/commonFunctions';
import { COUNTRY_CODE, SCREEN_SIGNUP } from '../../../utility/constants';
import { Images } from '../../../utility/imagePaths';
import useCounter from '../../../utility/useCounter';
import CommonButton from '../../common/buttons/CommonButton';
import flashMessage from '../../common/CustomFlashAlert';
import CommonOtpInput from '../../common/inputBoxes/CommonOtpInput';
import RegularText from '../../common/RegularText';

const VerificationScreen = ({ route }) => {

    const { params } = route
    const { mobileNo } = params

    const [loading, setLoading] = useState(false)

    const [otp, setOtp] = useState('')
    const [otpError, setOtpError] = useState('')

    const [timerState, setTimerState] = useState('start')
    const [timerValue, setTimerValue] = useState(30)
    const [canResendOtp, setCanResendOtp] = useState(false)
    useCounter(timerState, setTimerValue, timerValue);

    useEffect(() => {
        if (timerValue == 0) {
            setTimerState('stop')
            setCanResendOtp(true)
        }
    }, [timerValue])

    // useEffect(() => {
    //     setTimerState('start')
    //     setCanResendOtp(false)
    // }, [])

    async function onPressSignin() {
        setLoading(true)
        // let token = await requestFcmPermission()
        const loginData = {
            phone: mobileNo,
            otp: otp,
            device_token: "12345",
            device_type: Platform.OS
        }

        const apiData = {
            type: API_USERS_VERIFY_OTP,
            apiType: "POST",
            payload: loginData,
        }

        apiCall(apiData)
            .then((res) => {
                onLoginSignupSuccess(res, false)
                    .then(() => {
                        setLoading(false)
                        if (res.is_new_user) {
                            navigate(SCREEN_SIGNUP)
                        }
                        else {
                            loginUser(res)
                        }
                    }
                    )
            })
            .catch((err) => {
                getErrorMessage(err)
                setLoading(false)
            })
    }

    function onPressResend() {
        const loginData = {
            phone: mobileNo
        }
        const apiData = {
            type: API_USERS_RESEND_OTP,
            apiType: "POST",
            payload: loginData,
        }

        apiCall(apiData)
            .then((res) => {
                flashMessage(Strings.msg_otp_resended, 'success')
                setTimerState('start')
                setCanResendOtp(false)
                setTimerValue(30)
            })
            .catch((err) => {
                getErrorMessage(err)
            })
    }

    return (
        <ImageBackground style={styles.mainContainer} source={Images.IMG_LOGIN_BG} resizeMode="stretch" >
            <View style={styles.middleContainer} >
                <RegularText style={styles.title} >{Strings.verify_your_account}</RegularText>
                <RegularText style={styles.description}>
                    {`${Strings.enter_6_digit_code}${mobileNo ? ` ${COUNTRY_CODE} ${mobileNo}` : ""}`}
                </RegularText>
                <CommonOtpInput
                    otpCount={6}
                    onCodeFilled={(otp) => setOtp(otp)}
                    onCodeChange={(otp) => setOtp(otp)}
                    code={otp}
                    error={otpError}
                />
                {
                    canResendOtp ?
                        <TouchableOpacity onPress={() => onPressResend()} >
                            <RegularText style={[styles.otpRecieveTime, { fontSize: textScale(14), fontFamily: fontNames.FONT_FAMILY_MEDIUM }]} >{Strings.resend}</RegularText>
                        </TouchableOpacity>
                        :
                        <RegularText style={styles.otpRecieveTime} >{`${Strings.you_can_resend_code_after} ${timerValue} ${Strings.sec}`}</RegularText>
                }
            </View>
            <CommonButton
                title={Strings.login}
                textStyle={styles.buttonText}
                buttonStyle={styles.buttonStyle}
                onPressButton={onPressSignin}
                fetching={loading}
            />
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingHorizontal: spacing.PADDING_30,
        paddingBottom: "8%"
    },
    middleContainer: {
        flex: 1,
        justifyContent: "center",
    },
    title: {
        fontSize: textScale(22),
        fontFamily: fontNames.FONT_FAMILY_BOLD,
        textAlign: "center",
        color: colors.thirdThemeColor
    },
    description: {
        fontSize: textScale(14),
        color: colors.white,
        textAlign: "center",
        marginTop: spacing.MARGIN_8,
    },
    otpRecieveTime: {
        fontSize: textScale(10),
        textAlign: "center",
        color: colors.white,
        marginTop: "10%",
        height: spacing.HEIGHT_20
    },
    buttonStyle: {
        height: spacing.HEIGHT_56,
        borderWidth: spacing.WIDTH_1,
        borderColor: "#62BCFF",
        paddingVertical: 0,
        width: "100%"
    },
    buttonText: {
        fontSize: textScale(16),
        color: colors.white,
        fontFamily: fontNames.FONT_FAMILY_MEDIUM,
    },
});

export default VerificationScreen;