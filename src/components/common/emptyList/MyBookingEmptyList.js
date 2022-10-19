import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { spacing } from "../../../styles/spacing";
import { fontNames } from "../../../styles/typography";
import Strings from "../../../translation/language";
import colors from "../../../utility/colors";
import { navigate } from "../../../utility/commonFunctions";
import { SCREEN_HOME } from "../../../utility/constants";
import { Images } from "../../../utility/imagePaths";
import RegularText from "../RegularText";
import CommonImage from "../views/CommonImage";

const MyBookingEmptyList = () => {

    function onPressMakeBooking() {
        navigate(SCREEN_HOME)
    }

    return (
        <View style={styles.mainContainer} >
            <View style={{ flex: 1, }} />
            <View style={{ justifyContent: "center", alignItems: "center" }} >
                <RegularText style={styles.noBookingText} >{Strings.no_booking_found}</RegularText>
                <TouchableOpacity onPress={() => onPressMakeBooking()} style={styles.TouchableOpacityStyle} >
                    <CommonImage source={Images.IMG_ADD} style={{ tintColor: colors.theme }} />
                    <RegularText style={styles.buttonTextStyle} >{Strings.make_a_booking}</RegularText>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, }} />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        height: spacing.FULL_HEIGHT / 2
    },
    secondaryContainer: {

    },
    TouchableOpacityStyle: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: spacing.MARGIN_8
    },
    buttonTextStyle: {
        marginLeft: spacing.MARGIN_4,
        color: colors.theme,
        fontFamily: fontNames.FONT_FAMILY_BOLD
    },
    noBookingText: {
        color: colors.grey500
    },
})

export default MyBookingEmptyList;