import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { spacing } from "../../../styles/spacing";
import { fontNames } from "../../../styles/typography";
import Strings from "../../../translation/language";
import colors from "../../../utility/colors";
import { navigate } from "../../../utility/commonFunctions";
import { SCREEN_HOME } from "../../../utility/constants";
import { Images } from "../../../utility/imagePaths";
import RegularText from "../RegularText";
import CommonImage from "../views/CommonImage";

const CommonEmptyList = ({ msg }) => {

    return (
        <View style={styles.mainContainer} >
            <RegularText style={styles.msgText} >{msg}</RegularText>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        marginVertical: spacing.MARGIN_40,
        alignItems: "center"
    },
    msgText: {
        color: colors.grey500,
        textAlign: "center",
    },
})

export default CommonEmptyList;