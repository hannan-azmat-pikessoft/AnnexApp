import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import BookingListRow from '../rows/bookingListRow';


const RecentBookingsComponent = () => {

    function onPressCard() {

    }

    return (
        <View key={"RecentBookingsComponentFlatlist"} style={styles.mainContainer}>
            <FlatList
                data={[1, 1]}
                renderItem={({ item, index }) => {
                    return (
                        <BookingListRow
                            key={"RecentBookingsComponentRow" + index}
                            item={item}
                            index={index}
                            onPressCard={onPressCard}
                        />
                    )
                }}
                listKey="RecentBookingsComponent"
                // onEndReached={onEndReached}
                // contentContainerStyle={{ paddingBottom: spacing.MARGIN_90 }}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                scrollEnabled={true}
                keyExtractor={(item, index) => String(index)}
            // onEndReachedThreshold={0.4}
            // refreshing={mySellCarListLoading}
            // refreshControl={<RefreshControl refreshing={mySellCarListLoading} />}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {},

})

export default RecentBookingsComponent;