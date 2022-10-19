import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getMyAddressAction } from '../../redux/actions/userActions';
import apiCall from '../../redux/services/apiCall';
import { API_ADDRESS } from '../../redux/services/apiTypes';
import { textScale } from '../../styles/responsiveStyles';
import { spacing } from '../../styles/spacing';
import { fontNames } from '../../styles/typography';
import Strings from '../../translation/language';
import colors from '../../utility/colors';
import { getErrorMessage, navigate } from '../../utility/commonFunctions';
import { GET_LIST, GET_PAGINATION_LIST, SCREEN_SELECT_LOCATION_ON_MAP, SCREEN_SERVICE_BOOKING_APPOINTMENT } from '../../utility/constants';
import { Images } from '../../utility/imagePaths';
import RegularText from '../common/RegularText';
import CommonImage from '../common/views/CommonImage';
import AddressMenuOptionsModel from '../modals/addressMenuOptionsModel';
import AddressSearchListRow from '../rows/addressSearchListRow';

const RenderOnEmptyList = ({ onPressAddAddress }) => {
    return (
        <>
            <TouchableOpacity onPress={() => onPressAddAddress()} style={styles.emptyListMainContainer} >
                <CommonImage source={Images.IMG_ADD} style={{ tintColor: colors.theme }} />
                <RegularText style={styles.emptyListTextStyle} >{Strings.add_a_new_address}</RegularText>
            </TouchableOpacity>
            <View style={styles.emptyListSeprator} />
        </>
    )
}


const AddressListComponent = ({ from, onSelectAddress }) => {

    const limit = 10;
    const dispatch = useDispatch();
    const [showAddressMenuOptions, setShowAddressMenuOptions] = useState(false)
    const [dataForEdit, setDataForEdit] = useState()

    const [start, setStart] = useState(0)

    const {
        myAddressListFetching,
        myAddressListRes,
        isMyAddressListSuccess,
    } = useSelector(state => ({
        myAddressListRes: state.userReducer.myAddressListRes,
        myAddressListFetching: state.userReducer.myAddressListFetching,
        isMyAddressListSuccess: state.userReducer.isMyAddressListSuccess,
    }), shallowEqual)

    useEffect(() => {
        initialCall()
    }, [])

    function initialCall() {
        setStart(0)
        getMyAddress(0, GET_LIST)
    }

    function getMyAddress(start, reqType) {
        let data = {
            query: `?start=${start}&limit=${limit}`,
            reqType: reqType
        }
        dispatch(getMyAddressAction(data))
    }

    function onEndReached() {
        if (myAddressListRes.next != null) {
            let strt = start + limit
            setStart(strt)
            getMyAddress(strt, GET_PAGINATION_LIST)
        }
    }

    function onPressAddressCard(item, address) {
        if (from == SCREEN_SERVICE_BOOKING_APPOINTMENT) {
            onSelectAddress(item)
        } else {
            setShowAddressMenuOptions(true)
            setDataForEdit(item)
        }
    }

    function onCloseModel() {
        setShowAddressMenuOptions(false)
    }

    function onPressEdit() {
        setShowAddressMenuOptions(false)
        navigate(SCREEN_SELECT_LOCATION_ON_MAP, { item: dataForEdit })
    }

    function onPressAddAddress() {
        navigate(SCREEN_SELECT_LOCATION_ON_MAP, { from: from, onSelectAddress: onSelectAddress })
    }

    function onPressSetDefault() {
        setShowAddressMenuOptions(false)

        const payload = {
            is_default: !dataForEdit.is_default
        }

        const apiData = {
            type: API_ADDRESS + dataForEdit.id + "/",
            apiType: "PATCH",
            payload: payload,
        }

        apiCall(apiData)
            .then((res) => {
                initialCall()
            })
            .catch((err) => {
                getErrorMessage(err)
            })
    }

    return (
        <View key={"AddressListComponentFlatlist"} style={styles.mainContainer}>
            <FlatList
                data={!myAddressListFetching ? myAddressListRes.results : [1, 1, 1, 1, 1, 1, 1, 1]}
                renderItem={({ item, index }) => {
                    return (
                        <AddressSearchListRow
                            key={"AddressListComponentRow" + index}
                            item={item}
                            onPressAddressCard={onPressAddressCard}
                            index={index}
                            isDefault={item.is_default}
                            from={from}
                            isLoading={myAddressListFetching} />
                    )
                }}
                listKey="AddressListComponent"
                onEndReached={onEndReached}
                onEndReachedThreshold={0.4}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                keyExtractor={(item, index) => String(index)}
                refreshing={myAddressListFetching}
                ListEmptyComponent={<RenderOnEmptyList onPressAddAddress={onPressAddAddress} />}
            />
            <AddressMenuOptionsModel
                visible={showAddressMenuOptions}
                onClose={onCloseModel}
                onPressEdit={onPressEdit}
                onPressSetDefault={onPressSetDefault}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: { flex: 1, },
    emptyListMainContainer: {
        flexDirection: "row",
        paddingHorizontal: spacing.PADDING_18,
        paddingVertical: spacing.PADDING_24,
        alignItems: "center",
    },
    emptyListTextStyle: {
        fontSize: textScale(12),
        fontFamily: fontNames.FONT_FAMILY_MEDIUM,
        color: colors.theme,
        marginLeft: spacing.MARGIN_6,
    },
    emptyListSeprator: {
        height: spacing.HEIGHT_1,
        backgroundColor: colors.grey300,
        marginHorizontal: spacing.MARGIN_18
    },
})

export default AddressListComponent;