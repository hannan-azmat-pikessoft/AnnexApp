import React, { useState } from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { textScale } from '../../../styles/responsiveStyles';
import { spacing } from '../../../styles/spacing';
import { fontNames } from '../../../styles/typography';
import colors from '../../../utility/colors';
import RegularText from '../RegularText';

//  'countdown' | 'date' | 'datetime' | 'time'

const CommonDateTimePicker = ({
    label,
    error,
    value,
    onSelectDateTime,
    mode,
    maximumDate,
    minimumDate,
    editable,
    placeHolder,
    mainViewStyle
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

    function onChange(selectedDate) {
        if (selectedDate) {
            const currentDate = selectedDate;
            onSelectDateTime(currentDate);
        }
        closePicker(Platform.OS === 'ios');
    }

    return (
        <View style={[styles.mainView, mainViewStyle, {}]}>
            <RegularText style={{ marginLeft: spacing.MARGIN_12 }} >
                {label}
            </RegularText>
            <TouchableOpacity style={[styles.inputView, {}]} onPress={() => onPressPicker()} activeOpacity={1} >
                {
                    value.value ?
                        <RegularText style={styles.textInputStyle}>
                            {value.label.toString()}
                        </RegularText>
                        :
                        <RegularText style={[styles.textInputStyle, { color: colors.grey500 }]} >
                            {placeHolder}
                        </RegularText>
                }
            </TouchableOpacity>
            {
                error != '' &&
                < RegularText style={styles.errorStyle} >{error}</RegularText>
            }
            <DatePicker
                modal
                open={isPickerVisible}
                date={value.value ? value.value : new Date()}
                onConfirm={(date) => {
                    closePicker()
                    onChange(date)
                }}
                onCancel={() => closePicker()}
                maximumDate={maximumDate && maximumDate}
                minimumDate={minimumDate && minimumDate}
                mode={mode}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    mainView: {
    },
    inputView: {
        height: spacing.HEIGHT_50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.grey400
    },
    textInputStyle: {
        flex: 1,
        color: colors.appBlack,
        fontFamily: fontNames.FONT_FAMILY_REGULAR,
        fontSize: textScale(12),
        paddingHorizontal: spacing.PADDING_12,
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
        marginLeft: spacing.MARGIN_8
    }
});

export default CommonDateTimePicker;