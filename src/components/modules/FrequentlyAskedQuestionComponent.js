import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getFAQSAction } from '../../redux/actions/helpAction';
import { getServiceBookingPromocodeAction } from '../../redux/actions/promocodeAction';
import { textScale } from '../../styles/responsiveStyles';
import { spacing } from '../../styles/spacing';
import { fontNames } from '../../styles/typography';
import Strings from '../../translation/language';
import colors from '../../utility/colors';
import { GET_LIST, GET_PAGINATION_LIST } from '../../utility/constants';
import RegularText from '../common/RegularText';
import FrequentlyAskedQuestionRow from '../rows/frequentlyAskedQuestionRow';


const FrequentlyAskedQuestionComponent = ({ from, onSelectAddress, onPressPromocode }) => {

    const limit = 10;

    const [start, setStart] = useState(0)

    const dispatch = useDispatch();

    const {
        getFAQSFetching,
        isGetFAQSSuccess,
        getFAQSRes,
    } = useSelector(state => ({
        isGetFAQSSuccess: state.helpReducer.isGetFAQSSuccess,
        getFAQSFetching: state.helpReducer.getFAQSFetching,
        getFAQSRes: state.helpReducer.getFAQSRes,
    }), shallowEqual)

    useEffect(() => {
        initialCall()
    }, [])

    function initialCall() {
        setStart(0)
        getFAQS(0, GET_LIST)
    }

    function getFAQS(start, reqType) {
        let data = {
            query: `?start=${start}&limit=${limit}`,
            reqType: reqType
        }
        dispatch(getFAQSAction(data))
    }

    function onEndReached() {
        if (getFAQSRes.next != null) {
            let strt = start + limit
            setStart(strt)
            getFAQS(strt, GET_PAGINATION_LIST)
        }
    }

    return (
        <View key={"FrequentlyAskedQuestionComponentFlatlist"} style={styles.mainContainer} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} >
            <RegularText style={styles.title} >{Strings.Frequently_asked_question}</RegularText>
            <FlatList
                data={!getFAQSFetching ? getFAQSRes.results : [1, 1, 1, 1]}
                renderItem={({ item, index }) => {
                    return (
                        <FrequentlyAskedQuestionRow
                            key={"FrequentlyAskedQuestionComponentRow" + index}
                            item={item}
                            index={index}
                            onPressPromocode={onPressPromocode}
                            isLoading={getFAQSFetching}
                        />
                    )
                }}
                listKey="FrequentlyAskedQuestionComponent"
                onEndReached={onEndReached}
                onEndReachedThreshold={0.4}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                scrollEnabled={true}
                keyExtractor={(item, index) => String(index)}
                refreshing={getFAQSFetching}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: { marginVertical: spacing.MARGIN_8, flex: 1 },
    title: {
        fontSize: textScale(9),
        fontFamily: fontNames.FONT_FAMILY_MEDIUM,
        color: colors.grey500,
        letterSpacing: spacing.WIDTH_2,
    },
})

export default FrequentlyAskedQuestionComponent;