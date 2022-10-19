import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useDispatch, useSelector } from 'react-redux';
import { getServiceCategoryAction } from '../../redux/actions/servicesAction';
import { textScale } from '../../styles/responsiveStyles';
import { spacing } from '../../styles/spacing';
import { fontNames } from '../../styles/typography';
import { navigate } from '../../utility/commonFunctions';
import { ANIMATION_TYPES, EASING_TYPE, SCREEN_SELECT_SERVICE } from '../../utility/constants';
import ServiceListRow from '../rows/serviceListRow';



const OtherServiceList = () => {

    const dispatch = useDispatch();

    const { serviceCategoryFetching, serviceCategoryRes } = useSelector(state => state.serviceReducer)

    useEffect(() => {
        getServiceCategory()
    }, [])

    function getServiceCategory() {
        const data = {
            query: "?start=0&limit=10"
        }
        dispatch(getServiceCategoryAction(data))
    }

    function onPressCard(item) {
        navigate(SCREEN_SELECT_SERVICE, { item: item })
    }

    return (
        <View key={"otherServiceListFlatlist"} style={styles.mainContainer}>

            <FlatList
                data={!serviceCategoryFetching ? serviceCategoryRes.results : [1, 1, 1, 1, 1]}
                renderItem={({ item, index }) => {
                    return (
                        <ServiceListRow
                            key={"otherServiceListRow" + index}
                            item={item}
                            index={index}
                            dataLength={3}
                            onPressCard={onPressCard}
                            isFeatured={false}
                            isLoading={serviceCategoryFetching} />
                    )
                }}
                listKey="otherServiceList"
                horizontal
                // onEndReached={onEndReached}
                // contentContainerStyle={{ paddingBottom: spacing.MARGIN_90 }}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => String(index)}
                style={{ marginVertical: spacing.MARGIN_36 }}
            // onEndReachedThreshold={0.4}
            // refreshing={mySellCarListLoading}
            // refreshControl={<RefreshControl refreshing={mySellCarListLoading} />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: { flex: 1 },
    title: {
        fontSize: textScale(16),
        fontFamily: fontNames.FONT_FAMILY_BOLD,
        paddingHorizontal: spacing.PADDING_24,
        // marginTop: spacing.MARGIN_30
    },
})

export default OtherServiceList;