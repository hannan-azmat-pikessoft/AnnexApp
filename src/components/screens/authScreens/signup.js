import React, { useEffect, useState } from 'react';
import { ImageBackground, Keyboard, StyleSheet, View } from 'react-native';
import apiCall from '../../../redux/services/apiCall';
import { API_USERS, API_USERS_PROFILE_UPDATE } from '../../../redux/services/apiTypes';
import { textScale } from '../../../styles/responsiveStyles';
import { spacing } from '../../../styles/spacing';
import { fontNames } from '../../../styles/typography';
import Strings from '../../../translation/language';
import colors from '../../../utility/colors';
import { getErrorMessage, loginUser, navigate, onLoginSignupSuccess } from '../../../utility/commonFunctions';
import { KEYBOARD, KEY_USER_DATA, SCREEN_HOME } from '../../../utility/constants';
import { retrieveItem } from '../../../utility/customAsyncStorage';
import { Images } from '../../../utility/imagePaths';
import { isInputEmpty, validateEmail } from '../../../utility/validations';
import CommonButton from '../../common/buttons/CommonButton';
import CommonTextInput from '../../common/inputBoxes/CommonTextInput';
import RegularText from '../../common/RegularText';


const SignupScreen = ({ }) => {

    const [loading, setLoading] = useState(false)
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
        setLoading(true)

        const validateName = isInputEmpty(name);
        const validateEmailAddress = validateEmail(email);

        if (!validateName.success) { setNameError(Strings.msg_please_enter_your_name) } else { setNameError("") }
        if (!validateEmailAddress.success) { setEmailError(validateEmailAddress.msg) } else { setEmailError("") }

        if (!validateEmailAddress.success || !validateName.success) { return }

        const payload = {
            name: name,
            email: email,
        }

        const apiData = {
            type: API_USERS,
            apiType: "PATCH",
            payload: payload,
        }
        retrieveItem(KEY_USER_DATA)
            .then((res) => {

                apiData.type = API_USERS + res.id + "/"

                apiCall(apiData)
                    .then((res) => {
                        onLoginSignupSuccess(res, true)
                            .then(() => {
                                setLoading(false)
                            })
                        setLoading(false)
                    })
                    .catch((err) => {
                        getErrorMessage(err)
                        setLoading(false)
                    })
            })


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