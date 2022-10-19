import React from 'react';
import {
    Modal, StyleSheet,
    TouchableOpacity, View
} from 'react-native';
import { textScale } from '../../styles/responsiveStyles';
import { spacing } from '../../styles/spacing';
import { fontNames } from '../../styles/typography';
import Strings from '../../translation/language';
import colors from '../../utility/colors';
import { Images } from '../../utility/imageRes';
import CommonImage from '../common/CommonImage';
import RegularText from '../common/RegularText';

const ImagePickerModal = ({
    visible,
    onClose,
    showDocument,
    onPressCamera,
    onPressDocument,
    onPressGallery
}) => {

    function OptionBox({ icon, onPress, title }) {
        return (
            <TouchableOpacity style={styles.boxStyle} onPress={() => onPress()} >
                <CommonImage source={icon} />
                <RegularText title={title} textStyle={{ marginTop: spacing.MARGIN_8, fontSize: textScale(10), color: colors.theme }} fontFamily={fontNames.FONT_FAMILY_MEDIUM} />
            </TouchableOpacity>
        )
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => { onClose() }}
        >
            <TouchableOpacity
                style={styles.modalMainContainer}
                activeOpacity={1}
                onPress={() => onClose()}
            >
                <TouchableOpacity activeOpacity={1} style={styles.visibleViewStyle}>
                    <View style={styles.headerView} >
                        <View style={{ flex: 1 }} >
                            <RegularText title={Strings.choose_from} textStyle={{ fontSize: textScale(20), }} fontFamily={fontNames.FONT_FAMILY_BOLD} />
                        </View>
                        <TouchableOpacity onPress={() => onClose()} style={{ flex: 0.2, alignItems: 'flex-end' }} >
                            <RegularText title={Strings.done} textStyle={{ color: colors.theme }} />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingVertical: spacing.PADDING_16 }} >
                        {
                            onPressCamera ?
                                <OptionBox
                                    icon={Images.IMG_OPTION_CAMERA}
                                    onPress={() => onPressCamera()}
                                    title={Strings.camera}
                                />
                                : null
                        }
                        {onPressGallery ?
                            <OptionBox
                                icon={Images.IMG_OPTION_GALLERY}
                                onPress={() => onPressGallery()}
                                title={Strings.gallery}
                            />
                            : null
                        }
                        {
                            onPressDocument &&
                            <OptionBox
                                icon={Images.IMG_OPTION_DOCUMENT}
                                onPress={() => onPressDocument()}
                                title={Strings.documents}
                            />
                        }
                    </TouchableOpacity>

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
        paddingHorizontal: spacing.PADDING_12,
        borderTopLeftRadius: spacing.RADIUS_8,
        borderTopRightRadius: spacing.RADIUS_8,
        paddingBottom: spacing.PADDING_32
    },
    boxStyle: {
        // flex: 1,
        marginHorizontal: spacing.MARGIN_8,
        width: spacing.FULL_WIDTH / 4,
        height: spacing.FULL_WIDTH / 4,
        backgroundColor: colors.appBackground,
        borderRadius: spacing.RADIUS_8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonStyle: {
        marginTop: spacing.MARGIN_14,
        alignSelf: 'center'
    },
    titleStyle: {
        fontSize: textScale(16),
        color: colors.theme
    },
    headerView: {
        paddingVertical: spacing.PADDING_12,
        flexDirection: 'row',
        marginTop: spacing.MARGIN_12
    }
})

export default ImagePickerModal;