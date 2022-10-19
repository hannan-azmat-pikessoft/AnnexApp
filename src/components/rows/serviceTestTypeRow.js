import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { addServiceIntoCartAction, minusServiceQuantityInCartAction, plusServiceQuantityInCartAction } from '../../redux/actions/bookServicesAction';
import { textScale } from '../../styles/responsiveStyles';
import { spacing } from '../../styles/spacing';
import { fontNames } from '../../styles/typography';
import Strings from '../../translation/language';
import colors from '../../utility/colors';
import { Images } from '../../utility/imagePaths';
import CommonButton from '../common/buttons/CommonButton';
import RegularText from '../common/RegularText';
import CommonImage from '../common/views/CommonImage';

const ServiceTestTypeRow = ({ item, index, onPressBookService, onPressPlus, onPressMinus }) => {

    const dispatch = useDispatch();

    const {
        serviceInCart,
        isGuestUser } =
        useSelector(state => ({
            serviceInCart: state.bookServiceReducer.serviceInCart,
            isGuestUser: state.authReducer.isGuestUser
        }), shallowEqual)

    return (
        <View style={[styles.mainView,]}>
            <View style={{ flex: 1, marginRight: spacing.MARGIN_12 }}>
                <RegularText style={styles.heading} >{item.name}</RegularText>
                <RegularText style={styles.description}>{item.description}</RegularText>
                {item.condition ? <RegularText style={styles.description}>{`**${item.condition}`}</RegularText> : null}
                {item.is_fasting_required ? <RegularText style={[styles.description, { textTransform: 'capitalize' }]}>{`${Strings.requires} ${item.required_fasting_duration} ${Strings.hours_of_fasting}`}</RegularText> : null}
                <RegularText style={styles.price}>
                    {`${Strings.aed} ${item.price}  `}
                    {
                        parseInt(item.discount_percent) > 0 &&
                        <RegularText style={styles.discount}>
                            {`${Strings.aed} ${item.discount_percent}`}
                        </RegularText>
                    }
                </RegularText>
            </View>
            {
                serviceInCart?.service?.id == item.id ?
                    <View style={styles.quantityButtonContainer} >
                        <TouchableOpacity style={styles.plusMinusButtonStyle} onPress={() => onPressMinus(item)} >
                            <CommonImage source={Images.IMG_MINUS_SQUARE} style={styles.plusMinusImagestyle} />
                        </TouchableOpacity>
                        <RegularText style={styles.addRemoveButtonText} >{serviceInCart.quantity}</RegularText>
                        <TouchableOpacity style={styles.plusMinusButtonStyle} onPress={() => onPressPlus(item)} >
                            <CommonImage source={Images.IMG_PLUS_SQUARE} style={styles.plusMinusImagestyle} />
                        </TouchableOpacity>
                    </View>
                    :
                    <CommonButton
                        title={Strings.book_service}
                        buttonStyle={styles.buttonView}
                        textStyle={styles.buttonText}
                        onPressButton={() => onPressBookService(item)}
                        disabled={isGuestUser}
                    />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        borderRadius: spacing.RADIUS_8,
        backgroundColor: colors.white,
        flexDirection: "row",
        padding: spacing.PADDING_12,
        marginBottom: spacing.MARGIN_8,
    },
    heading: {
        fontFamily: fontNames.FONT_FAMILY_MEDIUM,
        fontSize: textScale(12)
    },
    description: {
        color: colors.grey800,
        fontSize: textScale(8),
        marginTop: spacing.MARGIN_4,
    },
    price: {
        fontFamily: fontNames.FONT_FAMILY_BOLD,
        fontSize: textScale(10),
        marginTop: spacing.MARGIN_10
    },
    discount: {
        textDecorationLine: 'line-through',
        color: colors.grey500,
        fontSize: textScale(8),
    },
    buttonView: {
        borderRadius: spacing.RADIUS_50,
        paddingVertical: 0,
        height: spacing.HEIGHT_36,
        paddingHorizontal: spacing.PADDING_20,
        minWidth: spacing.FULL_WIDTH / 3
    },
    buttonText: {
        fontSize: textScale(11),
    },
    quantityButtonContainer: {
        borderWidth: spacing.WIDTH_2,
        borderColor: colors.theme,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: spacing.RADIUS_90,
        paddingVertical: spacing.PADDING_4,
        minWidth: spacing.FULL_WIDTH / 3,
    },
    addRemoveButtonText: {
        flex: 1,
        fontSize: textScale(12),
        fontFamily: fontNames.FONT_FAMILY_MEDIUM,
        color: colors.theme,
        alignItems: "center",
        textAlign: "center",
    },
    plusMinusButtonStyle: {
        // flex: 1,
        alignItems: "center",
        paddingHorizontal: spacing.PADDING_8,
        paddingVertical: spacing.PADDING_2
    },
    plusMinusImagestyle: {
        width: spacing.WIDTH_18,
        height: spacing.WIDTH_18
    },
});

export default ServiceTestTypeRow;