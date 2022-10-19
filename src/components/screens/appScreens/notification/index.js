import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FlatList, RefreshControl, StatusBar, StyleSheet, View } from "react-native";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { getNotificationAction } from "../../../../redux/actions/notificationAction";
import { textScale } from "../../../../styles/responsiveStyles";
import { spacing } from "../../../../styles/spacing";
import { fontNames } from "../../../../styles/typography";
import Strings from "../../../../translation/language";
import colors from "../../../../utility/colors";
import { changeStatusBarColor, convertDateTime, getImage, timeSince } from "../../../../utility/commonFunctions";
import { GET_LIST, GET_PAGINATION_LIST, NOTI_TYPE, STATUS_BAR_CONSTANTS } from "../../../../utility/constants";
import { Images } from "../../../../utility/imagePaths";
import CommonHeader from "../../../common/headers/CommonHeader";
import RegularText from "../../../common/RegularText";
import CommonImage from "../../../common/views/CommonImage";
import VirtualizedView from "../../../common/views/VirtualizedView";
import { useFocusEffect } from "@react-navigation/native";
import CommonEmptyList from "../../../common/emptyList/CommonEmptyList";

const NotificationListRow = ({ item, index, isLoading }) => {

    function getNotificationImage(notification_type) {
        if (item.image) {
            return getImage(item.image)
        }
        else {
            switch (notification_type) {
                case NOTI_TYPE.SYSTEM:
                    return Images.IMG_APP_LOGO_WHITE
                    break;
                case NOTI_TYPE.SERVICES:
                    return Images.IMG_CALENDAR_WHITE
                    break;
                case NOTI_TYPE.PROMO:
                    return Images.IMG_TAG
                    break;
                case NOTI_TYPE.PROFILE:
                    return Images.IMG_APP_LOGO_WHITE
                    break;
                case NOTI_TYPE.BOOKING:
                    return Images.IMG_CALENDAR_WHITE
                    break;
                default:
                    return Images.IMG_APP_LOGO_WHITE
                    break;
            }
        }
    }

    return (
        <>
            {
                isLoading ?
                    <SkeletonPlaceholder
                        backgroundColor={colors.grey300}
                        highlightColor={colors.grey200}
                        key={index.toString()}
                    >
                        <View style={[styles.rowMainContainer, index == 0 && {
                            marginTop: spacing.MARGIN_8,
                        }]}>
                            <View style={styles.imageStyle} />
                            <View style={styles.notificationDetailContainer}>
                                <View style={{ width: spacing.FULL_WIDTH / 3, height: spacing.HEIGHT_12, borderRadius: spacing.RADIUS_50 }} />
                                <View style={{ width: spacing.FULL_WIDTH / 1.8, height: spacing.HEIGHT_10, borderRadius: spacing.RADIUS_50, marginTop: spacing.MARGIN_8 }} />
                            </View>
                        </View>
                    </SkeletonPlaceholder>
                    :
                    <View
                        style={[
                            styles.rowMainContainer, index == 0 && { marginTop: spacing.MARGIN_8, },
                            !item.is_seen && { backgroundColor: colors.lightTheme02 }
                        ]} >
                        <CommonImage
                            source={getNotificationImage(item.notification_type)}
                            viewStyle={styles.imageViewStyle}
                            style={item.image ? styles.imageStyle : styles.notiIconStyle} resizeMode={item.image ? 'cover' : 'contain'}
                        />
                        <View style={styles.notificationDetailContainer}  >
                            <View style={styles.titleContainer} >
                                <RegularText style={styles.notificationTitle} >{item.title}</RegularText>
                                <RegularText style={styles.notificationTime} >{timeSince(item.created)}</RegularText>
                            </View>
                            <View style={styles.subTitleContainer} >
                                <RegularText style={styles.subTitle}>{item.message}
                                    {/* <RegularText style={[styles.subTitle, { fontFamily: fontNames.FONT_FAMILY_BOLD, color: colors.theme }]} >{"#00011"}</RegularText> */}
                                    {/* {" is ready"} */}
                                </RegularText>
                                {
                                    !item.is_seen &&
                                    <View style={styles.unseenCircle} />
                                }
                            </View>
                        </View>
                    </View>
            }
        </>
    )
}

const NotificationTitle = ({ title }) => {
    return (
        <View style={{ marginHorizontal: spacing.MARGIN_18, flexDirection: "row", alignItems: "center" }} >
            <RegularText style={styles.notificationHeading} >{title}</RegularText>
            <View style={{
                width: spacing.WIDTH_30,
                height: spacing.WIDTH_30,
                borderRadius: spacing.RADIUS_50,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: colors.lightTheme02,
                marginHorizontal: spacing.MARGIN_12
            }} >
                <RegularText style={{ color: colors.theme, fontFamily: fontNames.FONT_FAMILY_BOLD, fontSize: textScale(12), }} >{"5"}</RegularText>
            </View>
        </View>
    )
}

const Notifications = () => {

    const limit = 10;

    const [start, setStart] = useState(0)

    const dispatch = useDispatch();

    const {
        getNotificationFetching,
        isGetNotificationSuccess,
        getNotificationRes,
    } = useSelector(state => ({
        isGetNotificationSuccess: state.notificationReducer.isGetNotificationSuccess,
        getNotificationFetching: state.notificationReducer.getNotificationFetching,
        getNotificationRes: state.notificationReducer.getNotificationRes,
    }), shallowEqual)

    useEffect(() => {
        initialCall()
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            changeStatusBarColor(colors.theme, STATUS_BAR_CONSTANTS.LIGHT, colors.appBackgroundColor)
        }, [])
    );

    function initialCall() {
        setStart(0)
        getNotifications(0, GET_LIST)
    }

    function getNotifications(start, reqType) {
        let data = {
            query: `?start=${start}&limit=${limit}`,
            reqType: reqType
        }
        dispatch(getNotificationAction(data))
    }

    function onEndReached() {
        if (getNotificationRes.next != null) {
            let strt = start + limit
            setStart(strt)
            getNotifications(strt, GET_PAGINATION_LIST)
        }
    }

    return (
        <View style={{ flex: 1 }} >
            <CommonHeader title={Strings.notifications} />
            <VirtualizedView style={styles.mainContainer} key={"notificationList"} onRefresh={initialCall} >
                <View style={styles.flatListContainer}>
                    {/* <NotificationTitle title={Strings.new} /> */}
                    <FlatList
                        data={!getNotificationFetching ? getNotificationRes.results : []}
                        listKey="notificationList_new"
                        onEndReached={onEndReached}
                        onEndReachedThreshold={0.4}
                        refreshing={getNotificationFetching}
                        refreshControl={<RefreshControl refreshing={getNotificationFetching} onRefresh={initialCall} />}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => String(index)}
                        scrollEnabled={true}
                        ListEmptyComponent={<CommonEmptyList msg={Strings.msg_notification_empty_list} />}
                        contentContainerStyle={{ flex: 1 }}
                        renderItem={({ item, index }) => {
                            return (
                                <NotificationListRow
                                    item={item}
                                    index={index}
                                    key={"notificationList_new" + index}
                                    isLoading={getNotificationFetching} />
                            )
                        }}
                    />
                </View>
                {/* <View style={styles.flatListContainer}>
                <NotificationTitle title={Strings.earlier} />
                <FlatList
                    data={[1,]}
                    listKey="notificationList_earlier"
                    // onEndReached={onEndReached}
                    onEndReachedThreshold={0.4}
                    // refreshing={myUpcomingBookingFetching}
                    // refreshControl={<RefreshControl refreshing={myUpcomingBookingFetching} onRefresh={initialCall} />}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => String(index)}
                    scrollEnabled={true}
                    // ListEmptyComponent={<MyBookingEmptyList />}
                    contentContainerStyle={{ flex: 1 }}
                    renderItem={({ item, index }) => {
                        return (
                            <NotificationListRow item={item} index={index} key={"notificationList_earlier" + index} />
                        )
                    }}
                />
            </View> */}
            </VirtualizedView>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: colors.appBackgroundColor
    },
    notificationHeading: {
        fontSize: textScale(14),
        fontFamily: fontNames.FONT_FAMILY_BOLD,
    },
    flatListContainer: {
        // marginTop: spacing.MARGIN_24,
        // paddingHorizontal: spacing.PADDING_18
    },
    rowMainContainer: {
        paddingVertical: spacing.PADDING_18,
        paddingHorizontal: spacing.PADDING_18,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: spacing.MARGIN_8
    },
    imageViewStyle: {
        width: spacing.WIDTH_40,
        height: spacing.WIDTH_40,
        borderRadius: spacing.RADIUS_50,
        backgroundColor: colors.theme,
        justifyContent: "center",
        alignItems: 'center',
    },
    notificationDetailContainer: {
        flex: 1,
        marginLeft: spacing.MARGIN_18
    },
    imageStyle: {
        width: spacing.WIDTH_40,
        height: spacing.WIDTH_40,
        borderRadius: spacing.RADIUS_50,
    },
    notiIconStyle: {
        width: spacing.HEIGHT_20,
        height: spacing.HEIGHT_20,
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "flex-start",

    },
    notificationTitle: {
        flex: 1,
        fontSize: textScale(12),
        fontFamily: fontNames.FONT_FAMILY_BOLD,
        marginBottom: spacing.MARGIN_4,
        marginRight: spacing.MARGIN_8
    },
    notificationTime: {
        color: colors.grey500,
        fontSize: textScale(10)
    },
    subTitleContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    subTitle: {
        color: colors.black,
        fontSize: textScale(10),
        flex: 1,
        marginRight: spacing.MARGIN_8
    },
    unseenCircle: {
        width: spacing.WIDTH_8,
        height: spacing.WIDTH_8,
        borderRadius: spacing.RADIUS_50,
        backgroundColor: colors.theme
    },
})

export default Notifications;