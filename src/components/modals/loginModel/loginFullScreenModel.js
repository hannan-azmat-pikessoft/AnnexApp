import React from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {spacing} from '../../../styles/spacing';
import colors from '../../../utility/colors';
import {Images} from '../../../utility/imagePaths';
import CommonImage from '../../common/views/CommonImage';
import LoginModule from '../../modules/AuthModule';

const GuestUserFullScreenLoginModel = ({
  visible,
  onClose,
  onLoginSignupSuccess,
}) => {
  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={() => onClose()}
      transparent={true}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.mainContainer}
        key="loginFullScreenModel"
        onPress={() => onClose()}>
        <KeyboardAvoidingView
          style={{flex: 1, justifyContent: 'flex-end'}}
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          enabled={Platform.OS == 'ios' ? true : true}>
          <TouchableOpacity activeOpacity={1} style={styles.visibleViewStyle}>
            <TouchableOpacity
              style={styles.closeIconContainer}
              onPress={() => onClose()}>
              <CommonImage
                source={Images.IMG_CLOSE}
                style={{}}
                viewStyle={{
                  paddingHorizontal: spacing.PADDING_12,
                  paddingVertical: spacing.MARGIN_12,
                  borderRadius: spacing.MARGIN_50,
                }}
              />
            </TouchableOpacity>
            <View style={{flex: 1}}>
              <LoginModule onSuccess={() => onLoginSignupSuccess()} />
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: colors.transparentBlack,
  },
  visibleViewStyle: {
    flex: 1,
    width: spacing.FULL_WIDTH,
  },
  closeIconContainer: {
    alignSelf: 'flex-end',
    zIndex: 999,
    position: 'absolute',
  },
});

export default GuestUserFullScreenLoginModel;
