import React, { useState } from 'react';
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

const CommonLabelTextInput = ({
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
  label,
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
  labelStyle
}) => {

  const [isFieldActive, setIsFieldActive] = useState(false)
  const [isUserOnInput, setIsUserOnInput] = useState(false)

  function _handleFocus() {
    if (!isUserOnInput) { setIsUserOnInput(true) }
    if (!isFieldActive) { setIsFieldActive(true) }
  }

  function _handleBlur() {
    if (isUserOnInput) { setIsUserOnInput(false) }
    if (isFieldActive) { setIsFieldActive(false) }
  }

  return (
    <View
      style={[styles.mainView, mainViewStyle,]}
      ref={ref}
    >
      <RegularText style={[{
        marginLeft: spacing.MARGIN_12,
        color: colors.grey900,
        fontFamily: fontNames.FONT_FAMILY_MEDIUM
      }, labelStyle]} >
        {label}
      </RegularText>
      <View
        style={[
          styles.inputContainer,
          inputContainerStyle,
          {
            borderBottomColor: isFieldActive ? colors.theme : colors.grey300
          }
        ]}>
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
            maxLength={maxChar ? maxChar : undefined}
            onFocus={() => _handleFocus()}
            onBlur={() => _handleBlur()}
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
    height: spacing.HEIGHT_50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  textInputStyle: {
    flex: 1,
    color: colors.black,
    fontFamily: fontNames.FONT_FAMILY_REGULAR,
    fontSize: textScale(12),
    paddingHorizontal: spacing.PADDING_12,
  },
  errorStyle: {
    fontSize: textScale(10),
    color: colors.red500,
    marginTop: spacing.MARGIN_4,
    marginLeft: spacing.MARGIN_12,
  },
});

CommonLabelTextInput.defaultProps = {
  onSubmitEditing: () => { },
  onChangeText: () => { }
}

export default CommonLabelTextInput;
