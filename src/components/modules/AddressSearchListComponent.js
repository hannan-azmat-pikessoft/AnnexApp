import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import AddressSearchListRow from '../rows/addressSearchListRow';


const AddressSearchListComponent = () => {

    function onPressCard() {

    }

    return (
        <View key={"AddressSearchListComponentFlatlist"} style={styles.mainContainer}>
            <FlatList
                data={[1, 1]}
                renderItem={({ item, index }) => {
                    return (
                        <AddressSearchListRow
                            key={"AddressSearchListComponentRow" + index}
                            item={item}
                            onPressCard={onPressCard}
                            index={index} />
                    )
                }}
                listKey="AddressSearchListComponent"
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

export default AddressSearchListComponent;