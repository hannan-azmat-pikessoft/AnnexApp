import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {removeServiceFromCartAction} from '../../../../redux/actions/bookServicesAction';
import {clearServicesAction} from '../../../../redux/actions/servicesAction';
import {boxShadow} from '../../../../styles/Mixins';
import {textScale} from '../../../../styles/responsiveStyles';
import {spacing} from '../../../../styles/spacing';
import {fontNames} from '../../../../styles/typography';
import colors from '../../../../utility/colors';
import {
  changeStatusBarColor,
  getImage,
  navigate,
} from '../../../../utility/commonFunctions';
import {
  SCREEN_SERVICE_BOOKING,
  STATUS_BAR_CONSTANTS,
} from '../../../../utility/constants';
import BackButton from '../../../common/buttons/BackButton';
import RegularText from '../../../common/RegularText';
import CommonImage from '../../../common/views/CommonImage';
import VirtualizedView from '../../../common/views/VirtualizedView';
import ServcieTestTypeList from '../../../modules/ServcieTestTypeList';
import CartSummaryRow from '../../../rows/cartSummaryRow';

const image =
  'https://media.istockphoto.com/photos/young-woman-getting-tested-for-coronaviruscovid19-at-medical-clinic-picture-id1310644715?b=1&k=20&m=1310644715&s=170667a&w=0&h=QYy9ZSIJkOOxRoVZb4suPVnGLbaMOOzL5n6SaJFiTBA=';

const SelectService = ({route}) => {
  const dispatch = useDispatch();
  const {params} = route;
  const {item} = params;

  const {serviceInCart, totalServicePriceWithVAT, isGuestUser} = useSelector(
    state => ({
      serviceInCart: state.bookServiceReducer.serviceInCart,
      totalServicePriceWithVAT:
        state.bookServiceReducer.totalServicePriceWithVAT,
      isGuestUser: state.authReducer.isGuestUser,
    }),
    shallowEqual,
  );

  function onPressContinue() {
    navigate(SCREEN_SERVICE_BOOKING, {data: item});
  }

  useEffect(() => {
    return () => {
      dispatch(removeServiceFromCartAction());
      dispatch(clearServicesAction());
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      changeStatusBarColor(
        colors.appBackgroundColor,
        STATUS_BAR_CONSTANTS.DARK,
        serviceInCart.quantity != 0 ? colors.white : colors.appBackgroundColor,
      );
    }, [serviceInCart.quantity]),
  );

  return (
    <View style={{flex: 1}}>
      <VirtualizedView
        style={styles.mainContainer}
        onRefresh={() => {}}
        refreshing={false}
        key={'selectService'}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: spacing.PADDING_16,
            marginTop: spacing.MARGIN_12,
          }}>
          <View>
            <CommonImage
              source={getImage(item.cover)}
              style={styles.imageStyle}
              viewStyle={styles.imageView}
              resizeMode={'cover'}
            />
            <BackButton
              style={{
                position: 'absolute',
                top: spacing.HEIGHT_10,
                left: spacing.HEIGHT_10,
                ...boxShadow(),
              }}
            />
          </View>
          <RegularText style={styles.heading}>{item.name}</RegularText>
          <RegularText style={styles.description}>
            {item.description}
          </RegularText>
          <ServcieTestTypeList item={item} />
        </View>
      </VirtualizedView>
      {serviceInCart.quantity != 0 && !isGuestUser && (
        <CartSummaryRow onPressContinue={onPressContinue} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.appBackgroundColor,
  },
  imageStyle: {
    width: spacing.FULL_SCREEN_WIDTH,
    height: spacing.HEIGHT_216,
    borderRadius: spacing.RADIUS_8,
  },
  heading: {
    fontFamily: fontNames.FONT_FAMILY_BOLD,
    fontSize: textScale(12),
    marginTop: spacing.MARGIN_20,
    marginBottom: spacing.MARGIN_4,
  },
  description: {
    fontFamily: fontNames.FONT_FAMILY_LIGHT,
    fontSize: textScale(10),
    marginBottom: spacing.MARGIN_24,
  },
});

export default SelectService;
