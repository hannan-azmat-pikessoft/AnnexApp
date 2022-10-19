import React, { useEffect, useState } from 'react';
import { ImageBackground, Keyboard, StyleSheet, View } from 'react-native';
import { textScale } from '../../../styles/responsiveStyles';
import { spacing } from '../../../styles/spacing';
import { fontNames } from '../../../styles/typography';
import Strings from '../../../translation/language';
import colors from '../../../utility/colors';
import { KEYBOARD } from '../../../utility/constants';
import { Images } from '../../../utility/imagePaths';
import { isInputEmpty, validateEmail } from '../../../utility/validations';
import CommonButton from '../../common/buttons/CommonButton';
import CommonTextInput from '../../common/inputBoxes/CommonTextInput';
import RegularText from '../../common/RegularText';

const SignupScreen = ({ onPressSignup, loading }) => {

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')

    const [emailError, setEmailError] = useState('')
    const [nameError, setNameError] = useState('')

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => { setKeyboardVisible(true); });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => { setKeyboardVisible(false); });
        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    function onPressCreate() {
        const validateName = isInputEmpty(name);
        const validateEmailAddress = validateEmail(email);

        if (!validateName.success) { setNameError(Strings.msg_please_enter_your_name) } else { setNameError("") }
        if (!validateEmailAddress.success) { setEmailError(validateEmailAddress.msg) } else { setEmailError("") }

        if (!validateEmailAddress.success || !validateName.success) { return }

        const payload = {
            name: name,
            email: email,
        }
        onPressSignup(payload)
    }

    return (
        <ImageBackground style={styles.mainContainer} source={Images.IMG_LOGIN_BG} resizeMode="stretch" >
            {!isKeyboardVisible && <RegularText style={styles.welcomeText} >{Strings.welcome_to + " " + Strings.annex}</RegularText>}
            {!isKeyboardVisible && <RegularText style={styles.descriptionText} >{Strings.create_your_new_account}</RegularText>}
            <View style={{
                flex: isKeyboardVisible ? 1 : undefined,
                justifyContent: isKeyboardVisible ? 'center' : 'flex-end',
                marginTop: isKeyboardVisible ? spacing.MARGIN_20 : 0,
            }} >
                <CommonTextInput
                    placeHolder={Strings.email}
                    onSubmitEditing={() => { }}
                    onChangeText={(text) => setEmail(text)}
                    editable={true}
                    value={email}
                    error={emailError}
                    keyboardType={KEYBOARD.EMAIL_ADDRESS}
                />
                <CommonTextInput
                    placeHolder={Strings.give_name}
                    onSubmitEditing={() => { }}
                    onChangeText={(text) => setName(text)}
                    editable={true}
                    value={name}
                    error={nameError}
                    inputContainerStyle={styles.inputContainerStyle}
                />
                {
                    !isKeyboardVisible &&
                    <CommonButton
                        title={Strings.create}
                        textStyle={styles.buttonText}
                        buttonStyle={styles.buttonStyle}
                        onPressButton={onPressCreate}
                        marginTop={spacing.MARGIN_34}
                        fetching={loading}
                    />
                }
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingHorizontal: spacing.PADDING_30,
        paddingBottom: "8%",
        justifyContent: "flex-end"
    },
    welcomeText: {
        fontSize: textScale(23),
        fontFamily: fontNames.FONT_FAMILY_BOLD,
        color: colors.white
    },
    descriptionText: {
        fontSize: textScale(12),
        fontFamily: fontNames.FONT_FAMILY_MEDIUM,
        color: colors.white,
        marginBottom: spacing.MARGIN_36,
        marginTop: spacing.MARGIN_4
    },
    inputContainerStyle: {
        marginTop: spacing.MARGIN_18,
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

export default SignupScreen;