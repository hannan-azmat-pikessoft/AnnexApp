import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet } from "react-native";
import { color } from "react-native-reanimated";
import { textScale } from "../../../../styles/responsiveStyles";
import { spacing } from "../../../../styles/spacing";
import { fontNames } from "../../../../styles/typography";
import Strings from "../../../../translation/language";
import colors from "../../../../utility/colors";
import { changeStatusBarColor } from "../../../../utility/commonFunctions";
import { STATUS_BAR_CONSTANTS } from "../../../../utility/constants";
import CommonHeader from "../../../common/headers/CommonHeader";
import RegularText from "../../../common/RegularText";

const AboutUs = () => {

    useFocusEffect(
        React.useCallback(() => {
            changeStatusBarColor(colors.theme, STATUS_BAR_CONSTANTS.LIGHT, colors.appBackgroundColor)
        }, [])
    );

    return (
        <View style={styles.mainContainer} >
            <CommonHeader title={Strings.about_us} mainContainerStyle={{ height: spacing.HEIGHT_128 }} />
            <View style={styles.aboutUsContainer} >
                <View style={{ flex: 1 }}>
                    <RegularText style={styles.aboutUsStyle} >{"Annex is a professional patient centered home healthcare company in UAE, committed to providing world-class and comprehensive care that brings value to our patients, their families in the community with reliable, compassionate and affordable care.\n\nNow, Care on Call can reach your doorstep to conduct Covid-19 swab tests. Our expert healthcare professionals will arrive at your home or office location, dressed in protective gear to conduct your swab test at a time that is convenient for you."}</RegularText></View>
                <View style={styles.termsAndConditonContainer} >
                    <RegularText style={styles.blueText} >{Strings.privacy}</RegularText>
                    <RegularText style={styles.blueText} >{Strings.terms_and_condition}</RegularText>
                    <RegularText style={styles.version} >{"v.1.3 | c2022"}</RegularText>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white
    },
    aboutUsContainer: {
        flex: 1,
        paddingHorizontal: spacing.PADDING_18,
        paddingTop: spacing.PADDING_18,
    },
    aboutUsStyle: {
        color: colors.grey600,
        fontSize: textScale(14),

    },
    termsAndConditonContainer: {
        alignItems: "center",
    },
    blueText: {
        fontSize: textScale(10),
        color: colors.theme,
        marginVertical: spacing.MARGIN_4,
        letterSpacing: spacing.WIDTH_2,
    },
    version: {
        color: colors.grey400,
        marginTop: spacing.MARGIN_8,
        marginBottom: spacing.MARGIN_14
    },
});

export default AboutUs