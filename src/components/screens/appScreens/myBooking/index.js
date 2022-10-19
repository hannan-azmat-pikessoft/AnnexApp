import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { shallowEqual, useSelector } from 'react-redux';
import Strings from "../../../../translation/language";
import colors from "../../../../utility/colors";
import { changeStatusBarColor } from "../../../../utility/commonFunctions";
import { SCREEN_PAST_BOOKING, SCREEN_UPCOMING_BOOKING, STATUS_BAR_CONSTANTS } from "../../../../utility/constants";
import CommonTopTabs from "../../../common/CommonTopTabs";
import CommonHeader from "../../../common/headers/CommonHeader";
import LoginModule from "../../../modules/AuthModule";
import PastBooking from "./pastBooking";
import UpcommingBooking from "./upcomingBooking";

const MyBooking = () => {

    const tabsData = [
        {
            tabName: SCREEN_UPCOMING_BOOKING,
            label: Strings.upcoming,
            component: UpcommingBooking
        },
        {
            tabName: SCREEN_PAST_BOOKING,
            label: Strings.past,
            component: PastBooking
        },
    ]

    useFocusEffect(
        React.useCallback(() => {
            changeStatusBarColor(colors.theme, STATUS_BAR_CONSTANTS.LIGHT, colors.white)
        }, [])
    );

    const { isGuestUser } = useSelector(state => ({ isGuestUser: state.authReducer.isGuestUser }), shallowEqual);

    return (
        <>
            {
                isGuestUser ?
                    null
                    :
                    <View style={{ flex: 1, backgroundColor: colors.appBackgroundColor }}>
                        <CommonHeader title={Strings.my_booking} hideBack={true} />
                        <CommonTopTabs
                            tabsData={tabsData}
                            tabsColor={colors.white}
                        />
                    </View>
            }
        </>
    )
}

const styles = StyleSheet.create({
    topTabView: {},
    topTabView_content: {},
})

export default MyBooking;