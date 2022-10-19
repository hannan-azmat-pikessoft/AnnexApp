import React from 'react';
import { StyleSheet, View } from 'react-native';
import { textScale } from '../../../styles/responsiveStyles';
import { spacing } from '../../../styles/spacing';
import { fontNames } from '../../../styles/typography';
import colors from '../../../utility/colors';
import { getImage } from '../../../utility/commonFunctions';
import RegularText from '../RegularText';
import CommonImage from './CommonImage';

const CommonProfileImage = ({
    uri,
    style,
    name,
    viewStyle
}) => {

    let initials = name.split(/\s/).reduce((response, word) => response += word.slice(0, 1), '')

    return (
        <View style={viewStyle} >
            {
                uri ?
                    <CommonImage
                        source={getImage(uri)}
                        style={style}
                        resizeMode='cover'
                    />
                    :
                    <View style={[styles.initialsContainer, style]} >
                        <RegularText style={styles.initialsText} >
                            {initials.slice(0, 2)}
                        </RegularText>
                    </View>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    initialsContainer: {
        borderRadius: spacing.RADIUS_100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    initialsText: {
        color: colors.theme,
        fontSize: textScale(16),
        fontFamily: fontNames.FONT_FAMILY_BOLD,
        textTransform: 'uppercase',
        letterSpacing: spacing.WIDTH_2
    },
});


export default CommonProfileImage;