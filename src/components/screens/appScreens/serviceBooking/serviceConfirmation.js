import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Dash from 'react-native-dash';
import WebView from 'react-native-webview';
import { textScale } from '../../../../styles/responsiveStyles';
import { spacing } from '../../../../styles/spacing';
import { fontNames } from '../../../../styles/typography';
import Strings from '../../../../translation/language';
import colors from '../../../../utility/colors';
import { navigate } from '../../../../utility/commonFunctions';
import { SCREEN_HOME } from '../../../../utility/constants';
import { Images } from '../../../../utility/imagePaths';
import CommonButton from '../../../common/buttons/CommonButton';
import flashMessage from '../../../common/CustomFlashAlert';
import RegularText from '../../../common/RegularText';
import CommonImage from '../../../common/views/CommonImage';
import VirtualizedView from '../../../common/views/VirtualizedView';

const ServiceConfirmation = ({ isPaymentDone, setIsPaymentDone, serviceBookingRequestRes, onPaymentFailed }) => {
    function onPressGoHome() {
        navigate(SCREEN_HOME)
    }

    function listenPostMessages(postmessageEvent) {
        if (postmessageEvent) {
            if (postmessageEvent.type == 'success') {
                setIsPaymentDone(true)
            } else if (postmessageEvent.type == 'failed') {
                flashMessage(Strings.msg_payment_failed, 'danger')
                onPaymentFailed()
            }
        }
    }

    return (
        <View style={{ flex: 1, }} >
            {
                isPaymentDone == true ?
                    <VirtualizedView style={styles.mainContainer} >
                        <View style={styles.paymentSuccessfulCard} >
                            <View style={styles.paymentSuccessfulCard_firstView}>
                                <CommonImage source={Images.IMG_RECEIPT_PAYEMNT} />
                                <RegularText style={styles.paymentSuccessfulText}>{Strings.payment_successful}</RegularText>
                            </View>

                            <View style={styles.sepratorContainer} >
                                <View style={styles.semiCircle} />
                                <Dash style={{ height: 1, flex: 0.9, alignSelf: 'center', justifyContent: 'center' }} dashLength={spacing.WIDTH_12} dashColor={colors.grey300} dashThickness={2} dashGap={spacing.MARGIN_4} />
                                <View style={styles.semiCircle} />
                            </View>

                            <View style={[styles.commonStyle, {}]} >
                                <RegularText style={styles.amountPaidText}>{Strings.amount_paid}</RegularText>
                                <RegularText style={styles.amountPaidPrice}>{`${Strings.aed} ${serviceBookingRequestRes.total}`}</RegularText>
                            </View>
                            <View style={styles.commonStyle} >
                                <RegularText style={styles.transactionIdText} >{Strings.service_booking_id}</RegularText>
                                <RegularText style={styles.transactionId} >{serviceBookingRequestRes.id}</RegularText>
                            </View>
                            <View style={styles.commonStyle} >
                                <RegularText style={styles.transactionIdText} >{Strings.booking_date}</RegularText>
                                <RegularText style={styles.transactionId} >{serviceBookingRequestRes.slot.session.date}</RegularText>
                            </View>
                            <View style={styles.commonStyle} >
                                <RegularText style={styles.transactionIdText} >{Strings.booking_time}</RegularText>
                                <RegularText style={styles.transactionId} >{`${serviceBookingRequestRes.slot.start_time}-${serviceBookingRequestRes.slot.end_time}`}</RegularText>
                            </View>

                            {/* <CommonButton
                                title={Strings.download_invoice}
                                buttonStyle={styles.buttonStyle}
                                marginTop={spacing.MARGIN_30}
                                textStyle={{ fontFamily: fontNames.FONT_FAMILY_BOLD, fontSize: textScale(10) }}
                            /> */}
                        </View>
                        <TouchableOpacity style={{ marginTop: spacing.MARGIN_20 }} onPress={() => onPressGoHome()} >
                            <RegularText style={styles.goHomeText}>{Strings.go_home}</RegularText>
                        </TouchableOpacity>
                    </VirtualizedView>
                    :
                    <View style={{ flex: 1, }} >
                        <WebView
                            containerStyle={{ flexGrow: 1, }}
                            scalesPageToFit
                            onLoadEnd={() => { }}
                            style={{ flexGrow: 1, }}
                            source={{ uri: serviceBookingRequestRes.payment_url }}
                            onError={error => { }}
                            onMessage={event => {
                                if (event.nativeEvent.data) {
                                    listenPostMessages(JSON.parse(event.nativeEvent.data));
                                }
                            }}
                            startInLoadingState={true}
                            enableApplePay={true}
                        />
                    </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingHorizontal: spacing.PADDING_16,
    },
    paymentSuccessfulCard: {
        backgroundColor: colors.white,
        marginTop: spacing.MARGIN_40,
        paddingHorizontal: spacing.PADDING_18,
        borderRadius: spacing.RADIUS_4,
        paddingVertical: spacing.PADDING_28,
        paddingHorizontal: spacing.PADDING_28
    },
    paymentSuccessfulCard_firstView: {
        justifyContent: "center",
        alignItems: "center",
    },
    paymentSuccessfulText: {
        fontSize: textScale(14),
        fontFamily: fontNames.FONT_FAMILY_BOLD,
        marginTop: spacing.MARGIN_12
    },
    commonStyle: {
        flexDirection: "row",
        marginTop: spacing.MARGIN_12
    },
    amountPaidText: {
        flex: 1,
        fontSize: textScale(12),
    },
    amountPaidPrice: {
        fontSize: textScale(12),
        fontFamily: fontNames.FONT_FAMILY_BOLD,
    },
    transactionIdText: {
        flex: 1,
        fontSize: textScale(12),
    },
    transactionId: {
        fontSize: textScale(10),
        color: colors.theme
    },
    sepratorContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: -spacing.MARGIN_50,
        marginTop: spacing.MARGIN_24,
    },
    semiCircle: {
        width: spacing.WIDTH_34,
        height: spacing.WIDTH_34,
        backgroundColor: colors.grey200,
        borderRadius: spacing.RADIUS_50
    },
    seprator: {
        borderBottomWidth: spacing.WIDTH_2,
        borderColor: colors.grey200,
        borderStyle: 'dashed',
    },
    buttonStyle: {
        borderRadius: spacing.RADIUS_50,
        paddingHorizontal: spacing.PADDING_22
    },
    goHomeText: {
        textAlign: "center",
        fontSize: textScale(10),
        fontFamily: fontNames.FONT_FAMILY_MEDIUM,
        color: colors.secondaryColor,
        textTransform: 'capitalize'
    },
})

export default ServiceConfirmation; 