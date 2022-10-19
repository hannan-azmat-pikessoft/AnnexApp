import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import * as Animatable from 'react-native-animatable';
import { getVersion } from "react-native-device-info";
import { shallowEqual, useSelector } from "react-redux";
import { textScale } from "../../../../styles/responsiveStyles";
import { spacing } from "../../../../styles/spacing";
import { fontNames } from "../../../../styles/typography";
import Strings from "../../../../translation/language";
import colors from "../../../../utility/colors";
import { changeStatusBarColor, clearUserData, navigate } from "../../../../utility/commonFunctions";
import { ANIMATION_TYPES, EASING_TYPE, SCREEN_ABOUT_US, SCREEN_ANNEX_WALLET, SCREEN_EDIT_PROFILE, SCREEN_HELP, SCREEN_MANAGE_ADDRESS, STATUS_BAR_CONSTANTS } from "../../../../utility/constants";
import { Images } from "../../../../utility/imagePaths";
import RegularText from "../../../common/RegularText";
import CommonImage from "../../../common/views/CommonImage";
import CommonProfileImage from "../../../common/views/CommonProfileImage";
import ChangeLanguageModel from "../../../modals/changeLanguageModel";
import WebViewModal from "../../../modals/webViewModal";

const RenderMenuItem = ({ icon, title, onPress, iconStyle }) => {
    return (
        <Animatable.View
            animation={ANIMATION_TYPES.FADE_IN}
            duration={500}
            easing={EASING_TYPE.EASE_IN_OUT}>
            <TouchableOpacity style={styles.menuContainer} onPress={() => onPress()} >
                <View style={styles.menuContainer_leftContainer} >
                    <CommonImage style={[styles.menuIcon, iconStyle]} source={icon} />
                    <RegularText style={styles.menuTitle}>{title}</RegularText>
                </View>
                <CommonImage source={Images.IMG_DOWN_ARROW} style={styles.rightArrow} />
            </TouchableOpacity>
        </Animatable.View>
    )
}
// 
const Setting = () => {

    const [showChangeLanguageModel, setShowChangeLanguageModel] = useState(false)
    const [showWebViewModel, setShowWebViewModel] = useState(false)
    const [webLink, setWebLink] = useState('')
    const [webViewTitle, setWebViewTitle] = useState('')

    const {
        isGuestUser,
        userRes
    } = useSelector(state => ({
        isGuestUser: state.authReducer.isGuestUser,
        userRes: state.userReducer.userRes,
    }), shallowEqual)

    useFocusEffect(
        React.useCallback(() => {
            changeStatusBarColor(colors.theme, STATUS_BAR_CONSTANTS.LIGHT, colors.white)
        }, [])
    );

    function onPressEditProfile() {
        navigate(SCREEN_EDIT_PROFILE)
    }
    function onPressManageAddress() {
        navigate(SCREEN_MANAGE_ADDRESS)
    }
    // function onPressManageCards() {
    //     navigate(SCREEN_MANAGE_CARD)
    // }
    function onPressHelp() {
        navigate(SCREEN_HELP)
    }
    function onPressAnnexWallet() {
        navigate(SCREEN_ANNEX_WALLET)
    }
    function onPressAboutUs() {
        navigate(SCREEN_ABOUT_US)
    }
    function onPressLanguage() {
        setShowChangeLanguageModel(true)
    }
    function onPressCloseLanguageModel() {
        setShowChangeLanguageModel(false)
    }
    function onPressPrivacy() {
        setWebLink("http://annexhealth.ae/policy.html")
        setWebViewTitle(Strings.privacy_policy)
        setShowWebViewModel(true)
    }
    function onPressTermsAndCondition() {
        setWebLink("http://annexhealth.ae/terms.html")
        setWebViewTitle(Strings.terms_and_condition)
        setShowWebViewModel(true)
    }
    function onCloseWebViewModel() {
        setShowWebViewModel(false)
        setWebViewTitle('')
        setWebLink('')
    }
    function onPressLogout() {
        clearUserData()
    }
    return (
        <>
            {
                isGuestUser ?
                    null
                    :
                    <View style={styles.mainContainer} >
                        <ScrollView>
                            <View>
                                <View style={styles.topContainer} >
                                    <View style={styles.topContainer_left} >
                                        <RegularText style={styles.name} >{`${Strings.hello} ${userRes?.name || ''}`}</RegularText>
                                        <TouchableOpacity onPress={() => onPressEditProfile()} >
                                            <RegularText style={styles.viewAndEditText} >{Strings.view_and_edit_profile}</RegularText>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.topContainer_right} >
                                        <CommonProfileImage
                                            uri={userRes?.profile_photo}
                                            style={styles.profilePhoto}
                                            name={userRes?.name || ''}
                                        />
                                    </View>
                                </View>

                                <View style={styles.middleContainer}>
                                    <RegularText style={styles.settingTitle} >{Strings.account_settings}</RegularText>
                                    <RenderMenuItem title={Strings.manage_addresses} icon={Images.IMG_MAP_ICON} onPress={onPressManageAddress} />
                                    {/* <RenderMenuItem title={Strings.manage_cards} iconStyle={{ tintColor: colors.theme }} icon={Images.IMG_CREDIT_CARD_FILLED} onPress={onPressManageCards} /> */}

                                    <View style={styles.seprator} />

                                    <RegularText style={styles.settingTitle} >{Strings.general}</RegularText>
                                    <RenderMenuItem title={Strings.help} onPress={onPressHelp} icon={Images.IMG_QUESTION} />
                                    <RenderMenuItem title={Strings.annex_wallet} icon={Images.IMG_COIN} onPress={onPressAnnexWallet} />
                                    <RenderMenuItem title={Strings.about_us} icon={Images.IMG_INFO} onPress={onPressAboutUs} />

                                    <View style={styles.seprator} />

                                    <RegularText style={styles.settingTitle} >{Strings.app_setting}</RegularText>
                                    <RenderMenuItem title={Strings.Language} icon={Images.IMG_LANGUAGE} onPress={onPressLanguage} />

                                    <View style={styles.seprator} />

                                </View>
                            </View>
                            <View style={styles.socialMediaContainer} >
                                <TouchableOpacity onPress={() => { }} >
                                    <CommonImage source={Images.IMG_FACEBOOK} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { }} >
                                    <CommonImage source={Images.IMG_INSTAGRAM} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { }} >
                                    <CommonImage source={Images.IMG_TWITTER} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { }} >
                                    <CommonImage source={Images.IMG_LINKEDIN} />
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.socialMediaContainer, { marginBottom: spacing.MARGIN_22, marginTop: spacing.MARGIN_12 }]} >
                                <TouchableOpacity onPress={() => onPressPrivacy()} >
                                    <RegularText style={[styles.privacyText, { marginRight: spacing.MARGIN_8 }]} >{Strings.privacy}</RegularText>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => onPressTermsAndCondition()} >
                                    <RegularText style={[styles.privacyText, { marginLeft: spacing.MARGIN_8 }]} >{Strings.terms_and_condition}</RegularText>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.logotuContainer} >
                                <TouchableOpacity onPress={() => onPressLogout()} >
                                    <RegularText style={styles.logout} >{Strings.logout}</RegularText>
                                </TouchableOpacity>
                                <RegularText style={styles.version} >{`V${getVersion()}`}</RegularText>
                            </View>
                        </ScrollView>
                        <ChangeLanguageModel
                            visible={showChangeLanguageModel}
                            onClose={() => onPressCloseLanguageModel()}
                        />
                        <WebViewModal
                            visible={showWebViewModel}
                            onClose={onCloseWebViewModel}
                            link={webLink}
                            title={webViewTitle}
                        />
                    </View>
            }
        </>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white
    },
    topContainer: {
        backgroundColor: colors.theme,
        paddingHorizontal: spacing.PADDING_18,
        paddingVertical: spacing.PADDING_18,
        flexDirection: "row",
        alignItems: "center",
    },
    topContainer_left: {
        flex: 1
    },
    topContainer_right: {
        height: spacing.HEIGHT_64,
        width: spacing.HEIGHT_64,
        backgroundColor: colors.white,
        borderRadius: spacing.RADIUS_50,
        marginLeft: spacing.MARGIN_20
    },
    profilePhoto: {
        height: spacing.HEIGHT_64,
        width: spacing.HEIGHT_64,
        borderRadius: spacing.RADIUS_50
    },
    name: {
        fontSize: textScale(18),
        fontFamily: fontNames.FONT_FAMILY_BOLD,
        color: colors.white
    },
    viewAndEditText: {
        fontSize: textScale(11),
        marginTop: spacing.MARGIN_2,
        color: colors.secondaryColor,
        fontFamily: fontNames.FONT_FAMILY_MEDIUM
    },
    middleContainer: {
        paddingHorizontal: spacing.PADDING_18,
        paddingTop: spacing.PADDING_28,
    },
    settingTitle: {
        fontSize: textScale(8),
        fontFamily: fontNames.FONT_FAMILY_MEDIUM,
        color: colors.grey500,
        letterSpacing: spacing.WIDTH_2,
        textTransform: 'uppercase',
        marginBottom: spacing.MARGIN_6
    },
    menuContainer: {
        flexDirection: "row",
        paddingHorizontal: spacing.PADDING_12,
        paddingVertical: spacing.PADDING_12,
        backgroundColor: colors.grey100,
        borderRadius: spacing.RADIUS_4,
        marginTop: spacing.MARGIN_8,
        alignItems: "center"
    },
    menuContainer_leftContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'center'
    },
    menuIcon: {
        marginRight: spacing.MARGIN_8
    },
    menuTitle: {
        fontSize: textScale(12),
        fontFamily: fontNames.FONT_FAMILY_BOLD,
        color: colors.grey800
    },
    rightArrow: {
        transform: [{ rotate: '270deg' }],
    },
    seprator: {
        height: spacing.HEIGHT_1,
        backgroundColor: colors.grey300,
        marginVertical: spacing.MARGIN_22,
        marginHorizontal: -spacing.PADDING_18
    },
    socialMediaContainer: {
        flexDirection: "row",
        justifyContent: "center"
    },
    privacyText: {
        color: colors.grey400,
        fontFamily: fontNames.FONT_FAMILY_BOLD,
        fontSize: textScale(9),
        letterSpacing: spacing.WIDTH_2,
    },
    logotuContainer: {
        alignItems: "center",
        // paddingVertical: spacing.PADDING_24,
    },
    logout: {
        fontSize: textScale(11),
        fontFamily: fontNames.FONT_FAMILY_BOLD,
        color: colors.red400,
        letterSpacing: spacing.WIDTH_2,
    },
    version: {
        fontSize: textScale(8),
        fontFamily: fontNames.FONT_FAMILY_MEDIUM,
        color: colors.grey400,
        marginBottom: spacing.MARGIN_20,
        marginTop: spacing.MARGIN_12,
        letterSpacing: spacing.WIDTH_2,
    },
});

export default Setting;