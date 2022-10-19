import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { textScale } from '../../../styles/responsiveStyles';
import { spacing } from '../../../styles/spacing';
import colors from '../../../utility/colors';
import { LANGUAGE, LANGUAGES } from '../../../utility/constants';
import { retrieveItem } from '../../../utility/customAsyncStorage';
import { Images } from '../../../utility/imagePaths';
import RegularText from '../RegularText';
import CommonImage from '../views/CommonImage';

const headerColor = colors.white
const textColor = colors.black

function HomeHeader({ backgroundColor, customTextColor, onPressLocation, onPressNoti }) {

    const [currentLang, setCurrentLang] = useState(LANGUAGES.english)

    useEffect(() => {
        getCurrentLang()
    }, [])

    async function getCurrentLang() {
        retrieveItem(LANGUAGE)
            .then(lang => {
                if (lang) {
                    setCurrentLang(lang)
                }

            })
    }

    return (
        <View style={[styles.mainContainer, { backgroundColor: backgroundColor ? backgroundColor : headerColor, }]}>
            {/* <TouchableOpacity style={styles.leftContainer} onPress={() => onPressLocation()}>
                <CommonImage source={Images.IMG_MAP_MARKER_FILLED} style={styles.iconStyle} />
            </TouchableOpacity> */}
            <View style={styles.rightContainer} >
                <RegularText
                    style={{
                        color: customTextColor ? customTextColor : textColor,
                        fontSize: textScale(12),
                        marginRight: spacing.MARGIN_10
                    }} >
                    {currentLang.toUpperCase()}
                </RegularText>
                <TouchableOpacity onPress={() => onPressNoti()} >
                    <CommonImage source={Images.IMG_BELL} style={styles.iconStyle} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        height: spacing.HEIGHT_44,
        alignItems: 'center',
        paddingHorizontal: spacing.PADDING_24,
        justifyContent: "flex-end"
    },
    leftContainer: {
        flex: 1
    },
    rightContainer: {
        flexDirection: "row",
        alignItems: 'center',
    },
    iconStyle: {

    }
})

export default HomeHeader;