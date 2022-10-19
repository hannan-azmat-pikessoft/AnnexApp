import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Keyboard } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { removeServiceFromCartAction } from '../../redux/actions/bookServicesAction';
import { boxShadow } from '../../styles/Mixins';
import { textScale } from '../../styles/responsiveStyles';
import { spacing } from '../../styles/spacing';
import { fontNames } from '../../styles/typography';
import Strings from '../../translation/language';
import colors from '../../utility/colors';
import { goBack } from '../../utility/commonFunctions';
import { ANIMATION_TYPES, EASING_TYPE, SCREEN_SERVICE_BOOKING_APPOINTMENT, SCREEN_SERVICE_BOOKING_DESCRIPTION, SCREEN_SERVICE_BOOKING_PAYMENT_SUMMARY } from '../../utility/constants';
import { Images } from '../../utility/imagePaths';
import CommonButton from '../common/buttons/CommonButton';
import RegularText from '../common/RegularText';
import CommonImage from '../common/views/CommonImage';

const CartSummaryRow = ({ onPressContinue, currentPage }) => {

    const dispatch = useDispatch()

    const [isContinueButtonEnable, setIsContinueButtonEnable] = useState(true)

    const { serviceInCart,
        totalServicePriceWithVAT,
        serviceSessionDatesFetching,
        serviceSessionFetching,
        serviceSessionSlotsFetching,
        serviceSessionDatesRes,
        serviceSessionRes,
        serviceSessionSlotsRes
    } = useSelector(state => ({
        serviceInCart: state.bookServiceReducer.serviceInCart,
        totalServicePriceWithVAT: state.bookServiceReducer.totalServicePriceWithVAT,
        serviceSessionDatesFetching: state.serviceSessionReducer.serviceSessionDatesFetching,
        serviceSessionFetching: state.serviceSessionReducer.serviceSessionFetching,
        serviceSessionSlotsFetching: state.serviceSessionReducer.serviceSessionSlotsFetching,

        serviceSessionDatesRes: state.serviceSessionReducer.serviceSessionDatesRes,
        serviceSessionRes: state.serviceSessionReducer.serviceSessionRes,
        serviceSessionSlotsRes: state.serviceSessionReducer.serviceSessionSlotsRes,
    }), shallowEqual)
    const [isCartListVisible, setIsCartListVisible] = useState(false)

    useEffect(() => {
        if (currentPage == SCREEN_SERVICE_BOOKING_APPOINTMENT) {
            if (serviceSessionDatesFetching || serviceSessionFetching || serviceSessionSlotsFetching) {
                setIsContinueButtonEnable(false)
            } else if (!serviceSessionDatesFetching && !serviceSessionFetching && !serviceSessionSlotsFetching) setIsContinueButtonEnable(true)
        }
    }, [currentPage, serviceSessionDatesFetching, serviceSessionFetching, serviceSessionSlotsFetching])

    useEffect(() => {
        if (serviceInCart.quantity < 1) setIsContinueButtonEnable(false)
    }, [serviceInCart])

    function toggleCartList() {
        Keyboard.dismiss()
        setIsCartListVisible(!isCartListVisible)
    }

    function onPressDeleteService() {
        dispatch(removeServiceFromCartAction())
        setIsCartListVisible(false)
        if (currentPage == SCREEN_SERVICE_BOOKING_DESCRIPTION ||
            currentPage == SCREEN_SERVICE_BOOKING_APPOINTMENT ||
            currentPage == SCREEN_SERVICE_BOOKING_PAYMENT_SUMMARY) {
            goBack()
        }
    }

    return (
        <Animatable.View
            animation={ANIMATION_TYPES.SLIDE_IN_UP}
            duration={200}
            easing={EASING_TYPE.EASE_IN_OUT}
        >
            {
                isCartListVisible &&
                <Animatable.View
                    animation={ANIMATION_TYPES.SLIDE_IN_UP}
                    duration={200}
                    easing={EASING_TYPE.EASE_IN_OUT}
                >
                    <View style={styles.cartListContainer} >
                        <View style={styles.cartListContainerHeader} >
                            <RegularText style={{ fontSize: textScale(12), color: colors.grey800, fontFamily: fontNames.FONT_FAMILY_MEDIUM }} >
                                {Strings.your_bucket}
                            </RegularText>
                        </View>
                        <View style={{ flexDirection: 'row', }} >
                            <View style={{ flex: 4, paddingHorizontal: spacing.PADDING_12, paddingVertical: spacing.PADDING_8 }} >
                                <RegularText style={{ fontSize: textScale(12), color: colors.grey800, fontFamily: fontNames.FONT_FAMILY_BOLD }} >
                                    {serviceInCart.service.name}
                                </RegularText>
                                <RegularText style={{ fontSize: textScale(8), color: colors.grey800, }} numberOfLines={1} >
                                    {serviceInCart.service.description}
                                </RegularText>
                                <RegularText style={{ fontSize: textScale(8), color: colors.black, marginTop: spacing.MARGIN_4 }} numberOfLines={1} >
                                    {`${Strings.aed} ${serviceInCart.service.price}`}
                                </RegularText>
                            </View>
                            <TouchableOpacity
                                style={{ flex: 1, backgroundColor: colors.red600, justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => onPressDeleteService()}
                            >
                                <RegularText style={{ fontSize: textScale(10), color: colors.grey800, fontFamily: fontNames.FONT_FAMILY_MEDIUM, color: colors.white }} >
                                    {Strings.delete}
                                </RegularText>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animatable.View>
            }
            <View style={styles.totalPriceContainer}>
                <View style={{ flex: 1 }} >
                    <RegularText style={styles.priceContainer} >{`${Strings.aed} ${totalServicePriceWithVAT}`}</RegularText>
                    <TouchableOpacity
                        style={{ flexDirection: "row", alignItems: "center", marginTop: spacing.MARGIN_2 }}
                        onPress={() => toggleCartList()}
                    >
                        <RegularText style={{ fontSize: textScale(10), color: colors.theme, }} >{isCartListVisible ? Strings.hide_items : Strings.view_items}</RegularText>
                        <CommonImage
                            source={Images.IMG_SHOPPING_BASKET}
                            viewStyle={{ marginLeft: spacing.MARGIN_4 }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, }} >
                    <CommonButton
                        title={Strings.continue}
                        rightImage={Images.IMG_ARROW_LEFT}
                        rightImageStyle={{ transform: [{ rotate: "180deg" }], tintColor: colors.white }}
                        buttonStyle={{ height: spacing.HEIGHT_50 }}
                        textStyle={{ fontSize: textScale(12), fontFamily: fontNames.FONT_FAMILY_MEDIUM }}
                        onPressButton={onPressContinue}
                        disabled={!isContinueButtonEnable}
                    // backgroundColor={!serviceSessionDatesFetching && !serviceSessionFetching && !serviceSessionSlotsFetching && serviceSessionDatesRes.length > 0 && serviceSessionRes.length > 0 && serviceSessionSlotsRes.length > 0 ? colors.grey700 : colors.theme}
                    />
                </View>
            </View>
        </Animatable.View>
    )
}

const styles = StyleSheet.create({
    totalPriceContainer: {
        flexDirection: "row",
        alignItems: 'center',
        backgroundColor: colors.white,
        paddingHorizontal: spacing.PADDING_28,
        paddingVertical: spacing.PADDING_18,
        borderTopWidth: spacing.HEIGHT_1,
        borderTopColor: colors.grey100,
    },
    priceContainer: {
        fontSize: textScale(14),
        fontFamily: fontNames.FONT_FAMILY_BOLD,
    },
    cartListContainer: {
        backgroundColor: colors.white,
        borderTopLeftRadius: spacing.RADIUS_16,
        borderTopRightRadius: spacing.RADIUS_16,
        borderBottomWidth: 1,
        borderBottomColor: colors.grey200,
        ...boxShadow()
    },
    cartListContainerHeader: {
        alignItems: 'center',
        paddingVertical: spacing.PADDING_24,
        borderBottomWidth: 1,
        borderBottomColor: colors.grey200
    }
});

export default CartSummaryRow;