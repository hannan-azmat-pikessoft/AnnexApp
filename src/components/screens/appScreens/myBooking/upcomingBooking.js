import React from "react";
import { StyleSheet, View } from "react-native";
import { spacing } from "../../../../styles/spacing";
import colors from "../../../../utility/colors";
import UpcomingBookingsComponent from "../../../modules/UpcomingBookingsComponent";

const UpcommingBooking = () => {
    return (
        <View style={styles.mainContainer}>
            <UpcomingBookingsComponent />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingHorizontal: spacing.PADDING_18,
    },
})

export default UpcommingBooking;