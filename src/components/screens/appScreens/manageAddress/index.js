import React from "react";
import { View } from "react-native";
import { spacing } from "../../../../styles/spacing";
import Strings from "../../../../translation/language";
import { navigate } from "../../../../utility/commonFunctions";
import { SCREEN_SELECT_LOCATION_ON_MAP } from "../../../../utility/constants";
import CommonButton from "../../../common/buttons/CommonButton";
import CommonHeader from "../../../common/headers/CommonHeader";
import AddressListComponent from "../../../modules/AddressListComponent";

const ManageAddress = () => {

    function onPressAddAddress() {
        navigate(SCREEN_SELECT_LOCATION_ON_MAP)
    }
    return (
        <View style={{ flex: 1 }}>
            <CommonHeader title={Strings.manage_address} mainContainerStyle={{ height: spacing.HEIGHT_128 }} />
            <AddressListComponent />
            <CommonButton
                onPressButton={() => onPressAddAddress()}
                title={Strings.add_address}
                buttonStyle={{ marginVertical: spacing.MARGIN_30, width: '90%' }} />
        </View>
    )
}

export default ManageAddress;