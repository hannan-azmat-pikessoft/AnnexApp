import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { getMyAddressAction } from "../../../../redux/actions/userActions";
import apiCall from "../../../../redux/services/apiCall";
import { API_ADDRESS } from "../../../../redux/services/apiTypes";
import { textScale } from "../../../../styles/responsiveStyles";
import { spacing } from "../../../../styles/spacing";
import { fontNames } from "../../../../styles/typography";
import Strings from "../../../../translation/language";
import colors from "../../../../utility/colors";
import { changeStatusBarColor, getErrorMessage, goBack, navigate } from "../../../../utility/commonFunctions";
import { GET_LIST, SCREEN_MANAGE_ADDRESS, SCREEN_SERVICE_BOOKING_APPOINTMENT, STATUS_BAR_CONSTANTS } from "../../../../utility/constants";
import { Images } from "../../../../utility/imagePaths";
import { isInputEmpty } from "../../../../utility/validations";
import CommonButton from "../../../common/buttons/CommonButton";
import CommonHeader from "../../../common/headers/CommonHeader";
import CommonLabelTextInput from "../../../common/inputBoxes/CommonLabelTextInput";
import CommonTextInput from "../../../common/inputBoxes/CommonTextInput";
import RegularText from "../../../common/RegularText";
import CommonImage from "../../../common/views/CommonImage";

const AddAddress = ({ route }) => {

    const { params } = route;
    const { location, data, from, onAddAddress } = params;
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false)
    const [villaNumber, setVillaNumber] = useState(data ? data.address_line.villa : '')
    const [buildingName, setBuildingName] = useState('')
    const [addressName, setAddressName] = useState('')
    const [addressNameError, setAddressNameError] = useState('')
    const [buildingNameError, setBuildingNameError] = useState('')
    const [villaNumberError, setVillaNumberError] = useState('')

    useEffect(() => {
        setDataInUi()
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            changeStatusBarColor(colors.theme, STATUS_BAR_CONSTANTS.LIGHT, colors.white)
        }, [])
    );

    function setDataInUi() {
        // let details = JSON.parse(data);
        // setVillaNumber(details.villa)
        // setBuildingName(details.villa)
        // setAddressName(details.villa)

    }

    function onPressConfirmLocation() {

        const validateVillaNumber = isInputEmpty(villaNumber)
        const validateBuildingName = isInputEmpty(buildingName)
        const validateAddress = isInputEmpty(addressName)

        if (!validateVillaNumber.success) { setVillaNumberError(Strings.msg_enter_your_villa_apartment_number) } else { setVillaNumberError('') }
        if (!validateBuildingName.success) { setBuildingNameError(Strings.msg_enter_your_building_name_street_number) } else { setBuildingNameError('') }
        if (!validateAddress.success) { setAddressNameError(Strings.msg_enter_address_number) } else { setAddressNameError('') }

        if (
            !validateVillaNumber.success ||
            !validateBuildingName.success ||
            !validateAddress.success
        ) { return }

        setLoading(true)

        const payload = {
            // latitude: "27.24046",
            // longitude: "77.4977",
            address_line: JSON.stringify({
                villa: villaNumber,
                street: buildingName,
                address: addressName
            })
        }

        if (location) {
            payload.latitude = location.latitude,
                payload.longitude = location.longitude
        }

        const apiData = {
            type: data ? API_ADDRESS + data.id : API_ADDRESS,
            apiType: data ? "PATCH" : "POST",
            payload: payload,
        }

        apiCall(apiData)
            .then((res) => {
                let data = {
                    query: `?start=0&limit=10`,
                    reqType: GET_LIST
                }
                dispatch(getMyAddressAction(data))
                if (from == SCREEN_SERVICE_BOOKING_APPOINTMENT) {
                    goBack()
                    onAddAddress(res)
                }
                else navigate(SCREEN_MANAGE_ADDRESS)
                setLoading(false)
            })
            .catch((err) => {
                getErrorMessage(err)
                setLoading(false)
            })
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }} >
            <CommonHeader title={Strings.fill_location_details} />
            {/* <View style={styles.searchBar}>
                <View style={styles.SearchBar_titleContainer} >
                    <CommonImage source={Images.IMG_MAP_MARKER_FILLED} style={{ tintColor: colors.white, marginRight: spacing.MARGIN_4 }} />
                    <RegularText style={styles.currentLocationText} >{Strings.current_location}</RegularText>
                </View>
                <CommonTextInput
                    placeHolder={"1st Cross st, 301 building, Dubai, united, arabic"}
                    rightComponent={<CommonImage source={Images.IMG_PEN} style={{ marginHorizontal: spacing.MARGIN_10 }} />}
                    inputContainerStyle={styles.textInputView}
                />
            </View> */}
            <ScrollView style={{ flex: 1, backgroundColor: colors.white }} key="AddAddress" >

                <View style={styles.fieldsContainer} >
                    <View style={{ flex: 1 }}>
                        <View style={styles.inputContainerStyle}>
                            <CommonLabelTextInput
                                label={Strings.villa_apartment_number}
                                placeHolder={Strings.enter_villa_apartment_number}
                                value={villaNumber}
                                error={villaNumberError}
                                onChangeText={(text) => setVillaNumber(text)}
                                onSubmitEditing={() => { }}
                            />
                        </View>
                        <View style={styles.inputContainerStyle}>
                            <CommonLabelTextInput
                                label={Strings.building_name_street_number}
                                placeHolder={Strings.enter_building_name}
                                value={buildingName}
                                error={buildingNameError}
                                onChangeText={(text) => setBuildingName(text)}
                                onSubmitEditing={() => { }}
                            />
                        </View>

                        <View style={styles.inputContainerStyle}>
                            <CommonLabelTextInput
                                label={Strings.address_name}
                                placeHolder={Strings.enter_address}
                                value={addressName}
                                error={addressNameError}
                                onChangeText={(text) => setAddressName(text)}
                                onSubmitEditing={() => { }}
                            />
                        </View>

                    </View>
                </View>
            </ScrollView>
            <CommonButton
                title={Strings.add_address}
                fetching={loading}
                onPressButton={() => onPressConfirmLocation()}
                buttonStyle={{ width: "90%", marginBottom: spacing.MARGIN_24, }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,

        // paddingHorizontal: spacing.PADDING_16
    },
    searchBar: {
        backgroundColor: colors.theme,
        paddingHorizontal: spacing.PADDING_18
    },
    SearchBar_titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: spacing.MARGIN_8
    },
    currentLocationText: {
        fontSize: textScale(14),
        fontFamily: fontNames.FONT_FAMILY_MEDIUM,
        color: colors.white,
        marginLeft: spacing.MARGIN_4
    },
    textInputView: {
        height: spacing.HEIGHT_40,
        marginTop: spacing.MARGIN_6
    },
    fieldsContainer: {
        flex: 1,
        paddingHorizontal: spacing.PADDING_18,
        marginTop: spacing.MARGIN_40,
        marginBottom: spacing.MARGIN_20
    },
    inputContainerStyle: {
        marginBottom: spacing.MARGIN_24

    }

})

export default AddAddress;