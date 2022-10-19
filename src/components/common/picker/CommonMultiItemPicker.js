import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { textScale } from '../../../styles/responsiveStyles';
import { spacing } from '../../../styles/spacing';
import { fontNames } from '../../../styles/typography';
import colors from '../../../utility/colors';
import { Images } from '../../../utility/imageRes';
import MultiItemPickerModal from '../../modals/multiItemPickerModal';
import CommonImage from '../CommonImage';
import RegularText from '../RegularText';

const CommonMultiItemPicker = ({
    label,
    title,
    displayKey,
    error,
    data,
    value,
    onSubmitSelection,
    editable
}) => {
    const [isPickerVisible, setIsPickerVisible] = useState(false)

    function onPressPicker() {
        if (editable != false) {
            setIsPickerVisible(true)
        }
    }

    function closePicker() {
        setIsPickerVisible(false)
    }

    function onSubmit(selectedItems) {
        onSubmitSelection(selectedItems)
        closePicker()
    }

    return (
        <View style={[styles.mainView, {}]}>
            <RegularText
                title={label}
                fontFamily={fontNames.FONT_FAMILY_SEMI_BOLD}
                textStyle={styles.labelStyle}
            />
            <TouchableOpacity style={[styles.inputView, {}]} onPress={() => onPressPicker()} activeOpacity={1} >
                <RegularText
                    title={value == '' ? title : value.map(item => item[displayKey] + ', ')}
                    textStyle={[styles.textInputStyle, {
                        color: value == '' ? colors.grey400 : colors.appBlack
                    }]}
                    numberOfLines={1}
                />
                {editable != false &&
                    <CommonImage
                        source={Images.IMG_ARROW_NEXT}
                        style={styles.downArrowStyle}
                        resizeMode={'contain'}
                    />
                }
            </TouchableOpacity>
            {
                error != '' &&
                < RegularText
                    title={error}
                    textStyle={styles.errorStyle}
                />
            }
            <MultiItemPickerModal
                visible={isPickerVisible}
                onClose={closePicker}
                title={title}
                data={data}
                onSubmit={onSubmit}
                value={value}
                displayKey={displayKey}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    mainView: {
        marginHorizontal: spacing.MARGIN_14,
    },
    inputView: {
        backgroundColor: colors.secondaryColor,
        borderRadius: spacing.RADIUS_8,
        paddingHorizontal: spacing.PADDING_12,
        height: spacing.HEIGHT_48,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    textInputStyle: {
        color: colors.appBlack,
        fontFamily: fontNames.FONT_FAMILY_REGULAR,
        fontSize: textScale(14),
        maxWidth: spacing.FULL_WIDTH / 1.3
    },
    labelStyle: {
        fontSize: textScale(14),
        color: colors.grey800,
        marginLeft: spacing.MARGIN_4
    },
    errorStyle: {
        fontSize: textScale(10),
        color: colors.red500,
        marginTop: spacing.MARGIN_2,
        marginLeft: spacing.MARGIN_4
    },
    downArrowStyle: {
        tintColor: colors.grey600,
        transform: [{ rotate: '90deg' }],
        height: spacing.HEIGHT_14,
        width: spacing.HEIGHT_14,
    }
});

export default CommonMultiItemPicker;