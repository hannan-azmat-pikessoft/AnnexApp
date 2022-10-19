import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { textScale } from '../../styles/responsiveStyles';
import { spacing } from '../../styles/spacing';
import { fontNames } from '../../styles/typography';
import Strings from '../../translation/language';
import colors from '../../utility/colors';
import { getImage } from '../../utility/commonFunctions';
import { Images } from '../../utility/imagePaths';
import RegularText from '../common/RegularText';
import CommonImage from '../common/views/CommonImage';

const image = "https://media.istockphoto.com/photos/young-woman-getting-tested-for-coronaviruscovid19-at-medical-clinic-picture-id1310644715?b=1&k=20&m=1310644715&s=170667a&w=0&h=QYy9ZSIJkOOxRoVZb4suPVnGLbaMOOzL5n6SaJFiTBA="

const ServiceListRow = ({ item, index, dataLength, onPressCard, isFeatured, isLoading }) => {
    return (
        <>
            {
                isLoading ?
                    <SkeletonPlaceholder
                        backgroundColor={colors.grey300}
                        highlightColor={colors.grey200}
                        key={index.toString()}
                    >
                        <View style={[styles.mainView,
                        index == 0 && { marginLeft: spacing.MARGIN_24 },
                        (dataLength - 1) == index && { marginRight: spacing.MARGIN_24 },
                        ]}>
                            <View style={[styles.imageStyle]}></View>
                            <View style={{ height: spacing.HEIGHT_12, marginVertical: 5, borderRadius: 5, marginRight: spacing.MARGIN_20 }} />
                            <View style={{ height: spacing.HEIGHT_6, borderRadius: 5 }} />
                            <View style={{ height: spacing.HEIGHT_6, borderRadius: 5, marginVertical: 5, marginRight: spacing.MARGIN_40 }} />
                            {/* <View style={{ height: spacing.HEIGHT_6, borderRadius: 5, }} /> */}
                        </View>
                    </SkeletonPlaceholder>
                    :
                    <TouchableOpacity style={[
                        styles.mainView,
                        index == 0 && { marginLeft: spacing.MARGIN_24 },
                        (dataLength - 1) == index && { marginRight: spacing.MARGIN_24 },
                        isFeatured && { backgroundColor: colors.white, }
                    ]}
                        onPress={!item.is_lunched ? () => { } : () => onPressCard(item)}
                    >
                        <CommonImage
                            source={getImage(item.cover)}
                            style={[styles.imageStyle, !isFeatured && { borderRadius: spacing.RADIUS_8 }]}
                            resizeMode={"cover"}
                        />
                        {
                            item.is_lunched && (item.cheapest_price.actual_price && item.cheapest_price.price) &&
                            <View style={{ paddingHorizontal: spacing.PADDING_12, flexDirection: "row", paddingVertical: spacing.PADDING_4, backgroundColor: colors.secondaryColor, position: "absolute", right: 10, top: 10, borderRadius: spacing.RADIUS_20 }} >
                                <RegularText style={{ color: colors.orange700, fontSize: textScale(9), fontFamily: fontNames.FONT_FAMILY_BOLD, textDecorationLine: "line-through", textDecorationColor: colors.orange700 }} >{item.cheapest_price.actual_price}</RegularText>
                                <RegularText style={{ color: colors.white, fontSize: textScale(9), fontFamily: fontNames.FONT_FAMILY_BOLD }} >{` ${item.cheapest_price.price}`}</RegularText>
                            </View>
                        }
                        {!item.is_lunched && <View style={[styles.imageStyle, styles.comingSoonContainer, !isFeatured && { borderRadius: spacing.RADIUS_8 }]}>
                            <CommonImage source={Images.IMG_LOCK} />
                            <RegularText style={styles.comingSoonText} >{Strings.coming_soon}</RegularText>
                        </View>}
                        <View style={styles.secondaryView}>
                            <RegularText style={styles.cardTitle} >{item.name}</RegularText>
                            <RegularText style={styles.cardDescription} numberOfLines={2} >{item.description}</RegularText>
                        </View>
                    </TouchableOpacity>
            }
        </>
    )
}

const styles = StyleSheet.create({
    mainView: {
        width: spacing.FULL_WIDTH / 1.6,
        borderRadius: spacing.RADIUS_8,
        marginRight: spacing.MARGIN_14,
    },
    secondaryView: {
        paddingHorizontal: spacing.PADDING_16,
        paddingVertical: spacing.PADDING_16,
    },
    imageStyle: {
        width: spacing.FULL_WIDTH / 1.6,
        height: spacing.HEIGHT_180,
        borderTopLeftRadius: spacing.RADIUS_8,
        borderTopRightRadius: spacing.RADIUS_8,
    },
    comingSoonContainer: {
        position: "absolute",
        backgroundColor: colors.lightTheme08,
        justifyContent: "center",
        alignItems: "center"
    },
    comingSoonText: {
        color: colors.white,
        fontFamily: fontNames.FONT_FAMILY_MEDIUM,
        fontSize: textScale(10),
        textTransform: 'uppercase',
        marginTop: spacing.MARGIN_8,
        letterSpacing: spacing.WIDTH_2,

    },
    cardTitle: {
        fontFamily: fontNames.FONT_FAMILY_BOLD,
        fontSize: textScale(11),
        color: colors.black,

    },
    cardDescription: {
        fontSize: textScale(9),
        color: colors.grey700,
        marginTop: spacing.MARGIN_2
    },
});

export default ServiceListRow;