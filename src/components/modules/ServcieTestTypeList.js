import React, {useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useDispatch, useSelector} from 'react-redux';
import {
  addServiceIntoCartAction,
  minusServiceQuantityInCartAction,
  plusServiceQuantityInCartAction,
} from '../../redux/actions/bookServicesAction';
import {getServicesAction} from '../../redux/actions/servicesAction';
import {textScale} from '../../styles/responsiveStyles';
import {spacing} from '../../styles/spacing';
import {fontNames} from '../../styles/typography';
import Strings from '../../translation/language';
import colors from '../../utility/colors';
import {ANIMATION_TYPES, EASING_TYPE} from '../../utility/constants';
import RegularText from '../common/RegularText';
import ServiceTestTypeRow from '../rows/serviceTestTypeRow';

const ServcieTestTypeList = ({item}) => {
  const dispatch = useDispatch();

  const {servicesFetching, servicesRes, isServicesSuccess, isGuestUser} =
    useSelector(state => ({
      servicesFetching: state.serviceReducer.servicesFetching,
      servicesRes: state.serviceReducer.servicesRes,
      isServicesSuccess: state.serviceReducer.isServicesSuccess,
      isGuestUser: state.authReducer.isGuestUser,
    }));
  useEffect(() => {
    getServices();
  }, []);

  function getServices() {
    const data = {
      query: item.id + '/services/?start=0&limit=10',
    };
    dispatch(getServicesAction(data));
  }

  function onPressBookService(item) {
    let data = {service: item};
    dispatch(addServiceIntoCartAction(data));
  }

  function onPressPlus(item) {
    let data = {service: item};
    dispatch(plusServiceQuantityInCartAction(data));
  }

  function onPressMinus(item) {
    let data = {service: item};
    dispatch(minusServiceQuantityInCartAction(data));
  }

  return (
    <View key={'servcieTestTypeListFlatlist'} style={styles.mainContainer}>
      <FlatList
        data={isServicesSuccess ? servicesRes.results : []}
        renderItem={({item, index}) => {
          return (
            <Animatable.View
              animation={ANIMATION_TYPES.SLIDE_IN_RIGHT}
              duration={500}
              easing={EASING_TYPE.EASE_IN_OUT}>
              <ServiceTestTypeRow
                key={'serviceTestTypeRow' + index}
                item={item}
                index={index}
                onPressBookService={onPressBookService}
                onPressPlus={onPressPlus}
                onPressMinus={onPressMinus}
              />
            </Animatable.View>
          );
        }}
        listKey="servcieTestTypeList"
        keyExtractor={(item, index) => String(index)}
        // onEndReached={onEndReached}
        // onEndReachedThreshold={0.4}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={{alignItems: 'center'}}>
            <RegularText
              style={{fontSize: textScale(10), color: colors.grey600}}>
              {Strings.msg_service_tests_empty_list}
            </RegularText>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  title: {
    fontSize: textScale(16),
    fontFamily: fontNames.FONT_FAMILY_BOLD,
    paddingHorizontal: spacing.PADDING_24,
    // marginTop: spacing.MARGIN_30
  },
});

export default ServcieTestTypeList;
