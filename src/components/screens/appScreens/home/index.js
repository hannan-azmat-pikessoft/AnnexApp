import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {navigate} from '../../../../NavigationService';
import {getHomeBannerAction} from '../../../../redux/actions/bannerAction';
import {getHomeSuggestionAction} from '../../../../redux/actions/suggestionAction';
import {textScale} from '../../../../styles/responsiveStyles';
import {spacing} from '../../../../styles/spacing';
import {fontNames} from '../../../../styles/typography';
import colors from '../../../../utility/colors';
import {
  changeStatusBarColor,
  getImage,
} from '../../../../utility/commonFunctions';
import {
  ANIMATION_TYPES,
  EASING_TYPE,
  SCREEN_NOTIFICATIONS,
  STATUS_BAR_CONSTANTS,
} from '../../../../utility/constants';
import {Images} from '../../../../utility/imagePaths';
import HomeHeader from '../../../common/headers/HomeHeader';
import RegularText from '../../../common/RegularText';
import CommonImage from '../../../common/views/CommonImage';
import VirtualizedView from '../../../common/views/VirtualizedView';
import CarousalComponent from '../../../modules/carousalComponent';
import FeaturedServiceList from '../../../modules/FeaturedServiceList';
import OtherServiceList from '../../../modules/OtherServiceList';

const RenderCarousalImage = ({item, index}) => {
  return (
    <View style={styles.carousalImageView}>
      <CommonImage
        source={getImage(item.image)}
        style={styles.carousalImage}
        resizeMode={'cover'}
      />
    </View>
  );
};

const HomeScreen = ({route}) => {
  const dispatch = useDispatch();

  const {
    homeBannerFetching,
    homeBannerRes,
    homeSuggestionRes,
    homeSuggestionFetching,
    isHomeSuggestionSuccess,
    isGuestUser,
    // featuredServiceCategoryRes
  } = useSelector(
    state => ({
      homeBannerFetching: state.bannerReducer.homeBannerFetching,
      homeBannerRes: state.bannerReducer.homeBannerRes,
      homeSuggestionFetching: state.suggestionReducer.homeSuggestionFetching,
      homeSuggestionRes: state.suggestionReducer.homeSuggestionRes,
      isHomeSuggestionSuccess: state.suggestionReducer.isHomeSuggestionSuccess,
      isGuestUser: state.authReducer.isUserLoggedIn,
      // featuredServiceCategoryRes : state.serviceReducer.featuredServiceCategoryRes,
    }),
    shallowEqual,
  );

  useEffect(async () => {
    getHomeBanner();
    getHomeSuggestion();
    // dispatch(clearServicesAction())
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      changeStatusBarColor(
        colors.white,
        STATUS_BAR_CONSTANTS.DARK,
        colors.white,
      );
    }, []),
  );

  function getHomeBanner() {
    const data = {
      query: '?start=0&limit=10',
    };
    dispatch(getHomeBannerAction(data));
  }
  function getHomeSuggestion() {
    dispatch(getHomeSuggestionAction());
  }
  function onPressNoti() {
    navigate(SCREEN_NOTIFICATIONS);
  }
  function onPressLocation() {}
  return (
    <View style={{flex: 1}}>
      <HomeHeader onPressNoti={onPressNoti} onPressLocation={onPressLocation} />
      <VirtualizedView
        style={{flex: 1, backgroundColor: colors.appBackgroundColor}}
        onRefresh={() => {}}
        refreshing={false}
        key={'homeScreen'}>
        {homeBannerFetching ? (
          <SkeletonPlaceholder
            backgroundColor={colors.grey300}
            highlightColor={colors.grey200}>
            <View style={styles.carousalImage} />
          </SkeletonPlaceholder>
        ) : (
          <CarousalComponent
            dataArray={homeBannerRes.results}
            rowComponent={(item, index) => (
              <RenderCarousalImage item={item} index={index} />
            )}
            dotStyle={{position: 'absolute', bottom: 14}}
          />
        )}
        <View></View>

        <View style={styles.secondaryMainContainer}>
          <FeaturedServiceList />
        </View>
        {isHomeSuggestionSuccess == true && homeSuggestionRes.length > 0 && (
          <Animatable.View
            animation={ANIMATION_TYPES.FADE_IN}
            duration={500}
            easing={EASING_TYPE.EASE_IN_OUT}>
            <View style={styles.doYouKnowContainer}>
              <CommonImage
                source={Images.IMG_HEART_ATTACK}
                style={styles.doYouKnowContainer_image}
              />
              <View style={styles.doYouKnowContainer_textContainer}>
                <RegularText
                  style={styles.doYouKnowContainer_textContainer_heading}>
                  {homeSuggestionRes[0].question}
                </RegularText>
                <RegularText
                  style={styles.doYouKnowContainer_textContainer_description}>
                  {homeSuggestionRes[0].tips}
                </RegularText>
              </View>
            </View>
          </Animatable.View>
        )}
        <View style={styles.otherServiceView}>
          <OtherServiceList />
        </View>
      </VirtualizedView>
    </View>
  );
};

const styles = StyleSheet.create({
  secondaryMainContainer: {
    flex: 1,
  },
  carousalImageView: {
    width: spacing.FULL_WIDTH,
    height: spacing.HEIGHT_226,
  },
  carousalImage: {
    width: spacing.FULL_WIDTH,
    height: spacing.HEIGHT_226,
    borderBottomLeftRadius: spacing.RADIUS_30,
    borderBottomRightRadius: spacing.RADIUS_30,
  },
  doYouKnowContainer: {
    backgroundColor: colors.lightTheme08,
    paddingVertical: spacing.PADDING_12,
    paddingHorizontal: spacing.PADDING_24,
    marginHorizontal: spacing.MARGIN_24,
    borderRadius: spacing.RADIUS_10,
    marginVertical: spacing.MARGIN_30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  doYouKnowContainer_textContainer: {
    flex: 1,
    marginLeft: spacing.MARGIN_14,
  },
  doYouKnowContainer_textContainer_heading: {
    color: colors.white,
    fontSize: textScale(12),
    fontFamily: fontNames.FONT_FAMILY_BOLD,
  },
  doYouKnowContainer_textContainer_description: {
    color: colors.white,
    fontSize: textScale(8),
    fontFamily: fontNames.FONT_FAMILY_MEDIUM,
    marginTop: spacing.MARGIN_4,
  },
  doYouKnowContainer_image: {
    height: spacing.HEIGHT_48,
    width: spacing.HEIGHT_48,
  },
  otherServiceView: {
    backgroundColor: colors.grey100,
    marginBottom: spacing.MARGIN_40,
    marginTop: spacing.MARGIN_20,
  },
});

export default HomeScreen;
