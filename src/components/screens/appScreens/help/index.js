import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, TouchableOpacity, } from "react-native";
import { textScale } from "../../../../styles/responsiveStyles";
import { spacing } from "../../../../styles/spacing";
import { fontNames } from "../../../../styles/typography";
import Strings from "../../../../translation/language";
import colors from "../../../../utility/colors";
import { changeStatusBarColor, dialCall, openMailApp, openURL } from "../../../../utility/commonFunctions";
import { STATUS_BAR_CONSTANTS } from "../../../../utility/constants";
import { Images } from "../../../../utility/imagePaths";
import CommonHeader from "../../../common/headers/CommonHeader";
import RegularText from "../../../common/RegularText";
import CommonImage from "../../../common/views/CommonImage";
import VirtualizedView from "../../../common/views/VirtualizedView";
import FrequentlyAskedQuestionComponent from "../../../modules/FrequentlyAskedQuestionComponent";

const Help = () => {

    useFocusEffect(
        React.useCallback(() => {
            changeStatusBarColor(colors.theme, STATUS_BAR_CONSTANTS.LIGHT, colors.appBackgroundColor)
        }, [])
    );

    function onPressEmail() {
        openMailApp("info@annex.ae")
    }

    function onPressWebsite() {
        openURL("https:www.annex.ae")

    }

    function onPressContactno() {
        dialCall("+9715666682143")
    }


    return (
        <View style={{ flex: 1, backgroundColor: colors.white }} >
            <CommonHeader title={Strings.help} mainContainerStyle={{ height: spacing.HEIGHT_128 }} />
            <VirtualizedView>
                <View style={styles.contentContainer} >

                    <RegularText style={styles.title} >{Strings.contact_info}</RegularText>
                    <View style={styles.contactInfoContainer} >
                        <TouchableOpacity onPress={() => onPressEmail()} style={styles.commonStyle}>
                            <CommonImage source={Images.IMG_EMAIL} style={styles.contactInfoIcon} />
                            <RegularText style={styles.contactInfoText} >{"info@annex.ae"}</RegularText>
                        </TouchableOpacity >
                        <TouchableOpacity onPress={() => onPressWebsite()} style={[styles.commonStyle, { marginVertical: spacing.MARGIN_6 }]}>
                            <CommonImage source={Images.IMG_GLOBE} style={styles.contactInfoIcon} />
                            <RegularText style={styles.contactInfoText} >{"www.annex.ae"}</RegularText>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onPressContactno()} style={styles.commonStyle}>
                            <CommonImage source={Images.IMG_PHONE} style={[styles.contactInfoIcon, { marginLeft: spacing.MARGIN_2 }]} />
                            <RegularText style={styles.contactInfoText}>{"+971 5666 82143"}</RegularText>
                        </TouchableOpacity >
                    </View>

                    <TouchableOpacity onPress={() => onPressEmail()} style={[styles.writeToUsContainer, { marginVertical: spacing.MARGIN_18, }]} >
                        <RegularText style={styles.cardText} >{Strings.write_to_us}</RegularText>
                        <CommonImage source={Images.IMG_DOWN_ARROW} style={styles.rightArrowImage} />
                    </TouchableOpacity >

                    <FrequentlyAskedQuestionComponent />
                </View>
            </VirtualizedView>
        </View>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        paddingHorizontal: spacing.PADDING_18,
        paddingTop: spacing.PADDING_18,

    },
    title: {
        fontSize: textScale(9),
        fontFamily: fontNames.FONT_FAMILY_MEDIUM,
        color: colors.grey500,
        letterSpacing: spacing.WIDTH_2,
    },
    contactInfoContainer: {
        backgroundColor: colors.grey200,
        paddingVertical: spacing.PADDING_18,
        borderRadius: spacing.RADIUS_8,
        marginTop: spacing.MARGIN_16
    },
    contactInfoText: {
        fontFamily: fontNames.FONT_FAMILY_MEDIUM,
        fontSize: textScale(12)
    },
    commonStyle: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        paddingHorizontal: spacing.PADDING_18
    },
    contactInfoIcon: {
        marginRight: spacing.MARGIN_6,

    },
    writeToUsContainer: {
        backgroundColor: colors.grey200,
        flexDirection: "row",
        paddingHorizontal: spacing.PADDING_18,
        paddingVertical: spacing.PADDING_12,
        marginVertical: spacing.MARGIN_8,
        alignItems: "center",
        borderRadius: spacing.RADIUS_8
    },
    cardText: {
        flex: 1,
        fontSize: textScale(11),
        fontFamily: fontNames.FONT_FAMILY_MEDIUM
    },
    rightArrowImage: {
        transform: [{ rotate: '270deg' }],
    },
    questionsContainer: {

    },
})

export default Help;