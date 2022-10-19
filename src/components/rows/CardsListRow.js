import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { textScale } from '../../styles/responsiveStyles';
import { spacing } from '../../styles/spacing';
import { fontNames } from '../../styles/typography';
import colors from '../../utility/colors';
import { Images } from '../../utility/imagePaths';
import RegularText from '../common/RegularText';
import CommonImage from '../common/views/CommonImage';

const CardsListRow = ({ item, index, onPressCard, selectedCard }) => {

    return (
        <TouchableOpacity onPress={() => onPressCard()}  >
            <View style={[styles.mainView,]}>
                <CommonImage
                    source={Images.IMG_MASTERCARD_LOGO}
                    style={[styles.imageStyle]}
                    resizeMode={"cover"}
                />
                <View style={styles.rightContainer} >
                    <RegularText style={styles.address}>{"**** 5205"}</RegularText>
                </View>
                {
                    selectedCard ?
                        <CommonImage source={Images.IMG_ACTIVE_SELECTION} style={{ marginHorizontal: spacing.MARGIN_20 }} />
                        :
                        <CommonImage source={Images.IMG_INACTIVE_SELECTION} style={{ marginHorizontal: spacing.MARGIN_20 }} />
                }
            </View>
            <View style={styles.seprator} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flexDirection: "row",
        paddingHorizontal: spacing.PADDING_18,
        paddingVertical: spacing.PADDING_24,
    },
    imageStyle: {
        // tintColor: colors.grey500
    },
    rightContainer: {
        flex: 1,
        flexDirection: "row",
        marginLeft: spacing.MARGIN_10,
    },
    address: {
        fontSize: textScale(12),
        fontFamily: fontNames.FONT_FAMILY_MEDIUM,
    },
    seprator: {
        backgroundColor: colors.grey100,
        height: spacing.HEIGHT_2
    },
});

export default CardsListRow;