import React from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { spacing } from '../../styles/spacing';
import colors from '../../utility/colors';
import { navigate } from '../../utility/commonFunctions';
import { ANIMATION_TYPES, EASING_TYPE, SCREEN_SELECT_LOCATION_ON_MAP } from '../../utility/constants';
import { Images } from '../../utility/imagePaths';
import CommonButton from '../common/buttons/CommonButton';
import CommonImage from '../common/views/CommonImage';

const CardMenuOptionsModel = ({
    visible,
    onClose,
    onPressEdit,
    onPressSetDefault,

}) => {

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
                    <TouchableOpacity activeOpacity={1} style={styles.visibleViewStyle} >
                        <TouchableOpacity style={styles.closeIconContainer} onPress={() => onClose()} >
                            <CommonImage source={Images.IMG_CLOSE} />
                        </TouchableOpacity>
                        <CommonButton
                            title={"Edit"}
                            textStyle={{ color: colors.theme }}
                            buttonStyle={styles.buttonStyle}
                            backgroundColor={colors.transparent}
                            onPressButton={() => onPressEdit()}
                        />
                        <CommonButton
                            title={"Set default"}
                            textStyle={{ color: colors.theme }}
                            buttonStyle={styles.buttonStyle}
                            backgroundColor={colors.transparent}
                            onPressButton={() => onPressSetDefault()}
                        />
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
    buttonStyle: {
        width: "90%",
    },
    closeIconContainer: {
        alignItems: "flex-end",
        alignSelf: "flex-end",
        marginBottom: spacing.MARGIN_8,
        padding: spacing.PADDING_8
    }
})

export default CardMenuOptionsModel;