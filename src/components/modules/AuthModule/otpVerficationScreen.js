import React, { useEffect, useRef, useState } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import { textScale } from '../../../styles/responsiveStyles';
import { spacing } from '../../../styles/spacing';
import { fontNames } from '../../../styles/typography';
import Strings from '../../../translation/language';
import colors from '../../../utility/colors';
import { COUNTRY_CODE } from '../../../utility/constants';
import { Images } from '../../../utility/imagePaths';
import CommonButton from '../../common/buttons/CommonButton';
import CommonOtpInput from '../../common/inputBoxes/CommonOtpInput';
import RegularText from '../../common/RegularText';


const OtpVerficationScreen = ({ onPressVerifyOTP, onPressResendOTP, canResendOtp, timerValue, mobileNo }) => {

    let otpRef = useRef(null)

    const [loading, setLoading] = useState(false)

    const [otp, setOtp] = useState('')
    const [otpError, setOtpError] = useState('')

    return (
        <ImageBackground style={styles.mainContainer} source={Images.IMG_LOGIN_BG} resizeMode="stretch" >
            <View style={styles.middleContainer} >
                <RegularText style={styles.title} >{Strings.verify_your_account}</RegularText>
                <RegularText style={styles.description}>
                    {`${Strings.enter_6_digit_code}${mobileNo ? ` ${COUNTRY_CODE} ${mobileNo}` : ""}`}
                </RegularText>
                <CommonOtpInput
                    // ref={ref => otpRef = ref}
                    otpCount={6}
                    onCodeFilled={(otp) => setOtp(otp)}
                    onCodeChange={(otp) => setOtp(otp)}
                    code={otp}
                    error={otpError}
                    editable={true}
                    autoFocusOnLoad={false}
                />
                {
                    canResendOtp ?
                        <TouchableOpacity onPress={() => onPressResendOTP()} >
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
                onPressButton={() => onPressVerifyOTP(otp)}
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

export default OtpVerficationScreen;