import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { textScale } from '../../styles/responsiveStyles';
import { spacing } from '../../styles/spacing';
import { fontNames } from '../../styles/typography';
import colors from '../../utility/colors';
import { Images } from '../../utility/imagePaths';
import RegularText from '../common/RegularText';
import CommonImage from '../common/views/CommonImage';

const AddressSearchListRow = ({ item, index, onPressAddressCard, isDefault, isLoading }) => {
    const address = item && item.address_line ? JSON.parse(item.address_line) : "";
    return (
        <>

            {
                isLoading ?
                    <SkeletonPlaceholder backgroundColor={colors.grey300} highlightColor={colors.grey200} >
                        <View style={[styles.mainView, { alignItems: "center", flex: 0 }]} >
                            <View style={{ width: spacing.WIDTH_20, height: spacing.HEIGHT_20, borderRadius: spacing.RADIUS_2, marginRight: spacing.MARGIN_12 }} />
                            <View style={{ height: spacing.HEIGHT_12, width: spacing.FULL_WIDTH / 1.5, borderRadius: spacing.RADIUS_20 }} />
                        </View>
                    </SkeletonPlaceholder>
                    :
                    <>
                        {
                            address != "" &&
                            <TouchableOpacity onPress={() => onPressAddressCard(item, address)}  >
                                <View style={styles.mainView}>
                                    <CommonImage
                                        source={Images.IMG_MAP_MARKER_FILLED}
                                        style={[styles.imageStyle]}
                                        resizeMode={"cover"}
                                        viewStyle={{ justifyContent: "center" }}
                                    />

                                    <View style={[styles.addressContainer, !isDefault && { paddingRight: spacing.MARGIN_60 }]} >
                                        <RegularText style={styles.address}>{`${address.villa} , ${address.street} ${address.address}`}</RegularText>
                                    </View>
                                    {
                                        isDefault ?
                                            <CommonImage
                                                source={Images.IMG_ACTIVE_SELECTION}
                                                viewStyle={{ justifyContent: "center", paddingHorizontal: spacing.PADDING_20 }} />
                                            : null
                                    }
                                </View>
                                <View style={styles.seprator} />

                            </TouchableOpacity>
                        }
                    </>
            }
        </>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: "row",
        paddingHorizontal: spacing.PADDING_18,
        paddingVertical: spacing.PADDING_16,
    },
    imageStyle: {
        tintColor: colors.grey500
    },
    addressContainer: {
        flex: 1,
        flexDirection: "row",
        marginLeft: spacing.MARGIN_10,
        paddingRight: spacing.MARGIN_8,
    },
    address: {
        fontSize: textScale(12),
    },
    seprator: {
        backgroundColor: colors.grey300,
        height: spacing.HEIGHT_2
    },
});

export default AddressSearchListRow;