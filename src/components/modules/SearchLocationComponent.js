import React, { useRef, useState } from 'react';
import { FlatList, Keyboard, StyleSheet, TouchableOpacity, View } from 'react-native';
import { boxShadowLess } from '../../styles/Mixins';
import { moderateScaleVertical, textScale } from '../../styles/responsiveStyles';
import { spacing } from '../../styles/spacing';
import Strings from '../../translation/language';
import colors from '../../utility/Colors';
import { searchLocation } from '../../utility/commonFunctions';
import { KEYBOARD } from '../../utility/constants';
import CommonButton from '../common/buttons/CommonButton';
import CommonLabelTextInput from '../common/inputBoxes/CommonLabelTextInput';
import RegularText from '../common/RegularText';
import SelectLocationOnMapComponent from './SelectLocationOnMapComponent';

const deltaValues = {
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
}

const SearchLocationComponent = ({ onFinishSelectLocation }) => {
    const mapComponentRef = useRef()

    const [location, setLocation] = useState(undefined)
    const [searchText, setSearchText] = useState('')
    const [searhingLocation, setSearhingLocation] = useState(false)
    const [searchLocationRes, setSearchLocationRes] = useState(undefined)
    const [fullAddress, setFullAddress] = useState("")

    function onSelectLocation(coordinates) {
        setLocation(coordinates)
    }

    function onSearchLocation(query) {
        setSearchText(query)
        if (query == '') {
            setSearhingLocation(false)
            return
        }
        setSearhingLocation(true)
        searchLocation(query).then(res => { setSearchLocationRes(res); })
    }

    function onSelectSearchLocation(item) {
        let data = {
            latitude: item.geometry.location.lat,
            longitude: item.geometry.location.lng,
            latitudeDelta: deltaValues.latitudeDelta,
            longitudeDelta: deltaValues.longitudeDelta
        }
        onSelectLocation({ latitude: item.geometry.location.lat, longitude: item.geometry.location.lng })
        setSearhingLocation(false)
        setSearchText(item.formatted_address.substr(0, 100))
        setFullAddress(item.formatted_address)
        if (mapComponentRef.current) {
            mapComponentRef.current.animateToRegion(data, 2000)
        }
    }

    return (
        <View style={{ flex: 1, }} >
            <CommonLabelTextInput
                label={Strings.search_a_location}
                value={searchText}
                error={""}
                onChangeText={(text) => onSearchLocation(text)}
                keyboardType={KEYBOARD.DEFAULT}
                returnKeyType={'done'}
                secureTextEntry={false}
                onSubmitEditing={() => { Keyboard.dismiss() }}
                mainViewStyle={{ paddingHorizontal: spacing.PADDING_12 }}
            />
            {
                searhingLocation == true ?
                    <View style={styles.searchResView} >
                        {searchLocationRes &&
                            <FlatList
                                data={searchLocationRes.results}
                                keyExtractor={(item, index) => String(index)}
                                key={({ index }) => index.toString()}
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item, index }) => {
                                    return (
                                        <TouchableOpacity style={{ paddingVertical: spacing.PADDING_4, paddingHorizontal: spacing.PADDING_12 }} onPress={() => onSelectSearchLocation(item)} >
                                            <RegularText title={item.name + ', ' + item.formatted_address} textStyle={{ fontSize: textScale(10) }} />
                                            <View style={{ height: 1, backgroundColor: colors.grey300, marginTop: spacing.MARGIN_8 }} />
                                        </TouchableOpacity>
                                    )
                                }
                                }
                            />
                        }
                    </View>
                    : null
            }
            <SelectLocationOnMapComponent
                selectLocation={onSelectLocation}
                error={""}
                ref={mapComponentRef}
                onGetUserLocation={onSelectLocation}
                mapContainerStyle={{ height: '100%' }}
            />
            <CommonButton
                title={Strings.confirm_location}
                buttonStyle={{ height: spacing.HEIGHT_44, position: 'absolute', bottom: spacing.HEIGHT_40 }}
                textStyle={{ fontSize: textScale(14) }}
                onPressButton={() => onFinishSelectLocation(location, fullAddress)}
                backgroundColor={colors.secondaryColor}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    coverContainer: {
        backgroundColor: colors.grey300,
        marginTop: spacing.MARGIN_12,
        borderRadius: spacing.RADIUS_8,
    },
    cover: {
        height: moderateScaleVertical(189),
        width: '100%',
        borderRadius: spacing.RADIUS_8
    },
    addCoverIconContainer: {
        position: 'absolute',
        top: 0, bottom: 0, right: 0, left: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.transparentBlack
    },
    addCoverText: {
        color: colors.appBlack,
        fontSize: textScale(12),
        marginTop: spacing.MARGIN_8
    },
    searchResView: {
        backgroundColor: colors.grey100,
        alignSelf: 'center',
        width: spacing.FULL_WIDTH,
        marginTop: spacing.MARGIN_8,
        position: 'absolute',
        top: spacing.HEIGHT_64,
        zIndex: 1,
        maxHeight: spacing.FULL_HEIGHT / 2,
        flex: 1,
        borderBottomLeftRadius: spacing.RADIUS_8,
        borderBottomRightRadius: spacing.RADIUS_8,
        paddingHorizontal: spacing.PADDING_4,
        ...boxShadowLess()
    }
});

export default SearchLocationComponent;