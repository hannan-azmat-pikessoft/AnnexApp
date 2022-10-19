import React from 'react';
import { Modal, StyleSheet, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { textScale } from '../../styles/responsiveStyles';
import { spacing } from '../../styles/spacing';
import { fontNames } from '../../styles/typography';
import Strings from '../../translation/language';
import colors from '../../utility/colors';
import { navigate } from '../../utility/commonFunctions';
import { SCREEN_SELECT_LOCATION_ON_MAP } from '../../utility/constants';
import { Images } from '../../utility/imagePaths';
import CommonHeader from '../common/headers/CommonHeader';
import CommonTextInput from '../common/inputBoxes/CommonTextInput';
import RegularText from '../common/RegularText';
import CommonImage from '../common/views/CommonImage';
import AddressListComponent from '../modules/AddressListComponent';
import AddressSearchListComponent from '../modules/AddressSearchListComponent';
// import CommonImage from '../common/CommonImage';

const SelectYourLocationModal = ({
    visible,
    onClose,
    from,
    onSelectAddress
}) => {

    function onPressCurrentLocation() {
        onClose()
        navigate(SCREEN_SELECT_LOCATION_ON_MAP, { from: from, onSelectAddress: onSelectAddress })
    }

    return (
        <Modal
            animationType='slide'
            visible={visible}
            onRequestClose={() => onClose()}
        // transparent={true}
        >
            <SafeAreaView />
            <View style={{ flex: 1, backgroundColor: colors.white }} key="selectYourLocationModel" >
                <CommonHeader title={Strings.select_your_location} backgroundColor={colors.white} customTextColor={colors.black} onBack={() => onClose()} />
                <View style={styles.mainContainer}>
                    <CommonTextInput
                        placeHolder={Strings.enter_your_delivery_address}
                        value={""}
                        leftComponent={<CommonImage source={Images.IMG_MAP_MARKER_FILLED} />}
                        inputContainerStyle={styles.textInputView}
                    />
                    <View style={[styles.seprator, { backgroundColor: colors.grey300, marginTop: -spacing.MARGIN_18 }]} />

                    <TouchableOpacity style={styles.currentLocationContainer} onPress={() => onPressCurrentLocation()} >
                        <CommonImage source={Images.IMG_SEND_FILLED} style={{ marginRight: spacing.MARGIN_12 }} />
                        <View>
                            <RegularText style={styles.title} >{Strings.deliver_to_my_current_location}</RegularText>
                            <RegularText style={styles.address}>{"1st Cross st, 301 building, Dubai, united"}</RegularText>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.seprator} />

                    <AddressListComponent from={from} onSelectAddress={(item) => onSelectAddress(item)} />

                </View>


            </View>
        </Modal >
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    textInputView: {
        paddingHorizontal: spacing.PADDING_18,
    },
    seprator: {
        backgroundColor: colors.grey100,
        height: spacing.HEIGHT_2
    },
    currentLocationContainer: {
        flexDirection: 'row',
        alignItems: "center",
        paddingHorizontal: spacing.PADDING_18,
        paddingVertical: spacing.PADDING_20,
    },
    title: {
        fontSize: textScale(12),
        fontFamily: fontNames.FONT_FAMILY_MEDIUM,
    },
    address: {
        fontSize: textScale(12),
        fontFamily: fontNames.FONT_FAMILY_LIGHT,
        color: colors.grey600
    },

})

export default SelectYourLocationModal;