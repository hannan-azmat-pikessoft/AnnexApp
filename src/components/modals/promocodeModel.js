import React from 'react';
import { KeyboardAvoidingView, Modal, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { textScale } from '../../styles/responsiveStyles';
import { spacing } from '../../styles/spacing';
import { fontNames } from '../../styles/typography';
import Strings from '../../translation/language';
import colors from '../../utility/colors';
import { navigate } from '../../utility/commonFunctions';
import { ANIMATION_TYPES, EASING_TYPE, SCREEN_SELECT_LOCATION_ON_MAP } from '../../utility/constants';
import { Images } from '../../utility/imagePaths';
import CommonButton from '../common/buttons/CommonButton';
import CommonLabelTextInput from '../common/inputBoxes/CommonLabelTextInput';
import RegularText from '../common/RegularText';
import CommonImage from '../common/views/CommonImage';
import PromocodeListComponent from '../modules/PromocodeListComponent';

const PromocodeModel = ({
    visible,
    onClose,
    promocode,
    setPromocode,
    onPressApply,
    onPressPromocode,
    buttonLoading
}) => {

    function onPressCurrentLocation() {
        navigate(SCREEN_SELECT_LOCATION_ON_MAP)
    }

    return (
        <Modal
            animationType='fade'
            visible={visible}
            onRequestClose={() => onClose()}
            transparent={true}
        >
            <TouchableOpacity activeOpacity={1} style={styles.mainContainer} key="addressMenuOptionModel" onPress={() => onClose()} >
                <Animatable.View
                    animation={ANIMATION_TYPES.SLIDE_IN_UP}
                    duration={200}
                    easing={EASING_TYPE.EASE_IN_OUT}
                >
                    <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'flex-end' }} behavior={Platform.OS == 'ios' ? 'padding' : 'height'} enabled={Platform.OS == 'ios' ? true : true} >
                        <TouchableOpacity activeOpacity={1} style={styles.visibleViewStyle}>
                            <View style={styles.headerContainer} >
                                <View style={{ flex: 1 }} ></View>
                                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                                    <RegularText style={styles.modelHeading} >{Strings.promo_code}</RegularText>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <TouchableOpacity style={styles.closeIconContainer} onPress={() => onClose()} >
                                        <CommonImage source={Images.IMG_CLOSE} style={{}} viewStyle={{}} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{ marginBottom: spacing.MARGIN_12 }} >
                                <CommonLabelTextInput
                                    placeHolder={Strings.msg_enter_promocode}
                                    value={promocode}
                                    error={""}
                                    onChangeText={(text) => setPromocode(text)}
                                    onSubmitEditing={() => { }}
                                    inputStyle={{ textAlign: "center", fontSize: textScale(14) }}
                                />
                            </View>
                            <CommonButton
                                title={Strings.apply}
                                buttonStyle={{ width: "100%", marginBottom: spacing.MARGIN_12 }}
                                disabled={promocode != '' ? false : true}
                                backgroundColor={promocode != '' ? colors.theme : colors.grey500}
                                onPressButton={() => onPressApply()}
                                fetching={buttonLoading}
                            />
                            <PromocodeListComponent onPressPromocode={onPressPromocode} />
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
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
        paddingHorizontal: spacing.PADDING_18,
        paddingTop: spacing.PADDING_16,
        borderTopLeftRadius: spacing.RADIUS_20,
        borderTopRightRadius: spacing.RADIUS_20,
        paddingBottom: spacing.PADDING_16,
        // maxHeight: spacing.FULL_HEIGHT / 1.8
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        // marginBottom: spacing.MARGIN_12,
    },
    modelHeading: {
        textAlign: "center",
        fontSize: textScale(14),
        fontFamily: fontNames.FONT_FAMILY_BOLD,
    },
    closeIconContainer: {
        alignItems: "flex-end",
        alignSelf: "flex-end",
        marginBottom: spacing.MARGIN_8,
        padding: spacing.PADDING_8
    }
})

export default PromocodeModel;