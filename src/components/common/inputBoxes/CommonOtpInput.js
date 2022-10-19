import OTPInputView from '@twotalltotems/react-native-otp-input';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { textScale } from '../../../styles/responsiveStyles';
import { spacing } from '../../../styles/spacing';
import { fontNames } from '../../../styles/typography';
import colors from '../../../utility/colors';
import RegularText from '../RegularText';

const CommonOtpInput = ({
    borderBottomColor,
    error,
    autoFocusOnLoad,
    otpCount,
    onCodeChange,
    onCodeFilled,
    code,
    editable,
    codeInputFieldStyle,
    codeInputHighlightStyle,
    ref
}) => {

    return (
        <View style={[styles.mainView, { borderBottomColor: borderBottomColor != undefined ? borderBottomColor : colors.white }]}>
            <OTPInputView
                // ref={ref}
                style={{ width: '100%', height: spacing.HEIGHT_50, }}
                pinCount={otpCount || 6}
                code={code}
                onCodeChanged={code => { onCodeChange(code) }}
                onCodeFilled={(code => { onCodeFilled(code); onCodeChange(code) })}
                autoFocusOnLoad={false}
                codeInputFieldStyle={[styles.underlineStyleBase, codeInputFieldStyle]}
                codeInputHighlightStyle={[styles.underlineStyleHighLighted, codeInputHighlightStyle]}
                editable={editable}
                keyboardType='phone-pad'
            />
            {
                error != '' &&
                < RegularText
                    title={error}
                    textStyle={styles.errorStyle}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        marginTop: spacing.MARGIN_24
    },
    underlineStyleBase: {
        width: spacing.HEIGHT_50,
        height: spacing.HEIGHT_50,
        borderWidth: 2,
        borderRadius: spacing.RADIUS_8,
        borderColor: colors.white,
        color: colors.white,
        fontSize: textScale(16),
        fontFamily: fontNames.FONT_FAMILY_REGULAR,
    },
    underlineStyleHighLighted: {
        borderColor: colors.white,
    },
});

export default CommonOtpInput;