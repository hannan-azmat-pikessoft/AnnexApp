import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { shallowEqual, useSelector } from "react-redux";
import apiCall from "../../../../redux/services/apiCall";
import { API_USERS } from "../../../../redux/services/apiTypes";
import { spacing } from "../../../../styles/spacing";
import Strings from "../../../../translation/language";
import colors from "../../../../utility/colors";
import { changeStatusBarColor, convertDateTime, getErrorMessage, saveUserData } from "../../../../utility/commonFunctions";
import { KEYBOARD, STATUS_BAR_CONSTANTS } from "../../../../utility/constants";
import { isInputEmpty } from "../../../../utility/validations";
import CommonButton from "../../../common/buttons/CommonButton";
import flashMessage from "../../../common/CustomFlashAlert";
import CommonHeader from "../../../common/headers/CommonHeader";
import CommonLabelTextInput from "../../../common/inputBoxes/CommonLabelTextInput";
import CommonDateTimePicker from "../../../common/picker/CommonDateTimePicker";

const EditProfile = () => {

    const { userRes } = useSelector(state => ({ userRes: state.userReducer.userRes, }), shallowEqual)

    const [name, setName] = useState(userRes?.name || '')
    const [phoneNo, setPhoneNo] = useState(userRes?.phone || "")
    const [gender, setGender] = useState(userRes?.gender || "")
    const [DOB, setDOB] = useState(userRes?.dob || "")
    const [email, setEmail] = useState(userRes?.email || "")

    const [emailError, setEmailError] = useState("")
    const [DOBError, setDOBError] = useState("")
    const [genderError, setGenderError] = useState("")
    const [phoneNoError, setPhoneNoError] = useState("")
    const [nameError, setNameError] = useState("")

    const [loading, setLoading] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            changeStatusBarColor(colors.theme, STATUS_BAR_CONSTANTS.LIGHT, colors.appBackgroundColor)
        }, [])
    );

    function onSelectDate(date) {
        let labledDate = convertDateTime(date, 'DD/MM/YYYY')
        setDOB({ label: labledDate, value: date })
    }

    function onPressSubmit() {
        const validateName = isInputEmpty(name)
        const validatePhoneNo = isInputEmpty(phoneNo)
        const validateGender = isInputEmpty(gender)
        const validateDOB = isInputEmpty(DOB)
        const validateEmailAddress = isInputEmpty(email)

        if (!validateName.success) { setNameError(Strings.msg_please_enter_your_name) } else { setNameError('') }
        if (!validatePhoneNo.success) { setPhoneNoError(Strings.msg_enter_phone_no) } else { setPhoneNoError('') }
        if (!validateGender.success) { setGenderError(Strings.msg_enter_gender) } else { setGenderError('') }
        if (!validateDOB.success) { setDOBError(Strings.msg_enter_date_of_birth) } else { setDOBError('') }
        if (!validateEmailAddress.success) { setEmailError(Strings.msg_enter_email_address) } else { setEmailError('') }

        if (
            !validateName.success ||
            !validatePhoneNo.success ||
            !validateGender.success ||
            !validateDOB.success ||
            !validateEmailAddress.success
        ) { return }

        let data = {
            name: name,
            phone: phoneNo,
            gender: gender.toLowerCase(),
            dob: convertDateTime(DOB, 'YYYY-MM-DD'),
        }

        const apiData = {
            type: `${API_USERS}${userRes.id}/`,
            apiType: "PATCH",
            payload: data,
        }

        setLoading(true)
        apiCall(apiData)
            .then((res) => {
                saveUserData(res)
                setLoading(false)
                flashMessage(Strings.success, 'success', Strings.msg_profile_updated)
            })
            .catch((err) => {
                getErrorMessage(err)
                setLoading(false)
            })
    }

    return (
        <View style={styles.mainContainer}>
            <CommonHeader title={Strings.edit_personal_details} mainContainerStyle={{ height: spacing.HEIGHT_128 }} />
            <ScrollView  >
                <View style={styles.contentContainer} >
                    <View>
                        <CommonLabelTextInput
                            label={Strings.name}
                            placeHolder={"John Doe"}
                            value={name}
                            onChangeText={setName}
                            onSubmitEditing={() => { }}
                            error={nameError}
                            mainViewStyle={styles.inputViewStyle}
                        />

                        <CommonLabelTextInput
                            label={Strings.your_phone_number}
                            placeHolder={"999999999"}
                            value={phoneNo}
                            onChangeText={setPhoneNo}
                            onSubmitEditing={() => { }}
                            error={phoneNoError}
                            mainViewStyle={styles.inputViewStyle}
                            keyboardType={KEYBOARD.NUMBER_PAD}
                        />

                        <CommonLabelTextInput
                            label={Strings.gender}
                            placeHolder={"Male"}
                            value={gender}
                            onChangeText={setGender}
                            onSubmitEditing={() => { }}
                            error={genderError}
                            mainViewStyle={styles.inputViewStyle}
                        />

                        <CommonDateTimePicker
                            title={Strings.date_of_birth}
                            placeHolder={"DD/MM/YY"}
                            value={DOB}
                            label={Strings.date_of_birth}
                            editable={true}
                            mode={'date'}
                            maximumDate={new Date()}
                            onSelectDateTime={onSelectDate}
                            mainViewStyle={styles.inputViewStyle}
                            error={DOBError}
                        />

                        <CommonLabelTextInput
                            label={Strings.email_address}
                            placeHolder={"johndoe@example.com"}
                            value={email}
                            onChangeText={setEmail}
                            onSubmitEditing={() => { }}
                            error={emailError}
                            mainViewStyle={styles.inputViewStyle}
                            editable={false}
                            keyboardType={KEYBOARD.EMAIL_ADDRESS}
                        />
                    </View>
                    <CommonButton
                        title={Strings.submit}
                        marginTop={spacing.MARGIN_20}
                        buttonStyle={{ width: spacing.FULL_WIDTH - spacing.PADDING_18 }}
                        onPressButton={() => onPressSubmit()}
                        fetching={loading}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    contentContainer: {
        paddingHorizontal: spacing.PADDING_18,
        paddingVertical: spacing.PADDING_18
    },
    inputViewStyle: {
        marginBottom: spacing.MARGIN_16
    },
})

export default EditProfile;