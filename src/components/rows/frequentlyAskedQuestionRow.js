import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { textScale } from '../../styles/responsiveStyles';
import { spacing } from '../../styles/spacing';
import { fontNames } from '../../styles/typography';
import colors from '../../utility/colors';
import { Images } from '../../utility/imagePaths';
import RegularText from '../common/RegularText';
import CommonImage from '../common/views/CommonImage';

const FrequentlyAskedQuestionRow = ({ item, index, isLoading }) => {

    const [showAnswer, setShowAnswer] = useState(false)

    function onPressCard() {
        setShowAnswer(!showAnswer)
    }

    return (
        <>
            {
                isLoading ?
                    <SkeletonPlaceholder
                        backgroundColor={colors.grey300}
                        highlightColor={colors.grey200}
                        key={index.toString()}
                    >
                        <View style={[styles.cardView, { marginVertical: spacing.MARGIN_8, justifyContent: "space-between", height: spacing.HEIGHT_34 }]} >
                            <View style={{ flex: 1, width: spacing.FULL_WIDTH / 1.3, borderRadius: spacing.RADIUS_4, height: spacing.HEIGHT_34 }} />
                            <View style={{ width: spacing.HEIGHT_34, height: spacing.HEIGHT_34, marginLeft: spacing.MARGIN_12, borderRadius: spacing.RADIUS_4, }} />
                        </View >
                    </SkeletonPlaceholder>
                    :
                    < View style={styles.mainView} >
                        <TouchableOpacity style={styles.cardView} onPress={() => onPressCard()} >
                            <RegularText style={styles.cardText} >{item.question}</RegularText>
                            <CommonImage source={Images.IMG_DOWN_ARROW} style={!showAnswer && { transform: [{ rotate: '270deg' }], }} />
                        </TouchableOpacity>
                        {
                            showAnswer &&
                            <View style={styles.answerView}>
                                <RegularText style={styles.answer} >{item.answer}</RegularText>
                            </View>
                        }
                    </View>
            }
        </>
    )
}

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: colors.grey200,
        paddingHorizontal: spacing.PADDING_18,
        paddingVertical: spacing.PADDING_12,
        marginVertical: spacing.MARGIN_8,
        borderRadius: spacing.RADIUS_8
    },
    cardView: {
        flexDirection: "row",
        alignItems: "center",
    },
    cardText: {
        flex: 1,
        fontSize: textScale(12),
        fontFamily: fontNames.FONT_FAMILY_MEDIUM
    },
    rightArrowImage: {
        transform: [{ rotate: '270deg' }],
    },
    answerView: {
        marginTop: spacing.MARGIN_4,
        // borderWidth: 2
    },
    answer: {
        color: colors.grey600,
        marginRight: spacing.MARGIN_16,
    }
});

export default FrequentlyAskedQuestionRow;