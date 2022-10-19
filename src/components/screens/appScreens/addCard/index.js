import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { spacing } from "../../../../styles/spacing";
import Strings from "../../../../translation/language";
import colors from "../../../../utility/colors";
import { changeStatusBarColor } from "../../../../utility/commonFunctions";
import { STATUS_BAR_CONSTANTS } from "../../../../utility/constants";
import { Images } from "../../../../utility/imagePaths";
import { isInputEmpty } from "../../../../utility/validations";
import CommonButton from "../../../common/buttons/CommonButton";
import CommonHeader from "../../../common/headers/CommonHeader";
import CommonLabelTextInput from "../../../common/inputBoxes/CommonLabelTextInput";
import RegularText from "../../../common/RegularText";
import CommonImage from "../../../common/views/CommonImage";
import VirtualizedView from "../../../common/views/VirtualizedView";

const AddCard = () => {

    const [saveCard, setSaveCard] = useState(false)

    const [name, setName] = useState(false)
    const [cardNumber, setCardNumber] = useState(false)
    const [expiryDate, setExpiryDate] = useState(false)
    const [CVV, setCVV] = useState(false)

    const [nameError, setNameError] = useState(false)
    const [cardNumberError, setCardNumberError] = useState(false)
    const [expiryDateError, setExpiryDateError] = useState(false)
    const [CVVError, setCVVError] = useState(false)

    useFocusEffect(
        React.useCallback(() => {
            changeStatusBarColor(colors.theme, STATUS_BAR_CONSTANTS.LIGHT, colors.white)
        }, [])
    );

    function onPressSaveCard() {
        if (saveCard) {
            setSaveCard(false)
        }
        else {
            setSaveCard(true)
        }
    }

    function onPressAddCard() {
        const validateName = isInputEmpty(name)
        const validateCardNumber = isInputEmpty(cardNumber)
        const validateExpiryDate = isInputEmpty(expiryDate)
        const validateCVV = isInputEmpty(CVV)

        if (!validateName.success) { setNameError(Strings.msg_please_enter_your_name) } else { setNameError('') }
        if (!validateCardNumber.success) { setCardNumberError(Strings.msg_enter_card_number) } else { setCardNumberError('') }
        if (!validateExpiryDate.success) { setExpiryDateError(Strings.msg_enter_expiry_date) } else { setExpiryDateError('') }
        if (!validateCVV.success) { setCVVError(Strings.msg_enter_cvv) } else { setCVVError('') }

        if (!validateName.success ||
            // !packagePhotoValidate.success ||
            !validateCardNumber.success ||
            !validateCardNumber.success ||
            !validateExpiryDate.success ||
            !validateCVV.success
        ) { return }


    }

    return (
        <View style={{ flex: 1 }} >
            <CommonHeader title={Strings.add_card} />
            <VirtualizedView style={{ backgroundColor: colors.white }}  >
                <View style={styles.topContatiner} >
                    <CommonLabelTextInput
                        label={Strings.name}
                        placeHolder={"Wazil"}
                        onChangeText={() => setName}
                        onSubmitEditing={() => { }}
                        error={nameError}
                        mainViewStyle={styles.inputViewStyle}
                    />
                    <CommonLabelTextInput
                        label={Strings.card_number}
                        placeHolder={"0000 0000 0000 0000"}
                        onChangeText={() => setCardNumber}
                        onSubmitEditing={() => { }}
                        error={cardNumberError}
                        leftComponent={<CommonImage source={Images.IMG_CREDIT_CARD_FILLED} />}
                        mainViewStyle={styles.inputViewStyle}
                    />
                    <View style={styles.expAndCvvContainer} >
                        <CommonLabelTextInput
                            label={Strings.exp_date}
                            placeHolder={"MM/YY"}
                            onChangeText={() => setExpiryDate}
                            onSubmitEditing={() => { }}
                            error={expiryDateError}
                            mainViewStyle={[styles.inputViewStyle, { flex: 1, marginRight: spacing.MARGIN_10 }]}
                        />
                        <CommonLabelTextInput
                            label={Strings.cvv}
                            placeHolder={"123"}
                            onChangeText={() => setCVV}
                            onSubmitEditing={() => { }}
                            error={CVVError}
                            mainViewStyle={[styles.inputViewStyle, { flex: 1, marginLeft: spacing.MARGIN_10 }]} />
                    </View>

                    <View style={styles.saveCardcontainer} >
                        <TouchableOpacity style={{ marginRight: spacing.MARGIN_12 }} onPress={() => onPressSaveCard()} >
                            {
                                saveCard ?
                                    <CommonImage source={Images.IMG_ACTIVE_SELECTION} />
                                    :
                                    <CommonImage source={Images.IMG_INACTIVE_SELECTION} />
                            }
                        </TouchableOpacity>
                        <RegularText>{Strings.save_your_card_securely_for_faster_checkout}</RegularText>
                    </View>

                </View>
                <CommonButton onPressButton={onPressAddCard}
                    title={Strings.add_card}
                    buttonStyle={{ width: "90%" }}
                    marginTop={spacing.MARGIN_36} />

            </VirtualizedView>
        </View>
    )
}

const styles = StyleSheet.create({
    topContatiner: {
        paddingHorizontal: spacing.PADDING_18,
        marginTop: spacing.MARGIN_22,
    },
    expAndCvvContainer: {
        flexDirection: "row"
    },
    saveCardcontainer: {
        flexDirection: "row",
        marginTop: spacing.MARGIN_10
    },
    inputViewStyle: {
        marginBottom: spacing.MARGIN_16
    },


})

export default AddCard;