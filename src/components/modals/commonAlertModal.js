import React from 'react';
import {
    Modal, StyleSheet,
    TouchableOpacity, View
} from 'react-native';
import { textScale } from '../../styles/responsiveStyles';
import { spacing } from '../../styles/spacing';
import { fontNames } from '../../styles/typography';
import colors from '../../utility/colors';
import CommonButton from '../common/CommonButton';
import RegularText from '../common/RegularText';

const CommonAlertModal = ({
    visible,
    onClose,
    message,
    buttonText1,
    buttonText2,
    onPressButton1,
    onPressButton2,
    fetching1,
    fetching2,
}) => {

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                onClose()
            }}>
            <TouchableOpacity
                style={styles.modalMainContainer}
                activeOpacity={1}
                onPress={() => onClose()}
            >
                <TouchableOpacity activeOpacity={1} style={styles.visibleViewStyle}>
                    <RegularText title={message} textStyle={styles.inputLable} fontFamily={fontNames.FONT_FAMILY_REGULAR} />
                    <View style={{ flexDirection: 'row' }} >
                        <CommonButton
                            title={buttonText1}
                            buttonStyle={styles.createButtonStyle}
                            backgroundColor={colors.secondaryColor}
                            textStyle={{ color: colors.white, fontSize: textScale(14) }}
                            onPressButton={() => onPressButton1()}
                            fetching={fetching1}
                        />
                        {buttonText2 &&
                            <CommonButton
                                title={buttonText2}
                                buttonStyle={[styles.createButtonStyle, { borderWidth: 1, borderColor: colors.grey400 }]}
                                backgroundColor={colors.white}
                                textStyle={{ color: colors.appBlack, fontSize: textScale(14) }}
                                onPressButton={() => onPressButton2()}
                                fetching={fetching2}
                            />
                        }
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalMainContainer: {
        backgroundColor: colors.white,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
        backgroundColor: colors.transparentBlack
    },
    visibleViewStyle: {
        backgroundColor: colors.white,
        width: spacing.FULL_WIDTH,
        alignItems: "center",
        paddingVertical: spacing.PADDING_24,
        paddingHorizontal: spacing.PADDING_16,
        borderTopLeftRadius: spacing.RADIUS_12,
        borderTopRightRadius: spacing.RADIUS_12,
    },
    inputLable: {
        fontSize: textScale(18),
        color: colors.grey800,
        marginTop: spacing.MARGIN_12,
        textAlign: 'center'
    },
    createButtonStyle: {
        marginTop: spacing.MARGIN_30,
        flex: 1,
        marginHorizontal: spacing.MARGIN_6
    },
    closeContainer: {
        alignSelf: 'flex-end',
        marginBottom: spacing.MARGIN_24,
        marginHorizontal: spacing.MARGIN_20
    }
})

export default CommonAlertModal;