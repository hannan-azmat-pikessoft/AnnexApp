import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import BookingListRow from '../rows/bookingListRow';


const CompletedBookingsComponent = () => {

    function onPressCard() {

    }

    return (
        <View key={"CompletedBookingsComponentFlatlist"} style={styles.mainContainer}>
            <FlatList
                data={[1, 1, 1, 1, 1]}
                renderItem={({ item, index }) => {
                    return (
                        <BookingListRow
                            key={"CompletedBookingsComponentRow" + index}
                            item={item}
                            onPressCard={onPressCard}
                            index={index} />
                    )
                }}
                listKey="CompletedBookingsComponent"
                // onEndReached={onEndReached}
                // contentContainerStyle={{ paddingBottom: spacing.MARGIN_90 }}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
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

export default CompletedBookingsComponent;