import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, RefreshControl } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useDispatch, useSelector } from 'react-redux';
import { getMyPastBookingAction } from '../../redux/actions/myBookingAction';
import { ANIMATION_TYPES, EASING_TYPE, GET_LIST, GET_PAGINATION_LIST } from '../../utility/constants';
import MyBookingEmptyList from '../common/emptyList/MyBookingEmptyList';
import BookingListRow from '../rows/bookingListRow';

const PastBookingsComponent = () => {

    const limit = 1;
    const dispatch = useDispatch();

    const [start, setStart] = useState(0)

    const { myPastBookingFetching, myPastBookingRes, isMyPastBookingSuccess } = useSelector(state => state.myBookingReducer)

    useEffect(() => {
        initialCall()
    }, [])

    function initialCall() {
        setStart(0)
        getMyPastBookings(0, GET_LIST)
    }

    function getMyPastBookings(start, reqType) {
        let data = {
            query: `?past=True&start=${start}&limit=${limit}`,
            reqType: reqType
        }
        dispatch(getMyPastBookingAction(data))
    }

    function onEndReached() {
        if (myPastBookingRes.next != null) {
            let strt = start + limit
            setStart(strt)
            getMyPastBookings(strt, GET_PAGINATION_LIST)
        }
    }

    function onPressCard() {

    }

    return (
        <View key={"PastBookingsComponentFlatlist"} style={styles.mainContainer}>
            <FlatList
                data={!myPastBookingFetching ? myPastBookingRes.results : [1, 1, 1, 1]}
                renderItem={({ item, index }) => {
                    return (
                        <BookingListRow
                            key={"PastBookingsComponentRow" + index}
                            onPressCard={onPressCard}
                            item={item}
                            index={index}
                            isLoading={myPastBookingFetching} />
                    )
                }}
                listKey="PastBookingsComponent"
                onEndReached={onEndReached}
                onEndReachedThreshold={0.4}
                refreshing={myPastBookingFetching}
                refreshControl={<RefreshControl refreshing={myPastBookingFetching} onRefresh={() => initialCall()} />}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                // scrollEnabled={false}
                keyExtractor={(item, index) => String(index)}
                ListEmptyComponent={MyBookingEmptyList}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: { flex: 1 },
})

export default PastBookingsComponent;