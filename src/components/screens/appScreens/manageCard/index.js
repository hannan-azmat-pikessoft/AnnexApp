import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { spacing } from "../../../../styles/spacing";
import Strings from "../../../../translation/language";
import colors from "../../../../utility/colors";
import { changeStatusBarColor, navigate } from "../../../../utility/commonFunctions";
import { SCREEN_ADD_CARD, STATUS_BAR_CONSTANTS } from "../../../../utility/constants";
import CommonButton from "../../../common/buttons/CommonButton";
import CommonHeader from "../../../common/headers/CommonHeader";
import CardsListComponent from "../../../modules/CardsListComponent";

const ManageCards = () => {

    useFocusEffect(
        React.useCallback(() => {
            changeStatusBarColor(colors.theme, STATUS_BAR_CONSTANTS.LIGHT, colors.appBackgroundColor)
        }, [])
    );

    function onPressAddCard() {
        navigate(SCREEN_ADD_CARD)
    }
    return (
        <View style={{ flex: 1 }} >
            <CommonHeader title={Strings.manage_cards} mainContainerStyle={{ height: spacing.HEIGHT_128 }} />
            <CardsListComponent />
            <CommonButton
                onPressButton={onPressAddCard}
                title={Strings.add_card}
                buttonStyle={{ marginVertical: spacing.MARGIN_30, width: "90%" }} />

        </View>
    )
}

export default ManageCards