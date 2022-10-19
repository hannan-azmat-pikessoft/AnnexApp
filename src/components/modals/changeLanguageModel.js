import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { textScale } from '../../styles/responsiveStyles';
import { spacing } from '../../styles/spacing';
import { fontNames } from '../../styles/typography';
import Strings from '../../translation/language';
import colors from '../../utility/colors';
import { changeAppLanguage, navigate } from '../../utility/commonFunctions';
import { ANIMATION_TYPES, EASING_TYPE, KEY_BOTTOM_TAB_NAVIGATOR, LANGUAGE, LANGUAGES } from '../../utility/constants';
import { retrieveItem } from '../../utility/customAsyncStorage';
import { Images } from '../../utility/imagePaths';
import CommonButton from '../common/buttons/CommonButton';
import RegularText from '../common/RegularText';
import CommonImage from '../common/views/CommonImage';
import RNRestart from 'react-native-restart';

const ChangeLanguageModel = ({
    visible,
    onClose,
}) => {
    const [currentLang, setCurrentLang] = useState(LANGUAGES.english)

    useEffect(() => {
        getCurrentLang()
    }, [])

    async function getCurrentLang() {
        retrieveItem(LANGUAGE)
            .then(lang => {
                if (lang) {
                    setCurrentLang(lang)
                }

            })
    }

    function onPressLanguage(lang) {
        changeAppLanguage(lang)
            .then(() => {
                getCurrentLang()
                    .then(() => {
                        onClose()
                        RNRestart.Restart();
                    })
            })
    }

    return (
        <Modal
            animationType='fade'
            visible={visible}
            onRequestClose={() => onClose()}
            transparent={true}
            on
        >
            <TouchableOpacity activeOpacity={1} style={styles.mainContainer} key="addressMenuOptionModel" onPress={() => onClose()} >

                <Animatable.View
                    animation={ANIMATION_TYPES.SLIDE_IN_UP}
                    duration={200}
                    easing={EASING_TYPE.EASE_IN_OUT}
                >
                    <TouchableOpacity activeOpacity={1} style={styles.visibleViewStyle}>
                        <View style={styles.headerContainer} >
                            <View style={{ flex: 1 }} ></View>
                            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                                <RegularText style={styles.modelHeading} >{Strings.switch_to}</RegularText>
                            </View>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity style={styles.closeIconContainer} onPress={() => onClose()} >
                                    <CommonImage source={Images.IMG_CLOSE} style={{}} viewStyle={{}} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {
                            currentLang == LANGUAGES.english &&
                            <CommonButton
                                title={Strings.arabic}
                                textStyle={{ color: colors.theme, fontSize: textScale(14) }}
                                buttonStyle={styles.buttonStyle}
                                backgroundColor={colors.transparent}
                                onPressButton={() => onPressLanguage(LANGUAGES.arabic)}
                            />
                        }
                        {
                            currentLang == LANGUAGES.arabic &&
                            <CommonButton
                                title={Strings.english}
                                textStyle={{ color: colors.theme, fontSize: textScale(14) }}
                                buttonStyle={styles.buttonStyle}
                                backgroundColor={colors.transparent}
                                onPressButton={() => onPressLanguage(LANGUAGES.english)}
                            />
                        }
                    </TouchableOpacity>
                </Animatable.View>
            </TouchableOpacity>
        </Modal >
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: colors.transparentBlack
    },
    visibleViewStyle: {
        width: spacing.FULL_WIDTH,
        backgroundColor: colors.white,
        paddingHorizontal: spacing.PADDING_16,
        paddingTop: spacing.PADDING_16,
        borderTopLeftRadius: spacing.RADIUS_20,
        borderTopRightRadius: spacing.RADIUS_20,
        paddingBottom: spacing.PADDING_16,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: spacing.MARGIN_12,
    },
    modelHeading: {
        textAlign: "center",
        fontSize: textScale(15),
        fontFamily: fontNames.FONT_FAMILY_BOLD,
    },
    buttonStyle: {
        width: "90%",
    },
    closeIconContainer: {
        alignSelf: "flex-end",
        padding: spacing.PADDING_8
    }
})

export default ChangeLanguageModel;