import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { textScale } from '../../../styles/responsiveStyles';
import { spacing } from '../../../styles/spacing';
import colors from '../../../utility/colors';
import { Images } from '../../../utility/imageRes';
import CommonImage from '../views/CommonImage';

const CommonFabButton = ({ backgroundColor, buttonStyle, onPressButton, disabled, icon }) => {
    return (
        <TouchableOpacity
            disabled={disabled}
            style={[
                styles.buttonStyle,
                buttonStyle,
                { backgroundColor: backgroundColor != undefined ? backgroundColor : colors.theme, }
            ]}
            onPress={() => { onPressButton() }}
        >
            <CommonImage
                source={icon ? icon : Images.IMG_PLUS_BUTTON}
                style={{
                    height: spacing.HEIGHT_20,
                    width: spacing.HEIGHT_20,
                    tintColor: colors.white
                }}
            />
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    buttonStyle: {
        height: spacing.HEIGHT_56,
        width: spacing.HEIGHT_56,
        borderRadius: spacing.RADIUS_90,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: spacing.HEIGHT_20,
        right: spacing.HEIGHT_20
    },
    textStyle: {
        color: colors.white,
        fontSize: textScale(16)
    }
});

CommonFabButton.defaultProps = {
    onPressButton: () => { }
}

export default CommonFabButton;