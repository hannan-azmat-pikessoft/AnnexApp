import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { getFeaturedServiceCategoryAction } from '../../redux/actions/servicesAction';
import { textScale } from '../../styles/responsiveStyles';
import { spacing } from '../../styles/spacing';
import { fontNames } from '../../styles/typography';
import Strings from '../../translation/language';
import { navigate } from '../../utility/commonFunctions';
import { ANIMATION_TYPES, EASING_TYPE, SCREEN_SELECT_SERVICE } from '../../utility/constants';
import RegularText from '../common/RegularText';
import ServiceListRow from '../rows/serviceListRow';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import colors from '../../utility/colors';

const RenderFeaturedServiceListSkeleton = ({ item, index }) => {
    return (
        <Animatable.View
            animation={ANIMATION_TYPES.SLIDE_IN_RIGHT}
            duration={500}
            easing={EASING_TYPE.EASE_IN_OUT}>
            <SkeletonPlaceholder  >
                <SkeletonPlaceholder.Item
                    width={spacing.FULL_WIDTH / 1.6}
                    borderRadius={20}
                    // borderRadius={spacing.RADIUS_8}
                    marginRight={spacing.MARGIN_14}
                    marginLeft={index == 0 ? spacing.MARGIN_24 : null}
                    backgroundColor={colors.black}
                >
                    <SkeletonPlaceholder.Item width={spacing.FULL_WIDTH / 1.6} height={spacing.HEIGHT_180} />

                    <SkeletonPlaceholder.Item paddingHorizontal={spacing.PADDING_12} paddingVertical={spacing.PADDING_12} >

                    </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
        </Animatable.View>
    )
}


const FeaturedServiceList = () => {

    const dispatch = useDispatch();

    const { featuredServiceCategoryFetching, featuredServiceCategoryRes, isFeaturedServiceCategorySuccess } = useSelector(state => state.serviceReducer)

    useEffect(() => {
        getFeaturedServices()
    }, [])

    function onPressCard(item) {
        navigate(SCREEN_SELECT_SERVICE, { item: item })
    }

    function getFeaturedServices() {
        const data = {
            query: "?is_featured=true&start=0&limit=10"
        }
        dispatch(getFeaturedServiceCategoryAction(data))
    }

    return (
        <View
            key={"featuredServiceListComponent"}
            style={styles.mainContainer}>
            {
                featuredServiceCategoryRes.results.length > 0 &&
                <RegularText style={styles.title} >{Strings.featured_services} </RegularText>
            }
            <FlatList
                data={!featuredServiceCategoryFetching ? featuredServiceCategoryRes.results : [1, 1, 1, 1]}
                renderItem={({ item, index }) => {
                    return (
                        <ServiceListRow
                            key={"FeaturedServiceListRow" + index}
                            item={item}
                            index={index}
                            dataLength={3}
                            onPressCard={onPressCard}
                            isFeatured={true}
                            isLoading={featuredServiceCategoryFetching}
                        />
                    )
                }}
                listKey="FeaturedServiceList"
                horizontal
                // onEndReached={onEndReached}
                // contentContainerStyle={{ paddingBottom: spacing.MARGIN_90 }}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => String(index)}
                style={{ marginTop: spacing.MARGIN_16 }}
            // onEndReachedThreshold={0.4}
            // refreshing={mySellCarListLoading}
            // refreshControl={<RefreshControl refreshing={mySellCarListLoading} />}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: { flex: 1, paddingBottom: spacing.PADDING_16 },
    title: {
        fontSize: textScale(14),
        fontFamily: fontNames.FONT_FAMILY_BOLD,
        paddingHorizontal: spacing.PADDING_24,
        marginTop: spacing.MARGIN_20,
        alignSelf: "flex-start"
    },
})

export default FeaturedServiceList;