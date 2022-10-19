import React from 'react';
import {
    Modal, StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { textScale } from '../../styles/responsiveStyles';
import { spacing } from '../../styles/spacing';
import { fontNames } from '../../styles/typography';
import Strings from '../../translation/language';
import colors from '../../utility/colors';
import { Images } from '../../utility/imagePaths';
import CommonButton from '../common/buttons/CommonButton';
import RegularText from '../common/RegularText';
import CommonImage from '../common/views/CommonImage';

const AppUpdateModal = ({
    visible,
    onClose,
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
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <CommonImage source={Images.IMG_UPDATE_ICON} />
                            <RegularText style={styles.title} >{Strings.time_to_update + "!"}</RegularText>
                            <RegularText style={styles.msgStyle} >{Strings.msg_update_app}</RegularText>
                        </View>
                        <CommonButton title={Strings.update} buttonStyle={styles.buttonStyle} />
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
        flex: 1
    },
    title: {
        fontSize: textScale(26),
        fontFamily: fontNames.FONT_FAMILY_BOLD,
        marginBottom: spacing.MARGIN_12
    },
    msgStyle: {
        fontSize: textScale(12),
        textAlign: 'center',
        color: colors.grey500,
        fontFamily: fontNames.FONT_FAMILY_MEDIUM,
        paddingHorizontal: "15%",
    },
    buttonStyle: {
        minWidth: "90%",
        marginVertical: spacing.MARGIN_30,
    },
})

export default AppUpdateModal;