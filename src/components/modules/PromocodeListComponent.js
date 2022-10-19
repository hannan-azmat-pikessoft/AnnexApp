import React, { useEffect } from 'react';
import { FlatList, ScrollView, StyleSheet } from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getServiceBookingPromocodeAction } from '../../redux/actions/promocodeAction';
import { spacing } from '../../styles/spacing';
import PromocodeListRow from '../rows/promocodeListRow';


const PromocodeListComponent = ({ from, onSelectAddress, onPressPromocode }) => {

    const dispatch = useDispatch();

    const {
        getServiceBookingPromocodeListFetching,
        isGetServiceBookingPromocodeListSuccess,
        getServiceBookingPromocodeListRes,
    } = useSelector(state => ({
        isGetServiceBookingPromocodeListSuccess: state.promocodeReducer.isGetServiceBookingPromocodeListSuccess,
        getServiceBookingPromocodeListFetching: state.promocodeReducer.getServiceBookingPromocodeListFetching,
        getServiceBookingPromocodeListRes: state.promocodeReducer.getServiceBookingPromocodeListRes,
    }), shallowEqual)

    useEffect(() => {
        getServiceBookingPromocode()
    }, [])

    function getServiceBookingPromocode() {
        dispatch(getServiceBookingPromocodeAction())
    }

    return (
        <ScrollView key={"PromocodeListComponentFlatlist"} style={styles.mainContainer} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} >
            <FlatList
                data={getServiceBookingPromocodeListRes}
                renderItem={({ item, index }) => {
                    return (
                        <PromocodeListRow
                            key={"PromocodeListComponentRow" + index}
                            item={item}
                            index={index}
                            onPressPromocode={onPressPromocode}
                        />
                    )
                }}
                listKey="PromocodeListComponent"
                // onEndReached={onEndReached}
                // onEndReachedThreshold={0.4}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                scrollEnabled={true}
            // keyExtractor={(item, index) => String(index)}
            // refreshing={myAddressListFetching}
            />

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    mainContainer: { marginVertical: spacing.MARGIN_8 },
})

export default PromocodeListComponent;