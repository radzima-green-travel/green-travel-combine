import React, {
  ComponentProps,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {themeStyles} from './styles';
import {useColorScheme, useThemeStyles, useTranslation} from 'core/hooks';
import {Icon} from '../Icon';
import {IconsNames} from 'atoms/Icon/IconsNames';
import {COLORS} from 'assets';
import {HelperText} from '../HelperText';
import {isIOS} from 'services/PlatformService';
import {useNavigation} from '@react-navigation/native';
import {useHandleKeyboardInput} from '../HandleKeyboard';

interface IProps {
  iconLeftName?: IconsNames;
  iconRightName?: IconsNames;
  size: number;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  onRightIconPress?: () => void;
  autoFocus?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  messageText?: string;
  error?: boolean;
  helperText?: ReactElement;
  maxLength?: number;
  invalidChars?: RegExp;
  allowedChars?: RegExp;
  keyboardType?: ComponentProps<typeof TextInput>['keyboardType'];
  onSubmitEditing?: ComponentProps<typeof TextInput>['onSubmitEditing'];
  returnKeyType?: ComponentProps<typeof TextInput>['returnKeyType'];
  title?: string;
  focusNextFieldOnSubmit?: boolean;
}

export const FormInput = ({
  iconLeftName,
  iconRightName,
  size,
  placeholder,
  secureTextEntry = false,

  value,
  onChange,
  onRightIconPress,
  autoFocus,
  onFocus,
  onBlur,
  messageText,
  error,
  helperText,
  maxLength,
  invalidChars,
  allowedChars,
  keyboardType,
  title,
  onSubmitEditing,
  focusNextFieldOnSubmit,
  returnKeyType,
}: IProps) => {
  const {t} = useTranslation('authentification');
  const styles = useThemeStyles(themeStyles);
  const colorScheme = useColorScheme();
  const ref = useRef<TextInput>(null);

  const {handleContainerNode, containerToHandleRef, inputRef, focusNextInput} =
    useHandleKeyboardInput(ref);

  const onFocusHandler = useCallback(() => {
    if (onFocus) {
      onFocus();
    }

    handleContainerNode();
  }, [handleContainerNode, onFocus]);

  const onBlurHandler = useCallback(() => {
    if (onBlur) {
      onBlur();
    }
  }, [onBlur]);

  const navigation = useNavigation();

  useEffect(() => {
    if (autoFocus && isIOS) {
      // @ts-ignore
      const unsubscribe = navigation.addListener('transitionEnd', () => {
        ref.current?.focus();
      });

      return unsubscribe;
    }
  }, [autoFocus, navigation]);

  const isInputValueValid = (valueToCheck: string) => {
    const isInvalidValue =
      valueToCheck.length &&
      ((invalidChars instanceof RegExp && !invalidChars.test(valueToCheck)) ||
        (allowedChars instanceof RegExp && allowedChars.test(valueToCheck)));

    return !isInvalidValue;
  };

  const onChangeHandler = (nextValue: string) => {
    if (isInputValueValid(nextValue)) {
      onChange(nextValue);
    }
  };

  const onSubmitEditingHandler = e => {
    if (onSubmitEditing) {
      onSubmitEditing(e);
    }
    if (focusNextFieldOnSubmit) {
      focusNextInput();
    }
  };

  return (
    <View style={styles.container} ref={containerToHandleRef}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <View
        style={[
          styles.inputFieldContainer,
          error ? styles.dangerBorder : null,
        ]}>
        {iconLeftName ? (
          <Icon
            name={iconLeftName}
            size={size}
            color={colorScheme === 'light' ? COLORS.logCabin : COLORS.white}
            style={styles.icon}
          />
        ) : null}
        <TextInput
          ref={inputRef}
          style={styles.inputField}
          placeholder={t(placeholder)}
          secureTextEntry={secureTextEntry}
          autoCapitalize="none"
          keyboardType={keyboardType}
          autoCorrect={false}
          value={value}
          maxLength={maxLength}
          onChangeText={onChangeHandler}
          autoFocus={isIOS ? undefined : autoFocus}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          placeholderTextColor={
            colorScheme === 'light' ? COLORS.silver : COLORS.cullGrey
          }
          onSubmitEditing={onSubmitEditingHandler}
          returnKeyType={returnKeyType}
        />
        {iconRightName ? (
          <Pressable
            style={[styles.iconContainer, error ? styles.dangerBorder : null]}
            onPress={onRightIconPress}>
            <Icon
              name={iconRightName}
              size={16}
              color={colorScheme === 'light' ? COLORS.logCabin : COLORS.white}
            />
          </Pressable>
        ) : null}
      </View>
      {helperText || <HelperText messageText={messageText} error={error} />}
    </View>
  );
};
