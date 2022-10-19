import { useFocusEffect } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { FlatList, Keyboard, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
import { boxShadowLess } from "../../../../styles/Mixins";
import { moderateScaleVertical, textScale } from "../../../../styles/responsiveStyles";
import { spacing } from "../../../../styles/spacing";
import Strings from "../../../../translation/language";
import colors from "../../../../utility/colors";
import { changeStatusBarColor, goBack, navigate, searchLocation } from "../../../../utility/commonFunctions";
import { KEYBOARD, SCREEN_ADD_ADDRESS, STATUS_BAR_CONSTANTS } from "../../../../utility/constants";
import { Images } from "../../../../utility/imagePaths";
import CommonButton from "../../../common/buttons/CommonButton";
import CommonHeader from "../../../common/headers/CommonHeader";
import CommonLabelTextInput from "../../../common/inputBoxes/CommonLabelTextInput";
import CommonTextInput from "../../../common/inputBoxes/CommonTextInput";
import RegularText from "../../../common/RegularText";
import CommonImage from "../../../common/views/CommonImage";
import SelectLocationOnMapComponent from "../../../modules/SelectLocationOnMapComponent";

const SelectLocationOnMap = ({ route }) => {
    const mapComponentRef = useRef()

    const { params } = route
    const { item, from, onSelectAddress } = params

    const [location, setLocation] = useState({ latitude: item && item.latitude ? JSON.parse(item.latitude) : "", longitude: item && item.longitude ? JSON.parse(item.longitude) : "" })
    const [searchText, setSearchText] = useState('')
    const [searhingLocation, setSearhingLocation] = useState(false)
    const [searchLocationRes, setSearchLocationRes] = useState(undefined)
    const [fullAddress, setFullAddress] = useState("")

    useFocusEffect(
        React.useCallback(() => {
            changeStatusBarColor(colors.theme, STATUS_BAR_CONSTANTS.LIGHT, colors.transparent)
        }, [])
    );

    function onSelectLocation(coordinates) {
        setLocation(coordinates)
    }

    function onSearchLocation(query) {
        setSearchText(query)
        if (query == '') {
            setSearhingLocation(false)
            return
        }
        setSearhingLocation(true)
        searchLocation(query).then(res => { setSearchLocationRes(res); alert(JSON.stringify(res)) })
    }

    function onSelectSearchLocation(item) {
        let data = {
            latitude: item.geometry.location.lat,
            longitude: item.geometry.location.lng,
            latitudeDelta: deltaValues.latitudeDelta,
            longitudeDelta: deltaValues.longitudeDelta
        }
        onSelectLocation({ latitude: JSON.parse(item.geometry.location.lat), longitude: JSON.parse(item.geometry.location.lng) })
        setSearhingLocation(false)
        setSearchText(item.formatted_address.substr(0, 100))
        setFullAddress(item.formatted_address)
        if (mapComponentRef.current) {
            mapComponentRef.current.animateToRegion(data, 2000)
        }
    }

    function onPressConfirmLocation(loc) {
        navigate(SCREEN_ADD_ADDRESS, { location: loc, data: item, from: from, onAddAddress: onAddAddress })
    }
    function onAddAddress(address) {
        onSelectAddress(address)
        goBack()
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }} >
            <CommonHeader title={Strings.select_your_location} />
            {/* <View style={styles.searchBar}>
                <CommonTextInput
                    placeHolder={"dubai, united emirates arab"}
                    leftComponent={<CommonImage source={Images.IMG_SEARCH_ICON} />}
                    inputContainerStyle={styles.textInputView}
                    value={searchText}
                    error={""}
                    onChangeText={(text) => onSearchLocation(text)}
                    keyboardType={KEYBOARD.DEFAULT}
                    returnKeyType={'done'}
                    secureTextEntry={false}
                    onSubmitEditing={() => { Keyboard.dismiss() }}
                    mainViewStyle={{ paddingHorizontal: spacing.PADDING_12 }}
                />

                {
                    // searhingLocation == true ?
                    <View style={styles.searchResView} >
                        {
                            // searchLocationRes &&
                            <FlatList
                                data={[1, 1]}
                                keyExtractor={(item, index) => String(index)}
                                key={({ index }) => index.toString()}
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item, index }) => {
                                    return (
                                        <TouchableOpacity style={{ paddingVertical: spacing.PADDING_4, paddingHorizontal: spacing.PADDING_12, }} onPress={() => onSelectSearchLocation(item)} >
                                            <RegularText style={{ fontSize: textScale(10) }} >{"sdfghjk"} </RegularText>
                                            <View style={{ height: 1, backgroundColor: colors.grey300, marginTop: spacing.MARGIN_8 }} />
                                        </TouchableOpacity>
                                        // <TouchableOpacity style={{ paddingVertical: spacing.PADDING_4, paddingHorizontal: spacing.PADDING_12 }} onPress={() => onSelectSearchLocation(item)} >
                                        //     <RegularText style={{ fontSize: textScale(10) }} >{item.name + ', ' + item.formatted_address} </RegularText>
                                        //     <View style={{ height: 1, backgroundColor: colors.grey300, marginTop: spacing.MARGIN_8 }} />
                                        // </TouchableOpacity>
                                    )
                                }
                                }
                            />
                        }
                    </View>
                    // : null
                }
            </View> */}
            <View style={{ flex: 1, }} >
                <SelectLocationOnMapComponent
                    onPressButton={(loc) => onPressConfirmLocation(loc)}
                    initialLatitude={location.latitude}
                    initialLongitude={location.longitude}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    searchBar: {
        paddingHorizontal: spacing.PADDING_18,
        paddingVertical: spacing.PADDING_8,
        backgroundColor: colors.theme,
        // borderWidth: 2,
        // flex: 1
        // height :
    },
    textInputView: {
        height: spacing.HEIGHT_34,
        paddingHorizontal: spacing.PADDING_8,
        alignItems: "center",
    },
    buttonStyle: {
        width: '50%'
    },

    searchResView: {
        backgroundColor: colors.grey100,
        alignSelf: 'center',
        width: spacing.FULL_WIDTH,
        // marginTop: spacing.MARGIN_8,
        position: 'absolute',
        top: spacing.HEIGHT_54,
        zIndex: 9999,
        maxHeight: spacing.FULL_HEIGHT / 2,
        flex: 1,
        borderBottomLeftRadius: spacing.RADIUS_8,
        borderBottomRightRadius: spacing.RADIUS_8,
        paddingHorizontal: spacing.PADDING_4,
        ...boxShadowLess()
    }

})

export default SelectLocationOnMap;