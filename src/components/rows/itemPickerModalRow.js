import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { fontNames } from '../../styles/typography';
import colors from '../../utility/colors';
import { moderateScale, textScale } from '../../styles/responsiveStyles';
import { spacing } from '../../styles/spacing';
import CommonImage from '../common/CommonImage';
import CommonButton from '../common/CommonButton';
import RegularText from '../common/RegularText';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Images } from '../../utility/imageRes';

const ItemPickerModalRow = ({ item, index, onPressItem, displayKey }) => {
    return (
        <TouchableOpacity
            style={styles.mainView}
            activeOpacity={1}
            onPress={() => onPressItem(item, index)}
        >
            <RegularText
                title={item[displayKey]}
                textStyle={styles.itemText}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: spacing.PADDING_12,
        borderBottomWidth: 1,
        borderBottomColor: colors.grey100
    },
    hLine: {
        height: 1,
        width: spacing.FULL_WIDTH,
        backgroundColor: colors.secondaryColor,
    },
    itemText: {
        fontSize: textScale(14),
        color: colors.grey700,
    }
});

export default ItemPickerModalRow;