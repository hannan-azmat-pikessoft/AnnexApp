import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { textScale } from '../../../styles/responsiveStyles';
import { spacing } from '../../../styles/spacing';
import { fontNames } from '../../../styles/typography';
import colors from '../../../utility/colors';
import RegularText from '../RegularText';

const CommonLabelDescInput = ({
    placeholderTextColor,
    placeHolder,
    onChangeText,
    refValue,
    keyboardType,
    inputStyle,
    editable,
    value,
    error,
    maxChar,
    inputViewStyle,
    showCounter,
    onSubmitEditing
}) => {

    const [isFieldActive, setIsFieldActive] = useState(false)
    const [isUserOnInput, setIsUserOnInput] = useState(false)

    function _handleFocus() {
        if (!isUserOnInput) { setIsUserOnInput(true) }
        if (!isFieldActive) { setIsFieldActive(true) }
    }

    function _handleBlur() {
        if (isUserOnInput) { setIsUserOnInput(false) }
        if (isFieldActive) { setIsFieldActive(false) }
    }

    return (
        <View>
            <View style={[
                styles.inputView,
                inputViewStyle,
                {
                    borderColor: isFieldActive ? colors.theme : colors.grey400
                }
            ]}>
                <TextInput
                    ref={refValue}
                    value={value}
                    placeholder={placeHolder}
                    placeholderTextColor={placeholderTextColor != undefined ? placeholderTextColor : colors.grey400}
                    style={[styles.textInputStyle, inputStyle]}
                    keyboardType={keyboardType}
                    editable={editable != undefined ? editable : true}
                    multiline={true}
                    maxLength={maxChar ? maxChar : undefined}
                    onFocus={() => _handleFocus()}
                    onBlur={() => _handleBlur()}
                    onChangeText={value => onChangeText(value)}
                    onSubmitEditing={value => onSubmitEditing(value)}
                />
                {
                    showCounter &&
                    <View style={{ alignItems: 'flex-end', }}>
                        <RegularText style={styles.textCounter}>
                            {(value?.length) + (maxChar ? '/' + maxChar : '')}
                        </RegularText>
                    </View>
                }
            </View>
            {
                error != '' &&
                < RegularText style={styles.errorStyle}>{error}</RegularText>
            }
        </View>
    )
}


const styles = StyleSheet.create({
    inputView: {
        backgroundColor: colors.white,
        paddingHorizontal: spacing.PADDING_8,
        minHeight: spacing.HEIGHT_110,
        borderRadius: spacing.RADIUS_8,
        borderWidth: 1
    },
    textInputStyle: {
        color: colors.black,
        flex: 1,
        fontFamily: fontNames.FONT_FAMILY_REGULAR,
        fontSize: textScale(12),
        textAlignVertical: 'top',
    },
    errorStyle: {
        fontSize: textScale(10),
        color: colors.red500,
        marginTop: spacing.MARGIN_2,
        marginLeft: spacing.MARGIN_4
    },
    textCounter: {
        alignSelf: 'flex-end',
        color: colors.grey700,
        fontSize: textScale(10)
    }
});

CommonLabelDescInput.defaultProps = {
    onSubmitEditing: () => { },
    onChangeText: () => { }
}

export default CommonLabelDescInput;