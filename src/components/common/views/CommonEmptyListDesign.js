import React from 'react';
import { StyleSheet, View } from 'react-native';
import { textScale } from '../../../styles/responsiveStyles';
import { spacing } from '../../../styles/spacing';
import { fontNames } from '../../../styles/typography';
import Strings from '../../../translation/language';
import { clearStack, exploreTheApp } from '../../../utility/commonFunctions';
import { KEY_APP_NAVIGATOR } from '../../../utility/constants';
import { Images } from '../../../utility/imageRes';
import CommonButton from './CommonButton';
import CommonImage from './CommonImage';
import RegularText from '../RegularText';

const CommonEmptyListDesign = ({ }) => {

    function onPressExplore() {
        // clearStack(KEY_APP_NAVIGATOR)
        exploreTheApp()
    }

    return (
        <View style={styles.mainContainer} >
            <RegularText title={Strings.msg_empty_list} fontFamily={fontNames.FONT_FAMILY_SEMI_BOLD} textStyle={styles.title} />
            <CommonImage source={Images.IMG_BNR_EMPTY} style={{ marginVertical: spacing.MARGIN_44, }} />
            <CommonButton title={Strings.explore} buttonStyle={{ height: spacing.HEIGHT_40 }} textStyle={{ fontSize: textScale(14) }} onPressButton={() => onPressExplore()} />
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginVertical: spacing.MARGIN_40
    },
    title: {
        fontSize: textScale(18)
    }
})

export default CommonEmptyListDesign;