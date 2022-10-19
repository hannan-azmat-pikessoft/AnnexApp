import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useSelector } from 'react-redux';
import apiCall from '../../../../redux/services/apiCall';
import { API_PROMOCODE } from '../../../../redux/services/apiTypes';
import { textScale } from '../../../../styles/responsiveStyles';
import { spacing } from '../../../../styles/spacing';
import { fontNames } from '../../../../styles/typography';
import Strings from '../../../../translation/language';
import colors from '../../../../utility/colors';
import { getErrorMessage, navigate } from '../../../../utility/commonFunctions';
import { ANIMATION_TYPES, EASING_TYPE, SCREEN_ADD_CARD } from '../../../../utility/constants';
import { Images } from '../../../../utility/imagePaths';
import RegularText from '../../../common/RegularText';
import CommonImage from '../../../common/views/CommonImage';
import VirtualizedView from '../../../common/views/VirtualizedView';
import PromocodeModel from '../../../modals/promocodeModel';

const CardComponent = ({ icons, text, onPressCard, textStyle }) => {
    return (
        <TouchableOpacity style={styles.cardView} onPress={() => onPressCard()} >
            {
                icons ?
                    <CommonImage source={icons} />
                    :
                    <RegularText style={[styles.cardText, textStyle]}>{text}</RegularText>
            }
        </TouchableOpacity>
    )
}

const ServicePaymentSummary = ({ serviceBookingRequestRes }) => {

    const [promoApplyLoading, setPromoApplyLoading] = useState(false);
    const [showPromocodeModel, setShowPromocodeModel] = useState(false)
    // const [isPromocodeSelected, setisPromocodeSelected] = useState(false)

    const [promocode, setPromocode] = useState('')
    const [selectedPromocode, setSelectedPromocode] = useState()
    const [discount, setDiscount] = useState(0)

    const {
        serviceInCart,
        totalServicePriceWithoutVAT,
        totalServicePriceWithVAT,
        totalServiceVAT
    } = useSelector(state => state.bookServiceReducer)

    function calculateDiscount(data) {
        let discount;
        if (data.promo_type == "flat") {
            discount = (data.value / 100) * serviceInCart.service.price
            if (discount >= data.max_amount) {
                setDiscount(max_amount)
            }
            setDiscount(discount)
        }
    }

    function onPressAddPaymentMethod() {
        navigate(SCREEN_ADD_CARD)
    }

    function onPressEnterPromocode() {
        setShowPromocodeModel(true)
    }
    function onclosePromocodeModel() {
        setShowPromocodeModel(false)
    }
    function onPressPromocode(item) {
        setShowPromocodeModel(false)
        setSelectedPromocode(item)
        calculateDiscount(item)
    }
    function onPressChangePromocode() {
        setShowPromocodeModel(true)
    }
    function onPressPromocodeApply() {
        setPromoApplyLoading(true)

        const payload = {
            promo_code: promocode,
            price: serviceInCart.service.price,
        }

        const apiData = {
            type: API_PROMOCODE + "validate/",
            apiType: "POST",
            payload: payload,
        }

        apiCall(apiData)
            .then((res) => {
                setSelectedPromocode(promocode)
                calculateDiscount(res)
                setSelectedPromocode(res.promo_code)
                setShowPromocodeModel(false)
                setPromoApplyLoading(false)
            })
            .catch((err) => {
                getErrorMessage(err)
                setPromoApplyLoading(false)
            })
    }


    return (
        <VirtualizedView style={styles.mainContainer} >
            <Animatable.View
                animation={ANIMATION_TYPES.FADE_IN_DOWN_BIG}
                duration={1000}
                easing={EASING_TYPE.EASE_IN_OUT}
                style={styles.topContainer} >
                {
                    !selectedPromocode ?
                        <TouchableOpacity style={styles.promoCodeView} onPress={() => onPressEnterPromocode()} >
                            <View style={styles.promoCodeView_RightContainer}  >
                                <CommonImage source={Images.IMG_STAR_FILLED} />
                                <View style={styles.promoCodeView_RightContainer_textContainer} >
                                    <RegularText style={styles.promoCodeView_RightContainer_textContainer_title} >{Strings.enter_promo_code}</RegularText>
                                    <RegularText style={styles.promoCodeView_RightContainer_textContainer_description} >{Strings.promocode_available_tap_here_to_check}</RegularText>
                                </View>
                            </View>
                            <CommonImage source={Images.IMG_DOWN_ARROW} style={styles.promoCodeView_downArrow} />
                        </TouchableOpacity>
                        :
                        <View style={styles.promoCodeView} >
                            <View style={styles.promoCodeView} >
                                <CommonImage
                                    source={Images.IMG_RIGHT_TICK}
                                    viewStyle={{
                                        borderWidth: 2,
                                        height: spacing.HEIGHT_34,
                                        width: spacing.HEIGHT_34,
                                        borderRadius: spacing.RADIUS_100,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderColor: colors.lightGreen600
                                    }}
                                    style={{ tintColor: colors.lightGreen600, width: spacing.WIDTH_16, height: spacing.WIDTH_16 }}
                                />
                                <RegularText style={styles.promocodeStyle} >{`${selectedPromocode.code} ${Strings.applied}!`}</RegularText>
                            </View>
                            <TouchableOpacity onPress={() => onPressChangePromocode()} style={{ paddingHorizontal: spacing.PADDING_8, paddingVertical: spacing.PADDING_4 }} >
                                <RegularText style={{ color: colors.grey500 }} >{Strings.change_promocode}</RegularText>
                            </TouchableOpacity>
                        </View>
                }
                <View style={styles.seprator} />

                <RegularText style={styles.paymentSummaryTitle} >{Strings.payment_summary}</RegularText>
                <RegularText style={styles.serviceName} >{serviceInCart.service.name}</RegularText>

                <View style={styles.commonStyle}>
                    <RegularText style={styles.serviceDescription} >{serviceInCart.service.description}</RegularText>
                    <RegularText style={styles.price} >{Strings.aed + " " + serviceInCart.service.price}</RegularText>
                </View>

                <View style={styles.seprator} />

                <View style={styles.commonStyle}>
                    <RegularText style={styles.totalAmmountText}  >{Strings.total_amount_incl_vat}</RegularText>
                    <RegularText style={styles.price} >{Strings.aed + " " + totalServicePriceWithoutVAT}</RegularText>
                </View>
                {
                    selectedPromocode &&
                    <View style={[styles.commonStyle, { marginTop: spacing.MARGIN_12 }]}>
                        <RegularText style={styles.totalAmmountText}  >{Strings.discount}</RegularText>
                        <RegularText style={styles.price} >{` - ${Strings.aed} ${discount}`}</RegularText>
                    </View>
                }
                <View style={[styles.commonStyle, { marginVertical: spacing.MARGIN_12 }]}>
                    <RegularText style={styles.grandTotalText} >{Strings.grand_total}</RegularText>
                    <RegularText style={styles.price} >{Strings.aed + " " + (totalServicePriceWithoutVAT + totalServiceVAT - discount)}</RegularText>
                </View>
                <View style={styles.commonStyle}>
                    <RegularText style={styles.estimatedVatText} >{Strings.estimated_vat}</RegularText>
                    <RegularText style={styles.estimatedVatPrice}>{Strings.aed + " " + totalServiceVAT}</RegularText>
                </View>
            </Animatable.View>

            <View style={styles.bottomContainer} >
                <RegularText style={styles.bookingAndCancellationText} >{Strings.booking_and_cancellation_terms}</RegularText>
                {/* <View style={styles.paymentMethodsContainer} >
                    <RegularText style={styles.paymentMethodText} >{Strings.payment_methods}</RegularText>
                    <Animatable.View
                        animation={ANIMATION_TYPES.SLIDE_IN_RIGHT}
                        duration={500}
                        easing={EASING_TYPE.EASE_IN_OUT}
                        style={styles.cardContainer} >
                        <CardComponent text={Strings.debit_credit_card} textStyle={{ color: colors.black }} onPressCard={() => { }} />
                        <CardComponent icons={Images.IMG_APPLE_PAY} onPressCard={() => { }} />
                        <CardComponent text={Strings.add} onPressCard={() => onPressAddPaymentMethod()} />
                    </Animatable.View>
                </View> */}
            </View>
            <PromocodeModel
                visible={showPromocodeModel}
                onClose={onclosePromocodeModel}
                promocode={promocode}
                setPromocode={setPromocode}
                onPressApply={onPressPromocodeApply}
                onPressPromocode={onPressPromocode}
                buttonLoading={promoApplyLoading}
            />
        </VirtualizedView >
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    topContainer: {
        backgroundColor: colors.white,
        marginTop: spacing.MARGIN_24,
        paddingHorizontal: spacing.PADDING_18,
        paddingVertical: spacing.PADDING_18,
    },
    promoCodeView: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    },
    promoCodeView_RightContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    },
    promoCodeView_RightContainer_textContainer: {
        marginLeft: spacing.MARGIN_12

    },
    promoCodeView_RightContainer_textContainer_title: {
        fontSize: textScale(12),
        fontFamily: fontNames.FONT_FAMILY_MEDIUM
    },
    promoCodeView_RightContainer_textContainer_description: {
        fontSize: textScale(10),
        marginTop: spacing.MARGIN_4,
        fontFamily: fontNames.FONT_FAMILY_LIGHT,
        color: colors.grey500
    },
    promoCodeView_downArrow: {

    },
    seprator: {
        height: spacing.HEIGHT_1,
        marginVertical: spacing.MARGIN_20,
        backgroundColor: colors.grey300
    },
    paymentSummaryTitle: {
        fontSize: textScale(14),
        fontFamily: fontNames.FONT_FAMILY_BOLD,
        marginBottom: spacing.MARGIN_16,
    },
    serviceName: {
        fontSize: textScale(12),
        fontFamily: fontNames.FONT_FAMILY_MEDIUM,
        marginTop: spacing.MARGIN_10
    },
    commonStyle: {
        flexDirection: "row",
        alignItems: "center"
    },
    serviceDescription: {
        flex: 1,
        fontSize: textScale(8),
        fontFamily: fontNames.FONT_FAMILY_LIGHT,
        marginRight: spacing.MARGIN_40,
        marginTop: spacing.MARGIN_4
    },
    price: {
        fontSize: textScale(10),
        fontFamily: fontNames.FONT_FAMILY_MEDIUM,
    },
    totalAmmountText: {
        fontSize: textScale(12),
        flex: 1,
        fontFamily: fontNames.FONT_FAMILY_MEDIUM
    },
    grandTotalText: {
        flex: 1,
        fontSize: textScale(12),
        fontFamily: fontNames.FONT_FAMILY_MEDIUM
    },
    estimatedVatText: {
        flex: 1,
        fontSize: textScale(12),
        color: colors.grey500,
        fontFamily: fontNames.FONT_FAMILY_MEDIUM
    },
    estimatedVatPrice: {
        fontSize: textScale(12),
        fontFamily: fontNames.FONT_FAMILY_MEDIUM,
        color: colors.grey500
    },
    bottomContainer: {
        marginTop: spacing.MARGIN_24,
        marginBottom: spacing.MARGIN_84
    },
    bookingAndCancellationText: {
        fontSize: textScale(10),
        color: colors.grey500,
        textDecorationLine: 'underline',
        alignSelf: "center"
    },
    paymentMethodsContainer: {
        paddingHorizontal: spacing.PADDING_18
    },
    paymentMethodText: {
        fontSize: textScale(14),
        fontFamily: fontNames.FONT_FAMILY_BOLD,
        marginBottom: spacing.MARGIN_16,
        marginTop: spacing.MARGIN_30,
    },
    cardContainer: {
        flexDirection: "row"
    },
    cardView: {
        backgroundColor: colors.white,
        paddingHorizontal: spacing.PADDING_18,
        paddingVertical: spacing.PADDING_16,
        justifyContent: "center",
        alignItems: "center",
        marginRight: spacing.PADDING_18,
        borderRadius: spacing.RADIUS_4,
        height: spacing.HEIGHT_56
    },
    cardText: {
        fontSize: textScale(10),
        color: colors.theme,
        fontFamily: fontNames.FONT_FAMILY_MEDIUM
    },
    promocodeStyle: {
        flex: 1,
        marginLeft: spacing.MARGIN_12,
        fontSize: textScale(12),
        color: colors.lightGreen600,
    },
})

export default ServicePaymentSummary; 