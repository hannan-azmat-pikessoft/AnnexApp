import React from 'react';
import { StatusBar, View } from 'react-native';
import { textScale } from '../../../styles/responsiveStyles';
import { spacing } from '../../../styles/spacing';
import { fontNames } from '../../../styles/typography';
import colors from '../../../utility/colors';
import BackButton from '../buttons/BackButton';
import RegularText from '../RegularText';
import { goBack } from './../../../utility/commonFunctions';

const headerColor = colors.theme
const textColor = colors.white

function CommonHeader({ title, onBack, backgroundColor, customTextColor, mainContainerStyle, hideBack }) {

    function onPressBack() {
        if (onBack) {
            onBack()
        } else {
            goBack()
        }
    }

    return (
        <View style={[{
            flexDirection: 'row',
            height: spacing.HEIGHT_68,
            alignItems: 'center',
            backgroundColor: backgroundColor ? backgroundColor : headerColor,
            justifyContent: 'space-between',
            paddingHorizontal: spacing.PADDING_12,
        }, mainContainerStyle]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                {!hideBack && <BackButton onPressButton={() => onPressBack()} />}
            </View>
            <View style={{ flex: 3, alignItems: 'center', }} >
                <RegularText
                    style={{
                        color: customTextColor ? customTextColor : textColor,
                        fontSize: textScale(12),
                        marginHorizontal: spacing.MARGIN_4,
                        textAlign: 'center',
                        fontFamily: fontNames.FONT_FAMILY_BOLD,
                    }}
                >
                    {title}
                </RegularText>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>

            </View>
        </View>
    );
}


export default CommonHeader;