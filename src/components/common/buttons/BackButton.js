import React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { boxShadow } from "../../../styles/Mixins";
import { spacing } from "../../../styles/spacing";
import colors from "../../../utility/colors";
import { goBack } from "../../../utility/commonFunctions";
import { Images } from "../../../utility/imagePaths";
import CommonImage from "../views/CommonImage";

const BackButton = ({ style, onPressButton }) => {

    function onPressBack() {
        if (onPressButton) {
            onPressButton()
        } else {
            goBack()
        }
    }

    return (
        <Pressable style={[styles.mainContainer, style]} onPress={() => onPressBack()} >
            <CommonImage source={Images.IMG_ARROW_LEFT} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        width: spacing.HEIGHT_38,
        height: spacing.HEIGHT_38,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.white,
        borderRadius: spacing.RADIUS_50,
    }
})

export default BackButton;