import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { clearServiceSession, clearServiceSessionDates, clearServiceSessionSlots } from '../../../../redux/actions/serviceSessionAction';
import apiCall from '../../../../redux/services/apiCall';
import { API_SERVICE } from '../../../../redux/services/apiTypes';
import { spacing } from '../../../../styles/spacing';
import Strings from '../../../../translation/language';
import { isInputEmpty } from '../../../../utility//validations';
import colors from '../../../../utility/colors';
import { changeStatusBarColor, getErrorMessage, goBack } from '../../../../utility/commonFunctions';
import { ANIMATION_TYPES, EASING_TYPE, SCREEN_SERVICE_BOOKING_APPOINTMENT, SCREEN_SERVICE_BOOKING_CONFIRMATION, SCREEN_SERVICE_BOOKING_DESCRIPTION, SCREEN_SERVICE_BOOKING_PAYMENT_SUMMARY, STATUS_BAR_CONSTANTS } from '../../../../utility/constants';
import { Images } from '../../../../utility/imagePaths';
import CommonHeader from '../../../common/headers/CommonHeader';
import CommonImage from '../../../common/views/CommonImage';
import CartSummaryRow from '../../../rows/cartSummaryRow';
import ServiceApppointment from './serviceAppointment';
import ServiceConfirmation from './serviceConfirmation';
import ServiceDescription from './serviceDescription';
import ServicePaymentSummary from './servicePaymentSummary';

function RenderStep({ isDone, isInProgress }) {
    return (
        <View style={[styles.progressIconContainer, isInProgress && { backgroundColor: colors.white }]} >
            {isDone
                &&
                <Animatable.View
                    animation={ANIMATION_TYPES.FADE_IN}
                    duration={1000}
                    easing={EASING_TYPE.EASE_IN_OUT}>
                    <CommonImage source={Images.IMG_RIGHT_TICK} style={{ tintColor: colors.theme }}
                    />
                </Animatable.View>
            }
        </View>
    )
}

const ServiceBooking = ({ route }) => {
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(SCREEN_SERVICE_BOOKING_DESCRIPTION);

    const [isScheduleAppointmentInProgress, setIsScheduleAppointmentInProgress] = useState(false)
    const [isPaymentInProgress, setIsPaymentInProgress] = useState(false)

    const [isServiceDescriptionDone, setIsServiceDescriptionDone] = useState(false)
    const [isScheduleAppointmentDone, setIsScheduleAppointmentDone] = useState(false)
    const [isPaymentDone, setIsPaymentDone] = useState(false)

    const [serviceBookingRequestRes, setServiceBookingRequestRes] = useState("")
    const [description, setDescription] = useState("")
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTimeType, setSelectedTimeType] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [location, setLocation] = useState("");
    const [name, setName] = useState("");
    const [voiceNote, setVoiceNote] = useState("")
    const [selectedImage, setSelectedImage] = useState([])

    const [nameError, setNameError] = useState("");
    const [locationError, setLocationError] = useState("");
    const [descriptionError, setDescriptionError] = useState("")
    const [dateError, setDateError] = useState("");
    const [sessionError, setSessionError] = useState("");
    const [slotError, setSlotError] = useState("");

    const { serviceInCart, totalServicePriceWithVAT } = useSelector(state => state.bookServiceReducer)
    const { userRes } = useSelector(state => ({ userRes: state.userReducer.userRes, }), shallowEqual)

    useEffect(() => {
        return () => {
            dispatch(clearServiceSessionDates())
            dispatch(clearServiceSession())
            dispatch(clearServiceSessionSlots())
        }
    }, [])

    useEffect(() => {
        if (userRes) setName(userRes.name)
    }, [userRes])

    useFocusEffect(
        React.useCallback(() => {
            changeStatusBarColor(colors.theme, STATUS_BAR_CONSTANTS.LIGHT, serviceInCart.quantity != 0 ? colors.white : colors.appBackgroundColor)
        }, [serviceInCart.quantity])
    );

    function onPressBackIcon() {
        if (currentPage == SCREEN_SERVICE_BOOKING_DESCRIPTION) goBack()
        else if (currentPage == SCREEN_SERVICE_BOOKING_APPOINTMENT) setCurrentPage(SCREEN_SERVICE_BOOKING_DESCRIPTION)
        else if (currentPage == SCREEN_SERVICE_BOOKING_PAYMENT_SUMMARY) setCurrentPage(SCREEN_SERVICE_BOOKING_APPOINTMENT)
        else setCurrentPage(SCREEN_SERVICE_BOOKING_PAYMENT_SUMMARY)
    }

    function onPressContinue() {
        if (currentPage == SCREEN_SERVICE_BOOKING_DESCRIPTION) {
            validateBookingDesciption()
            return
        }
        if (currentPage == SCREEN_SERVICE_BOOKING_APPOINTMENT) {
            validateBookingAppointment()
            return
        }
        if (currentPage == SCREEN_SERVICE_BOOKING_PAYMENT_SUMMARY && isScheduleAppointmentDone) {
            let payload = {
                instruction: description,
                slot: selectedTime.id,
                location: location.id,
                quantity: serviceInCart.quantity,
                voice_note: voiceNote,
                attachment: selectedImage,
            };

            const apiData = {
                type: API_SERVICE + serviceInCart.service.id + "/request/",
                apiType: "PATCH",
                payload: payload,
            }

            apiCall(apiData)
                .then((res) => {
                    setServiceBookingRequestRes(res)
                    // alert(JSON.stringify(res.payment_url))
                    setCurrentPage(SCREEN_SERVICE_BOOKING_CONFIRMATION)
                })
                .catch((err) => {
                    getErrorMessage(err)
                })
            return
        }
    }

    async function validateBookingDesciption() {

        const validateDescription = isInputEmpty(description);

        if (!validateDescription.success) { setDescriptionError(Strings.msg_service_booking_instruction_is_empty) } else { setDescriptionError('') }
        if (!validateDescription.success) { return }

        setIsScheduleAppointmentInProgress(true)
        setIsServiceDescriptionDone(true)
        setCurrentPage(SCREEN_SERVICE_BOOKING_APPOINTMENT)
        return true
    }

    async function validateBookingAppointment() {

        const validateDate = isInputEmpty(selectedDate)
        const validateSession = isInputEmpty(selectedTimeType)
        const validateSlot = isInputEmpty(selectedTime)
        const validateName = isInputEmpty(name)
        const validateLocation = isInputEmpty(location)

        if (!validateName.success) { setNameError(Strings.msg_please_enter_your_name) } else { setNameError('') }
        if (!validateLocation.success) { setLocationError(Strings.msg_location_is_empty) } else { setLocationError('') }
        if (!validateDate.success) { setDateError(Strings.msg_select_date) } else { setDateError('') }
        if (!validateSession.success) { setSessionError(Strings.msg_select_session) } else { setSessionError('') }
        if (!validateSlot.success) { setSlotError(Strings.msg_select_slot) } else { setSlotError('') }

        if (!validateDate.success ||
            !validateSession.success ||
            !validateSlot.success ||
            !validateName.success ||
            !validateLocation.success
        ) { return }

        setIsScheduleAppointmentDone(true)
        setCurrentPage(SCREEN_SERVICE_BOOKING_PAYMENT_SUMMARY)
        setIsPaymentInProgress(true)
        setIsPaymentReceiptDone(true)
        return true
    }

    async function validatePaymentSummary() {
        setCurrentPage(SCREEN_SERVICE_BOOKING_CONFIRMATION)
        return true
    }

    function onPaymentFailed() {
        onPressBackIcon()
    }

    return (
        <View style={{ flex: 1 }} >
            <CommonHeader
                title={
                    currentPage == SCREEN_SERVICE_BOOKING_DESCRIPTION ? Strings.service_description :
                        currentPage == SCREEN_SERVICE_BOOKING_APPOINTMENT ? Strings.schedule :
                            currentPage == SCREEN_SERVICE_BOOKING_PAYMENT_SUMMARY ? Strings.payment_summary :
                                (currentPage == SCREEN_SERVICE_BOOKING_CONFIRMATION && !isPaymentDone) ? Strings.payment_in_progress :
                                    (currentPage == SCREEN_SERVICE_BOOKING_CONFIRMATION && isPaymentDone) ? Strings.payment_successful : ""
                }
                onBack={() => onPressBackIcon()}
            />
            <View style={styles.progressIndicatorContainer} >
                <RenderStep isDone={isServiceDescriptionDone} isInProgress={true} />
                <View style={[styles.progressIconSeprator, isServiceDescriptionDone && { backgroundColor: colors.white }]} ></View>
                <RenderStep isDone={isScheduleAppointmentDone} isInProgress={isScheduleAppointmentInProgress} />
                <View style={[styles.progressIconSeprator, isScheduleAppointmentDone && { backgroundColor: colors.white }]} ></View>
                <RenderStep isDone={isPaymentDone} isInProgress={isPaymentInProgress} />
            </View>
            <View style={{ flex: 1 }} >
                {
                    currentPage == SCREEN_SERVICE_BOOKING_DESCRIPTION &&
                    <ServiceDescription
                        description={description}
                        setDescription={setDescription}
                        descriptionError={descriptionError}
                        voiceNote={voiceNote}
                        setVoiceNote={setVoiceNote}
                        selectedImage={selectedImage}
                        setSelectedImage={setSelectedImage}
                    />
                }
                {
                    currentPage == SCREEN_SERVICE_BOOKING_APPOINTMENT &&
                    <ServiceApppointment
                        selectedDate={selectedDate}
                        selectedTimeType={selectedTimeType}
                        selectedTime={selectedTime}
                        location={location}
                        name={name}
                        setSelectedDate={setSelectedDate}
                        setSelectedTimeType={setSelectedTimeType}
                        setSelectedTime={setSelectedTime}
                        setLocation={setLocation}
                        setName={setName}
                        nameError={nameError}
                        locationError={locationError}
                        dateError={dateError}
                        sessionError={sessionError}
                        slotError={slotError}
                    />
                }
                {
                    currentPage == SCREEN_SERVICE_BOOKING_PAYMENT_SUMMARY &&
                    <ServicePaymentSummary serviceBookingRequestRes={serviceBookingRequestRes} />
                }
                {
                    currentPage == SCREEN_SERVICE_BOOKING_CONFIRMATION && serviceBookingRequestRes &&
                    <ServiceConfirmation
                        isPaymentDone={isPaymentDone}
                        setIsPaymentDone={setIsPaymentDone}
                        serviceBookingRequestRes={serviceBookingRequestRes}
                        onPaymentFailed={onPaymentFailed}
                    />
                }
            </View>
            {currentPage !== SCREEN_SERVICE_BOOKING_CONFIRMATION &&
                <CartSummaryRow onPressContinue={onPressContinue} currentPage={currentPage} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    progressIndicatorContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: spacing.MARGIN_12,
        backgroundColor: colors.theme,
        paddingVertical: spacing.PADDING_16
    },
    progressIconContainer: {
        width: spacing.WIDTH_24,
        height: spacing.WIDTH_24,
        borderRadius: spacing.RADIUS_50,
        backgroundColor: colors.lightTheme,
        justifyContent: "center",
        alignItems: "center",
    },
    progressIconSeprator: {
        flex: 1,
        height: spacing.WIDTH_2,
        borderRadius: spacing.RADIUS_20,
        backgroundColor: colors.grey300,
        marginHorizontal: spacing.MARGIN_6,
        backgroundColor: colors.lightTheme,
    },
})

export default ServiceBooking; 