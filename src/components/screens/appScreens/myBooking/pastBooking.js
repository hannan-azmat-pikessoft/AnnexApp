import React from "react";
import { StyleSheet, View } from "react-native";
import { spacing } from "../../../../styles/spacing";
import colors from "../../../../utility/colors";
import PastBookingsComponent from "../../../modules/PastBookingsComponent";

const PastBooking = () => {
    return (
        <View style={styles.mainContainer}>
            <PastBookingsComponent />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingHorizontal: spacing.PADDING_18,
    },
})

export default PastBooking;