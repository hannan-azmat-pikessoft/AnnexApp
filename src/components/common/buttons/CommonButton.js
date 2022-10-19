import React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import { textScale } from '../../../styles/responsiveStyles';
import { spacing } from '../../../styles/spacing';
import { fontNames } from '../../../styles/typography';
import colors from '../../../utility/colors';
import RegularText from '../RegularText';
import CommonImage from '../views/CommonImage';

const CommonButton = ({
    backgroundColor,
    title,
    textStyle,
    buttonStyle,
    onPressButton,
    disabled,
    fetching,
    rightImage,
    rightImageStyle,
    marginTop,
    leftImage,
    leftImageStyle
}) => {

    return (
        <TouchableOpacity
            disabled={disabled}
            style={[
                styles.buttonStyle,
                buttonStyle,
                { backgroundColor: backgroundColor != undefined ? backgroundColor : colors.theme, marginTop: marginTop }
            ]}
            onPress={() => {
                if (!fetching) {
                    onPressButton()
                }
            }}
        >
            {!fetching &&
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} >
                    {leftImage ?
                        <View style={{ alignItems: "flex-end" }}>
                            <CommonImage source={leftImage} style={leftImageStyle} />
                        </View>
                        : null
                    }
                    <View style={{}}>
                        <RegularText style={{ ...styles.textStyle, ...textStyle }}>
                            {title}
                        </RegularText>
                    </View>
                    {rightImage ?
                        <View style={{ flex: 1, alignItems: "flex-end" }} >
                            <CommonImage source={rightImage} style={rightImageStyle} />
                        </View>
                        : null
                    }
                </View>
            }
            {
                fetching == true &&
                <ActivityIndicator color={colors.white} size='small' />
            }
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    buttonStyle: {
        borderRadius: spacing.RADIUS_8,
        paddingHorizontal: spacing.PADDING_12,
        paddingVertical: spacing.PADDING_12,
        alignSelf: 'center',
        alignItems: "center",
        justifyContent: "center",
    },
    textStyle: {
        color: colors.white,
        fontSize: textScale(12),
        fontFamily: fontNames.FONT_FAMILY_REGULAR
    }
});

CommonButton.defaultProps = {
    onPressButton: () => { }
}

export default CommonButton;