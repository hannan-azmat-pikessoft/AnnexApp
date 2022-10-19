import React from 'react';
import {
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { textScale } from '../../../styles/responsiveStyles';
import { spacing } from '../../../styles/spacing';
import { fontNames } from '../../../styles/typography';
import colors from '../../../utility/colors';
import RegularText from '../RegularText';

const CommonTextInput = ({
  placeHolder,
  onChangeText,
  onSubmitEditing,
  refValue,
  keyboardType,
  returnKeyType,
  secureTextEntry,
  inputStyle,
  editable,
  value,
  error,
  rightComponent,
  leftComponent,
  onPressInput,
  mainViewStyle,
  autoCapitalize,
  maxChar,
  ref,
  multiline,
  inputContainerStyle,
  autoFocus
}) => {

  return (
    <View
      style={[mainViewStyle,]}
      ref={ref}
    >
      <View style={[styles.inputContainer, inputContainerStyle,]}>
        {leftComponent ? leftComponent : null}
        <TouchableOpacity style={{ flex: 1 }} activeOpacity={1}>
          <TextInput
            ref={refValue}
            placeholder={placeHolder ? placeHolder : '' || ''}
            placeholderTextColor={colors.grey600}
            value={value}
            editable={editable != undefined ? editable : true}
            multiline={multiline != undefined ? multiline : false}
            showSoftInputOnFocus={onPressInput ? false : true}
            style={[styles.textInputStyle, inputStyle, {}]}
            keyboardType={keyboardType}
            returnKeyType={returnKeyType}
            secureTextEntry={secureTextEntry}
            autoCapitalize={autoCapitalize || 'sentences'}
            autoFocus={autoFocus || false}
            maxLength={maxChar ? maxChar : undefined}
            onPressIn={() => {
              if (onPressInput) {
                Keyboard.dismiss(); onPressInput();
              }
            }}
            onSubmitEditing={() => onSubmitEditing()}
            onChangeText={value => onChangeText(value)}
          />
        </TouchableOpacity>
        {rightComponent ? rightComponent : null}
      </View>
      {error != '' && (
        <RegularText style={styles.errorStyle} >
          {error}
        </RegularText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
  },
  inputContainer: {
    height: spacing.HEIGHT_68,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: spacing.RADIUS_8,
    backgroundColor: colors.white
  },
  textInputStyle: {
    flex: 1,
    color: colors.black,
    fontFamily: fontNames.FONT_FAMILY_REGULAR,
    fontSize: textScale(12),
    paddingHorizontal: spacing.PADDING_12,
    paddingVertical: -spacing.PADDING_8
  },
  errorStyle: {
    fontSize: textScale(10),
    color: colors.red500,
    marginTop: spacing.MARGIN_4,
    marginLeft: spacing.MARGIN_12,
  },
});

CommonTextInput.defaultProps = {
  onSubmitEditing: () => { },
  onChangeText: () => { }
}

export default CommonTextInput;
