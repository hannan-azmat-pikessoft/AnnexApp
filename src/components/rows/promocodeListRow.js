import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Dash from 'react-native-dash';
import { textScale } from '../../styles/responsiveStyles';
import { spacing } from '../../styles/spacing';
import { fontNames } from '../../styles/typography';
import Strings from '../../translation/language';
import colors from '../../utility/colors';
import CommonButton from '../common/buttons/CommonButton';
import RegularText from '../common/RegularText';

const PromocodeListRow = ({ item, index, onPressPromocode }) => {

    return (
        <>
            <TouchableOpacity style={styles.mainView} activeOpacity={1} >
                <View style={styles.textView} >
                    <RegularText style={styles.title} >{"GET 20 AED OFF"}</RegularText>
                    <RegularText style={styles.description} >{"Min order 100AED"}</RegularText>
                </View>
                <CommonButton
                    title={item.code}
                    onPressButton={() => onPressPromocode(item)}
                    buttonStyle={{ borderRadius: spacing.RADIUS_50, paddingHorizontal: spacing.PADDING_36, paddingVertical: spacing.PADDING_8 }}
                />
            </TouchableOpacity>
            <Dash style={{ height: 1, marginHorizontal: spacing.MARGIN_16, marginBottom: spacing.MARGIN_12 }} dashLength={spacing.WIDTH_12} dashColor={colors.grey300} dashThickness={2} dashGap={spacing.MARGIN_4} />
        </>

    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        paddingHorizontal: spacing.PADDING_16,
        paddingVertical: spacing.PADDING_16,
        // borderWidth: 2,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    secondaryView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: spacing.PADDING_36,
    },
    title: {
        fontSize: textScale(12),
        fontFamily: fontNames.FONT_FAMILY_BOLD
    },
    description: {
        fontSize: textScale(10),
        // fontFamily: fontNames.FONT_FAMILY_BOLD,
        color: colors.grey500
    },
});

export default PromocodeListRow;