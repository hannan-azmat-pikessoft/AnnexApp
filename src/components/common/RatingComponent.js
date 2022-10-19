import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { textScale } from '../../styles/responsiveStyles';
import colors from '../../utility/colors';

const RatingComponent = ({ onRate }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
            <AirbnbRating
                count={5}
                defaultRating={3}
                showRating={false}
                size={textScale(28)}
                isDisabled={false}
                unSelectedColor={colors.grey400}
                selectedColor={colors.secondaryColor}
                starContainerStyle={{ margin: 0, padding: 0, }}
                ratingContainerStyle={{ margin: 0, padding: 0 }}
                style={{ margin: 0, padding: 0 }}
                onFinishRating={rate => onRate(rate)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    ratingStyle: {
        fontSize: textScale(10)
    },
});

export default RatingComponent;