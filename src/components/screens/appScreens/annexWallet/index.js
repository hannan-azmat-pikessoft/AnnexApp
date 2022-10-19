import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { View, ScrollView, StyleSheet, Share } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { shallowEqual, useSelector } from "react-redux";
import { textScale } from "../../../../styles/responsiveStyles";
import { spacing } from "../../../../styles/spacing";
import { fontNames } from "../../../../styles/typography";
import Strings from "../../../../translation/language";
import colors from "../../../../utility/colors";
import { changeStatusBarColor } from "../../../../utility/commonFunctions";
import { STATUS_BAR_CONSTANTS } from "../../../../utility/constants";
import { Images } from "../../../../utility/imagePaths";
import CommonButton from "../../../common/buttons/CommonButton";
import CommonHeader from "../../../common/headers/CommonHeader";
import RegularText from "../../../common/RegularText";
import CommonImage from "../../../common/views/CommonImage";

const AnnexWallet = () => {

    const { userRes } = useSelector(state => ({ userRes: state.userReducer.userRes, }), shallowEqual)

    useFocusEffect(
        React.useCallback(() => {
            changeStatusBarColor(colors.theme, STATUS_BAR_CONSTANTS.LIGHT, colors.appBackgroundColor)
        }, [])
    );

    const onPressShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'Refferal Code ' + "A1020-192",
            });
        }
        catch (error) {

        }
    }
    return (
        <View style={{ flex: 1 }} >
            <CommonHeader title={Strings.annex_wallet} mainContainerStyle={{ height: spacing.HEIGHT_128 }} />
            <ScrollView>
                <View style={styles.mainView} >
                    <LinearGradient style={styles.cardView} colors={['#239CF8', '#68BEFF']} >
                        <RegularText style={styles.cardTitle} >{Strings.get_free_credit}</RegularText>
                        <RegularText style={styles.cardText} >{"Annex Health is a professional patient centered home healthcare company in UAE, committed to providing world-class and comprehensive care that brings value to our patients, their families in the community with reliable, compassionate and affordable care."}</RegularText>
                        <View style={styles.cardBottomContainer} >
                            <View style={styles.codeContainer}>
                                <RegularText style={styles.code} >{"A1020-192"}</RegularText>
                                <CommonImage source={Images.IMG_CLIPBBOARD} />
                            </View>
                            <CommonButton
                                title={Strings.share}
                                buttonStyle={styles.shareButton}
                                backgroundColor={colors.secondaryColor}
                                onPressButton={onPressShare}
                                textStyle={{ fontSize: textScale(10), fontFamily: fontNames.FONT_FAMILY_MEDIUM }}
                            />
                        </View>
                    </LinearGradient >

                    <RegularText style={styles.title} >{Strings.total_credits_earned}</RegularText>
                    <RegularText style={styles.price} >{Strings.aed + " " + userRes.total_credit_earned}</RegularText>
                    <View style={styles.seprator} />

                    <RegularText style={styles.title}>{Strings.credits_remaining}</RegularText>
                    <RegularText style={styles.price}>{Strings.aed + " " + userRes.total_credit_earned}</RegularText>
                    <View style={styles.seprator} />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        paddingHorizontal: spacing.PADDING_18,
        paddingTop: spacing.PADDING_18,
    },
    cardView: {
        paddingHorizontal: spacing.PADDING_20,
        paddingVertical: spacing.PADDING_20,
        backgroundColor: colors.theme,
        borderRadius: spacing.RADIUS_8,
        marginBottom: spacing.MARGIN_20
    },
    cardTitle: {
        fontSize: textScale(10),
        fontFamily: fontNames.FONT_FAMILY_MEDIUM,
        color: colors.white,
        letterSpacing: spacing.WIDTH_1,
    },
    cardText: {
        fontSize: textScale(12),
        fontFamily: fontNames.FONT_FAMILY_LIGHT,
        color: colors.white,
        marginTop: spacing.MARGIN_8,
    },
    cardBottomContainer: {
        flexDirection: "row",
        marginTop: spacing.MARGIN_16,
        alignItems: 'center'
    },
    codeContainer: {
        flex: 1,
        flexDirection: "row",
    },
    code: {
        fontSize: textScale(12),
        fontFamily: fontNames.FONT_FAMILY_BOLD,
        marginRight: spacing.MARGIN_8
    },
    shareButton: {
        borderRadius: spacing.RADIUS_50,
        paddingHorizontal: spacing.PADDING_30,
        paddingVertical: spacing.PADDING_8,
    },
    title: {
        fontSize: textScale(9),
        letterSpacing: spacing.WIDTH_2,
        color: colors.grey500,
        marginBottom: spacing.MARGIN_4,
        fontFamily: fontNames.FONT_FAMILY_MEDIUM
    },
    price: {
        fontSize: textScale(12),
        fontFamily: fontNames.FONT_FAMILY_BOLD
    },
    seprator: {
        height: spacing.HEIGHT_1,
        backgroundColor: colors.grey300,
        marginVertical: spacing.MARGIN_16,
        marginHorizontal: -spacing.PADDING_18
    },
})

export default AnnexWallet;