import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getMyUpcomingBookingAction } from '../../redux/actions/myBookingAction';
import { textScale } from '../../styles/responsiveStyles';
import { spacing } from '../../styles/spacing';
import { fontNames } from '../../styles/typography';
import { GET_LIST, GET_PAGINATION_LIST } from '../../utility/constants';
import MyBookingEmptyList from '../common/emptyList/MyBookingEmptyList';
import BookingListRow from '../rows/bookingListRow';

const UpcomingBookingsComponent = () => {

    const limit = 10
    const dispatch = useDispatch();
    const [start, setStart] = useState(0)

    const { myUpcomingBookingFetching, myUpcomingBookingRes, isMyUpcomingBookingSuccess } = useSelector(state => state.myBookingReducer)

    useEffect(() => {
        initialCall()
    }, [])

    function initialCall() {
        setStart(0)
        getUpcomingBooking(0, GET_LIST)
    }

    function getUpcomingBooking(start, reqType) {
        let data = {
            query: `?upcoming=True&start=${start}&limit=${limit}`,
            reqType: reqType
        }
        dispatch(getMyUpcomingBookingAction(data))
    }

    function onEndReached() {
        if (myUpcomingBookingRes.next != null) {
            let strt = start + limit
            setStart(strt)
            getUpcomingBooking(strt, GET_PAGINATION_LIST)
        }
    }

    function onPressCard() {

    }

    return (
        <View key={"UpcomingBookingsComponentFlatlist"} style={styles.mainContainer}>
            <FlatList
                data={!myUpcomingBookingFetching ? myUpcomingBookingRes.results : [1, 1, 1, 1]}
                renderItem={({ item, index }) => {
                    return (
                        <BookingListRow
                            key={"UpcomingBookingsComponentRow" + index}
                            item={item}
                            index={index}
                            onPressCard={onPressCard}
                            isLoading={myUpcomingBookingFetching}
                        />
                    )
                }}
                listKey="UpcomingBookingsComponent"
                onEndReached={onEndReached}
                onEndReachedThreshold={0.4}
                refreshing={myUpcomingBookingFetching}
                refreshControl={<RefreshControl refreshing={myUpcomingBookingFetching} onRefresh={initialCall} />}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => String(index)}
                scrollEnabled={true}
                ListEmptyComponent={<MyBookingEmptyList />}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: { flex: 1 },
    title: {
        fontSize: textScale(16),
        fontFamily: fontNames.FONT_FAMILY_BOLD,
        paddingHorizontal: spacing.PADDING_24,
    },
})

export default UpcomingBookingsComponent;