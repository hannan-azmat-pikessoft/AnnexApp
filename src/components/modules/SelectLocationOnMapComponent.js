import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, SafeAreaView, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { moderateVerticalScale } from 'react-native-size-matters';
import { textScale } from '../../styles/responsiveStyles';
import { spacing } from '../../styles/spacing';
import Strings from '../../translation/language';
import colors from '../../utility/colors';
// import colors from '../../utility/Colors';
import { getGeoLocation, requestLocationPermission } from '../../utility/commonFunctions';
import { Images } from '../../utility/imagePaths';
import CommonButton from '../common/buttons/CommonButton';
import RegularText from '../common/RegularText';
import CommonImage from '../common/views/CommonImage';

const SelectLocationOnMapComponent = ({
    setUserLocation,
    onPressButton,
    initialLatitude,
    initialLongitude
}) => {
    const [isButtonDisable, setIsButtonDisable] = useState(false)
    const [location, setLocation] = useState({
        latitude: initialLatitude ? initialLatitude : 37.78825,
        longitude: initialLongitude ? initialLongitude : -122.4324,
    })

    useEffect(() => {
        reqLocationPermission()
    }, [])

    async function reqLocationPermission() {
        let granted = await requestLocationPermission()
        if (granted) {
            getUserLocation()
        }
        else {
            requestLocationPermission()
        }
    }

    async function getUserLocation() {
        if (!initialLatitude && !initialLongitude) {
            getGeoLocation(loc => setLocation(loc))
        }
    }
    function regionChange(loc) {
        setLocation({
            longitude: loc.longitude,
            latitude: loc.latitude
        })
    }

    function onPressSubmit(params) {
        onPressButton(location)
    }

    return (
        <View style={styles.mainView} >
            <View style={styles.container} >
                <MapView
                    style={styles.map}
                    region={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                    initialRegion={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                    showsMyLocationButton={true}
                    // zoomControlEnabled={true}
                    showsUserLocation={true}
                    onRegionChangeComplete={(loc) => regionChange(loc)}
                >
                </MapView>
                <View style={styles.mapMarkerView}>
                    <CommonImage style={styles.mapMarker} source={Images.IMG_SELECT_LOCATION_MARKER} />
                </View>
            </View>
            <View style={{ position: "absolute", bottom: 40, right: 0, left: 0 }}>
                <CommonButton
                    title={Strings.confirm_location}
                    onPressButton={() => onPressSubmit()}
                    buttonStyle={styles.buttonStyle} backgroundColor={isButtonDisable ? colors.grey500 : colors.theme}
                    disabled={isButtonDisable}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    errorStyle: {
        fontSize: textScale(10),
        color: colors.red500,
        marginTop: spacing.MARGIN_8,
    },
    buttonStyle: {
        width: '90%'
    },
    mapMarkerView: {
        position: 'absolute',
        bottom: "50%",
    },
    mapMarker: {
        width: spacing.HEIGHT_36,
        height: spacing.HEIGHT_36
    },
});

export default SelectLocationOnMapComponent;