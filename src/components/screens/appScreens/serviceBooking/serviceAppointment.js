import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { clearServiceSession, clearServiceSessionSlots, getServiceSession, getServiceSessionDates, getServiceSessionSlots } from '../../../../redux/actions/serviceSessionAction';
import { getMyAddressAction } from '../../../../redux/actions/userActions';
import { textScale } from '../../../../styles/responsiveStyles';
import { spacing } from '../../../../styles/spacing';
import { fontNames } from '../../../../styles/typography';
import Strings from '../../../../translation/language';
import colors from '../../../../utility/colors';
import { convertDateTime } from '../../../../utility/commonFunctions';
import { GET_LIST, SCREEN_SERVICE_BOOKING_APPOINTMENT } from '../../../../utility/constants';
import { Images } from '../../../../utility/imagePaths';
import CommonLabelTextInput from '../../../common/inputBoxes/CommonLabelTextInput';
import RegularText from '../../../common/RegularText';
import CommonImage from '../../../common/views/CommonImage';
import VirtualizedView from '../../../common/views/VirtualizedView';
import SelectYourLocationModal from '../../../modals/selectYourLocationModal';

const RenderEmptyFlatListComponent = ({ text }) => {
    return (
        <View style={{ paddingHorizontal: spacing.PADDING_18, paddingVertical: spacing.PADDING_16, width: spacing.FULL_WIDTH }} >
            <RegularText style={{ color: colors.grey400, textAlign: "center" }} >{`${Strings.at_current_moment_there_is_no} ${text} ${Strings.available}`}</RegularText>
        </View>
    )
}

const RenderPickTime = ({ onPressTimeType, selectedTimeType, selectedTime, onPressTime, sessionError, slotError }) => {

    const {
        serviceSessionFetching,
        serviceSessionRes,
        isServiceSessionSuccess,
        serviceSessionSlotsFetching,
        serviceSessionSlotsRes,
        isServiceSessionSlotsSuccess,
    } = useSelector(state => ({

        serviceSessionFetching: state.serviceSessionReducer.serviceSessionFetching,
        serviceSessionRes: state.serviceSessionReducer.serviceSessionRes,
        isServiceSessionSuccess: state.serviceSessionReducer.isServiceSessionSuccess,

        serviceSessionSlotsFetching: state.serviceSessionReducer.serviceSessionSlotsFetching,
        serviceSessionSlotsRes: state.serviceSessionReducer.serviceSessionSlotsRes,
        isServiceSessionSlotsSuccess: state.serviceSessionReducer.isServiceSessionSlotsSuccess,

    }), shallowEqual)

    useEffect(() => {
        if (isServiceSessionSuccess && serviceSessionRes && serviceSessionRes.length >= 0) {
            for (let i = 0; i < serviceSessionRes.length; i++) {
                if (serviceSessionRes[i].is_active) {
                    onPressTimeType(serviceSessionRes[i])
                    break
                }
            }
        }

    }, [isServiceSessionSuccess, serviceSessionRes])

    useEffect(() => {
        if (isServiceSessionSlotsSuccess && serviceSessionSlotsRes && serviceSessionSlotsRes.available_slots > 0 && serviceSessionSlotsRes.slots.length >= 0) {
            for (let i = 0; i < serviceSessionSlotsRes.slots.length; i++) {
                if (serviceSessionSlotsRes.slots[i].is_active) {
                    onPressTime(serviceSessionSlotsRes.slots[i])
                    break
                }
            }
        }
    }, [isServiceSessionSlotsSuccess, serviceSessionSlotsRes])

    function RenderTimeTypeComponent({ item, index }) {
        return (
            <>
                {
                    serviceSessionFetching ?
                        <SkeletonPlaceholder>
                            <View style={[{ width: spacing.FULL_WIDTH / 3.6, height: spacing.HEIGHT_50, marginRight: spacing.MARGIN_16, borderRadius: spacing.RADIUS_4 },
                            index == 0 && { marginLeft: spacing.MARGIN_16 }]}
                            />
                        </SkeletonPlaceholder>
                        :
                        <TouchableOpacity
                            onPress={() => onPressTimeType(item)}
                            style={[styles.timeTypeContent,
                            { width: spacing.FULL_WIDTH / 3.6 },
                            index == 0 && { marginLeft: spacing.MARGIN_16 },
                            selectedTimeType.id == item.id && item.is_active && { backgroundColor: colors.lightTheme02, borderColor: colors.lightTheme04 },
                            selectedTimeType.id == item.id && item.is_active && { backgroundColor: colors.lightTheme02, borderColor: colors.lightTheme04 },
                            !item.is_active && { backgroundColor: colors.grey300, borderColor: colors.grey300 }
                            ]}
                        >
                            <CommonImage
                                source={item.session_slots == "morning" ? Images.IMG_SUNRISE : item.session_slots == "afternoon" ? Images.IMG_SUN : Images.IMG_NIGHT_MODE}
                                style={[styles.timeTypeContent_icon,
                                selectedTimeType.id == item.id && item.is_active && { tintColor: colors.theme },
                                !item.is_active && { tintColor: colors.grey400 }]} />
                            <RegularText
                                style={[styles.timeTypeContent_text,
                                selectedTimeType.id == item.id && item.is_active && item.is_active && { color: colors.theme },
                                !item.is_active && { color: colors.grey400 }
                                ]}
                            >{item.session_slots}</RegularText>
                        </TouchableOpacity>
                }
            </>
        )
    }

    function RenderSelectTime({ item, index }) {
        return (
            <>
                {
                    serviceSessionSlotsFetching ?
                        <SkeletonPlaceholder>
                            <View style={[
                                { width: spacing.FULL_WIDTH / 4, height: spacing.HEIGHT_30, marginRight: spacing.MARGIN_16, borderRadius: spacing.RADIUS_4 },
                                index == 0 && { marginLeft: spacing.MARGIN_16 }
                            ]}
                            />
                        </SkeletonPlaceholder>
                        :
                        <TouchableOpacity
                            onPress={() => onPressTime(item)}
                            style={[
                                styles.timeTypeContent,
                                index == 0 && { marginLeft: spacing.MARGIN_16 },
                                { marginRight: spacing.MARGIN_12, paddingVertical: spacing.PADDING_8 },
                                selectedTime.id == item.id && item.is_active && { backgroundColor: colors.lightTheme02, borderColor: colors.lightTheme04 },
                                !item.is_active && { backgroundColor: colors.grey300, borderColor: colors.grey300 }
                            ]} >
                            <RegularText
                                style={[
                                    styles.timeTypeContent_text,
                                    { fontSize: textScale(10) },
                                    selectedTime.id == item.id && item.is_active && { color: colors.theme },
                                    !item.is_active && { color: colors.grey400 }
                                ]}>
                                {item.start_time.substring(0, item.start_time.length - 3) + "-" + item.end_time.substring(0, item.end_time.length - 3)}
                            </RegularText>
                        </TouchableOpacity>
                }
            </>
        )
    }
    return (
        <View>
            <View style={[styles.timeTypeContainer, {}]} >
                {/* <View style={{ flexDirection: "row", marginVertical: spacing.MARGIN_24, paddingLeft: spacing.PADDING_48, alignItems: "center" }} >
                    <RegularText style={{ fontSize: textScale(11), fontFamily: fontNames.FONT_FAMILY_BOLD }} >{Strings.pick_time}</RegularText>
                    {
                        serviceSessionSlotsRes && serviceSessionSlotsRes.available_slots &&
                        <RegularText style={{ color: colors.grey600, fontSize: textScale(9) }} >{` ( ${serviceSessionSlotsRes.available_slots} ${Strings.slot} )`}</RegularText>
                    }
                </View> */}
                {/* {
                    !serviceSessionSlotsFetching ? */}
                <View style={{ flexDirection: "row", marginVertical: spacing.MARGIN_24, paddingLeft: spacing.PADDING_48, alignItems: "center" }} >
                    <RegularText style={{ fontSize: textScale(11), fontFamily: fontNames.FONT_FAMILY_BOLD }} >{Strings.pick_time}</RegularText>
                    {
                        serviceSessionSlotsRes ?
                            <RegularText style={{ color: colors.grey600, fontSize: textScale(9) }} >{` (${serviceSessionSlotsRes?.available_slots || 0} ${Strings.slot})`}</RegularText>
                            : null
                    }
                </View>
                {/* : null
                } */}
                <FlatList
                    data={!serviceSessionFetching ? serviceSessionRes : [1, 1, 1]}
                    renderItem={({ item, index }) => <RenderTimeTypeComponent item={item} index={index} />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ListEmptyComponent={!serviceSessionFetching && <RenderEmptyFlatListComponent text={Strings.session} />}
                />
                {sessionError != '' && (
                    <RegularText style={[styles.errorStyle, { marginLeft: spacing.MARGIN_24 }]} >
                        {sessionError}
                    </RegularText>
                )}
            </View>
            {
                <View style={[styles.timeTypeContainer, { marginTop: spacing.MARGIN_18 }]}>
                    <FlatList
                        data={!serviceSessionSlotsFetching ? serviceSessionSlotsRes?.slots : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
                        renderItem={({ item, index }) => <RenderSelectTime item={item} index={index} />}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        ListEmptyComponent={!serviceSessionSlotsFetching && <RenderEmptyFlatListComponent text={Strings.slot} />}
                    />
                    {
                        slotError != '' && (
                            <RegularText style={[styles.errorStyle, { marginLeft: spacing.MARGIN_24 }]} >
                                {slotError}
                            </RegularText>
                        )
                    }
                </View>
            }
        </View>
    )
}

const RenderDateComponent = ({ selectedDate, onPressDate, error, isDateSelected }) => {

    const { serviceSessionDatesFetching,
        serviceSessionDatesRes,
        isServiceSessionDatesSuccess,
    } = useSelector(state => ({
        serviceSessionDatesRes: state.serviceSessionReducer.serviceSessionDatesRes,
        serviceSessionDatesFetching: state.serviceSessionReducer.serviceSessionDatesFetching,
        isServiceSessionDatesSuccess: state.serviceSessionReducer.isServiceSessionDatesSuccess,
    }), shallowEqual)

    useEffect(() => {
        if (isServiceSessionDatesSuccess && serviceSessionDatesRes && serviceSessionDatesRes.dates.length >= 0) {
            onPressDate(serviceSessionDatesRes.dates[0])
        }
    }, [isServiceSessionDatesSuccess && serviceSessionDatesRes])


    const DateCompoenntRow = ({ item, index }) => {

        return (
            <>
                {
                    serviceSessionDatesFetching ?
                        <SkeletonPlaceholder
                            backgroundColor={colors.grey200}
                            highlightColor={colors.grey100}
                            key={index.toString()}>
                            <View style={[{ width: spacing.WIDTH_48, height: spacing.HEIGHT_56, marginRight: spacing.MARGIN_12, borderRadius: spacing.RADIUS_4 }, index == 0 && { marginLeft: spacing.MARGIN_18 }]} />
                        </SkeletonPlaceholder>
                        :
                        <TouchableOpacity onPress={() => onPressDate(item)}
                            style={[
                                styles.dateComponentRow,
                                index == 0 && { marginLeft: spacing.MARGIN_18 },
                                selectedDate == item.date && { backgroundColor: colors.lightTheme02, borderColor: colors.lightTheme04 },
                            ]} >
                            <RegularText style={[styles.dateComponentRow_month, selectedDate == item.date && { color: colors.theme },]} >{convertDateTime(new Date(item.date), 'MMM')}</RegularText>
                            <RegularText style={[styles.dateComponentRow_date, selectedDate == item.date && { color: colors.theme },]} >{convertDateTime(new Date(item.date), 'DD')}</RegularText>
                            <RegularText style={[styles.dateComponentRow_day, selectedDate == item.date && { color: colors.theme }]} >{item.day}</RegularText>
                        </TouchableOpacity>
                }
            </>
        )
    }
    return (

        <View style={{ flex: 1, marginTop: spacing.MARGIN_22 }} >
            <FlatList
                data={!serviceSessionDatesFetching ? isServiceSessionDatesSuccess && serviceSessionDatesRes.dates : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
                listKey={"RenderDateComponent"}
                renderItem={({ item, index }) => {
                    return (
                        <DateCompoenntRow key={"RenderDateComponent_row" + index} item={item} index={index} />
                    )
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
                ListEmptyComponent={!serviceSessionDatesFetching && <RenderEmptyFlatListComponent text={Strings.session_date} />}
            />
            {error != '' && (
                <RegularText style={[styles.errorStyle, { marginLeft: spacing.MARGIN_24 }]} >
                    {error}
                </RegularText>
            )}
        </View>
    )
}

const RenderTitle = ({ icon, heading }) => {
    return (
        <View style={styles.headingContainer} >
            <CommonImage source={icon} style={styles.headingContainer_icon} />
            <RegularText style={styles.headingContainer_title}>{heading}</RegularText>
        </View>
    )
}

const ServiceApppointment = ({
    selectedDate,
    selectedTimeType,
    selectedTime,
    location,
    name,
    setSelectedDate,
    setSelectedTimeType,
    setSelectedTime,
    setLocation,
    setName,
    nameError,
    locationError,
    dateError,
    sessionError,
    slotError,
}) => {

    // const [address, setAddress] = useState("")
    let address = location && location.address_line ? JSON.parse(location.address_line) : "";
    const [showSelectLocationModal, setShowSelectLocationModal] = useState(false)
    const [isDateSelected, setIsDateSelected] = useState(false)

    const dispatch = useDispatch();

    const { serviceSessionDatesFetching,
        serviceSessionDatesRes,
        isServiceSessionDatesSuccess,
        serviceSessionFetching,
        serviceSessionRes,
        isServiceSessionSuccess,
        serviceSessionSlotsFetching,
        serviceSessionSlotsRes,
        isServiceSessionSlotsSuccess,
        serviceInCart,
        myAddressListRes,
        myAddressListFetching,
        isMyAddressListSuccess } = useSelector(state => ({

            serviceSessionDatesRes: state.serviceSessionReducer.serviceSessionDatesRes,
            serviceSessionDatesFetching: state.serviceSessionReducer.serviceSessionDatesFetching,
            isServiceSessionDatesSuccess: state.serviceSessionReducer.isServiceSessionDatesSuccess,

            serviceSessionFetching: state.serviceSessionReducer.serviceSessionFetching,
            serviceSessionRes: state.serviceSessionReducer.serviceSessionRes,
            isServiceSessionSuccess: state.serviceSessionReducer.isServiceSessionSuccess,

            serviceSessionSlotsFetching: state.serviceSessionReducer.serviceSessionSlotsFetching,
            serviceSessionSlotsRes: state.serviceSessionReducer.serviceSessionSlotsRes,
            isServiceSessionSlotsSuccess: state.serviceSessionReducer.isServiceSessionSlotsSuccess,

            myAddressListRes: state.userReducer.myAddressListRes,
            myAddressListFetching: state.userReducer.myAddressListFetching,
            isMyAddressListSuccess: state.userReducer.isMyAddressListSuccess,

            serviceInCart: state.bookServiceReducer.serviceInCart
        }), shallowEqual)

    useEffect(() => {
        getMyAddress()
        getServiceSessionDate()
    }, [])

    useEffect(() => {
        if (myAddressListRes.count && location == "") {
            setAddressInUi()
        }
    }, [myAddressListRes])
    function getMyAddress() {
        const data = {
            query: `?start=0&limit=100`,
            reqType: GET_LIST
        }
        dispatch(getMyAddressAction(data))
        setAddressInUi()
    }

    function getServiceSessionDate() {
        dispatch(clearServiceSession())
        dispatch(clearServiceSessionSlots())
        dispatch(getServiceSessionDates())
    }
    function getServiceSessions(date) {
        dispatch(clearServiceSessionSlots())
        const data = {
            id: serviceInCart.service.id,
            date: date,
        }
        dispatch(getServiceSession(data))
    }
    function getServiceSessionSlot(id) {
        const data = {
            id: id,
        }
        dispatch(getServiceSessionSlots(data))
    }

    function onPressEditLocation() {
        setShowSelectLocationModal(true)
    }

    function onCloseEditLocation() {
        setShowSelectLocationModal(false)
    }

    function onPressDate(item) {
        if (item.is_available && !item.is_available) return
        setIsDateSelected(true)
        setSelectedDate(item.date)
        getServiceSessions(item.date)
    }
    function onPressTimeType(item) {
        if (item.is_active) {
            setSelectedTimeType(item)
            getServiceSessionSlot(item.id)
        }
    }
    function onPressTime(item) {
        if (item.is_active) {
            setSelectedTime(item)
        }
    }
    function onSelectAddress(item) {
        setLocation('')
        setShowSelectLocationModal(false)
        setLocation(item)
    }
    function setAddressInUi() {
        for (let i = 0; i < myAddressListRes.results.length; i++) {
            if (myAddressListRes.results[i].is_default) {
                setLocation(myAddressListRes.results[i])
                break;
            }
            else {
                setLocation(myAddressListRes.results[0])
            }
        }
    }
    return (
        <View style={{ flex: 1, }} >
            <VirtualizedView style={styles.mainContainer} key={"serviceAppointment"} >
                <RenderTitle icon={Images.IMG_CALENDER_BIG} heading={Strings.what_date_would_you_like_your_service} />
                <RenderDateComponent
                    data={serviceSessionDatesRes}
                    getServiceSessions={getServiceSessions}
                    selectedDate={selectedDate}
                    onPressDate={onPressDate}
                    error={dateError}
                    isDateSelected={isDateSelected}
                />

                <RenderTitle icon={Images.IMG_CLOCK} heading={Strings.what_time_would_you_like_your_service} />
                <View style={styles.textContainer} >
                    <RegularText style={{
                        fontSize: textScale(10),
                        fontFamily: fontNames.FONT_FAMILY_LIGHT,
                        color: colors.grey600,
                        marginTop: spacing.MARGIN_4,
                        // marginBottom: spacing.MARGIN_12
                    }} >{Strings.get_tested_for_covid_19}</RegularText>
                </View>
                <RenderPickTime
                    onPressTimeType={onPressTimeType}
                    selectedTimeType={selectedTimeType}
                    selectedTime={selectedTime}
                    onPressTime={onPressTime}
                    sessionError={sessionError}
                    slotError={slotError}
                />

                <RenderTitle icon={Images.IMG_MAP_MARKER} heading={Strings.what_is_your_location} />
                <TouchableOpacity style={[styles.textInputView, styles.locationContainer]} onPress={() => onPressEditLocation()}>
                    {
                        location == "" ?
                            <>
                                <CommonImage source={Images.IMG_ADD} style={{ tintColor: colors.theme }} />
                                <RegularText style={{ color: colors.theme, marginLeft: spacing.MARGIN_6, fontSize: textScale(12), fontFamily: fontNames.FONT_FAMILY_MEDIUM }} >{Strings.add_location}</RegularText>
                            </>
                            :
                            <>
                                <RegularText style={styles.locationText} >
                                    {location == "" ?
                                        Strings.add_location :
                                        location.address_line ? `${address.villa} , ${address.street} ${address.address}` : ""
                                    }</RegularText>
                                <CommonImage source={Images.IMG_PEN} style={{ marginRight: spacing.MARGIN_12 }} />
                            </>
                    }
                </TouchableOpacity>
                {
                    locationError != '' &&
                    <RegularText style={[styles.errorStyle, { marginLeft: spacing.MARGIN_16 }]} >{locationError}</RegularText>
                }

                <RenderTitle icon={Images.IMG_USER} heading={Strings.peronal_information} />
                <View style={styles.firstNameContainer} >
                    <RegularText style={styles.firstNameContainer_text}>{Strings.first_name}</RegularText>
                    <CommonLabelTextInput
                        placeHolder={Strings.enter_first_name}
                        onChangeText={(text) => setName(text)}
                        onSubmitEditing={() => { }}
                        value={name}
                        error={nameError}
                    />
                </View>

            </VirtualizedView>
            <SelectYourLocationModal
                visible={showSelectLocationModal}
                onClose={onCloseEditLocation}
                from={SCREEN_SERVICE_BOOKING_APPOINTMENT}
                onSelectAddress={onSelectAddress}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.grey100
    },
    headingContainer: {
        flexDirection: "row",
        paddingHorizontal: spacing.PADDING_16,
        alignItems: "center",
        marginTop: spacing.MARGIN_40,
    },
    headingContainer_icon: {
        marginRight: spacing.MARGIN_10
    },
    headingContainer_title: {
        fontFamily: fontNames.FONT_FAMILY_MEDIUM,
        fontSize: textScale(12)
    },
    dateComponentRow: {
        backgroundColor: colors.white,
        paddingHorizontal: spacing.PADDING_12,
        paddingVertical: spacing.PADDING_12,
        marginRight: spacing.MARGIN_12,
        alignItems: "center",
        borderRadius: spacing.RADIUS_4,
        borderWidth: 2,
        borderColor: colors.white,
        width: spacing.FULL_WIDTH / 5,
    },
    dateComponentRow_date: {
        fontSize: textScale(12),
        fontFamily: fontNames.FONT_FAMILY_BOLD
    },
    dateComponentRow_month: {
        fontSize: textScale(9),
        // fontFamily: fontNames.FONT_FAMILY_BOLD,
        color: colors.grey600,
        marginBottom: spacing.MARGIN_2
    },
    dateComponentRow_day: {
        fontSize: textScale(10),
    },
    textContainer: {
        paddingHorizontal: spacing.PADDING_48,
        fontFamily: fontNames.FONT_FAMILY_MEDIUM
    },
    timeTypeContainer: {
        flex: 1,
    },
    timeTypeContent: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: colors.white,
        paddingHorizontal: spacing.PADDING_12,
        paddingVertical: spacing.PADDING_16,
        borderRadius: spacing.RADIUS_4,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: spacing.WIDTH_2,
        borderColor: colors.white,
        marginRight: spacing.MARGIN_16
    },
    timeTypeContent_icon: {
        marginRight: spacing.MARGIN_10,
        tintColor: colors.black
    },
    timeTypeContent_text: {
        fontSize: textScale(10),
        textTransform: 'capitalize',
        fontFamily: fontNames.FONT_FAMILY_BOLD
    },
    textInputView: {
        paddingHorizontal: spacing.PADDING_16,
        marginTop: spacing.MARGIN_12,
        marginBottom: -spacing.MARGIN_16
    },
    locationContainer: {
        backgroundColor: colors.white,
        marginHorizontal: spacing.MARGIN_16,
        paddingVertical: spacing.PADDING_12,
        borderRadius: spacing.RADIUS_8,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 0
    },
    locationText: {
        flex: 1,
        marginRight: spacing.MARGIN_12
    },
    firstNameContainer: {
        backgroundColor: colors.white,
        paddingHorizontal: spacing.PADDING_16,
        paddingVertical: spacing.PADDING_16,
        marginTop: spacing.MARGIN_20,
        marginBottom: spacing.MARGIN_84
    },
    firstNameContainer_text: {
        fontSize: textScale(12),
        fontFamily: fontNames.FONT_FAMILY_MEDIUM,
        // marginLeft: spacing.MARGIN_12
    },
    errorStyle: {
        fontSize: textScale(10),
        color: colors.red500,
        marginTop: spacing.MARGIN_4,
        marginLeft: spacing.MARGIN_12,
    },
})

export default ServiceApppointment;  