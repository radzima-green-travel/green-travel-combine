import React, {
  ComponentProps,
  ReactElement,
  forwardRef,
  useCallback,
  useState,
} from 'react';
import {
  Pressable,
  StyleProp,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {themeStyles} from './styles';
import {useColorScheme, useThemeStyles} from 'core/hooks';
import {Icon} from '../Icon';
import {IconProps} from 'atoms/Icon';
import {HelperText} from '../HelperText';
import {useHandleKeyboardInput} from '../HandleKeyboard';
import {useTextInputAutoFocus} from 'core/hooks';
import {composeTestID} from 'core/helpers';
import {COLORS} from 'assets';

interface IProps {
  iconLeft?: IconProps;
  iconRight?: Omit<IconProps, 'testID'>;
  value: string;
  onChange?: (value: string) => void;
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
  label?: string;
  focusNextFieldOnSubmit?: boolean;
  multiline?: boolean;
  placeholder?: string;
  testID: string;
  outlineEnabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

export const FormInput = forwardRef<TextInput, IProps>(
  (
    {
      iconLeft,
      iconRight,
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
      label,
      onSubmitEditing,
      focusNextFieldOnSubmit,
      returnKeyType,
      multiline,
      placeholder,
      testID,
      outlineEnabled = true,
      containerStyle,
    }: IProps,
    ref,
  ) => {
    const styles = useThemeStyles(themeStyles);
    const colorTheme = useColorScheme();
    const isInputEmty = !value.length;
    const isFocused = useSharedValue(false);

    const [labelWidth, setLabelWidth] = useState(0);

    const {
      handleContainerNode,
      containerToHandleRef,
      inputRef,
      focusNextInput,
    } = useHandleKeyboardInput(ref);

    const onFocusHandler = useCallback(() => {
      isFocused.value = true;
      if (onFocus) {
        onFocus();
      }
      handleContainerNode();
    }, [handleContainerNode, isFocused, onFocus]);

    const onBlurHandler = useCallback(() => {
      isFocused.value = false;
      if (onBlur) {
        onBlur();
      }
    }, [isFocused, onBlur]);

    const isInputValueValid = (valueToCheck: string) => {
      const isInvalidValue =
        valueToCheck.length &&
        ((invalidChars instanceof RegExp && !invalidChars.test(valueToCheck)) ||
          (allowedChars instanceof RegExp && allowedChars.test(valueToCheck)));

      return !isInvalidValue;
    };

    const onChangeHandler = (nextValue: string) => {
      if (isInputValueValid(nextValue)) {
        onChange?.(nextValue);
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

    const textInputAutofocus = useTextInputAutoFocus(inputRef, autoFocus);

    const translateY = useDerivedValue(() => {
      return withTiming(isFocused.value || !isInputEmty ? 1 : 0, {
        duration: 200,
      });
    }, [isInputEmty]);

    const labelAnimatedStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {
            scale: interpolate(translateY.value, [0, 1], [1, 0.8]),
          },
        ],
      };
    });

    const labelContainerStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateY: interpolate(translateY.value, [0, 1], [0, -13]),
          },
          {
            translateX: interpolate(
              translateY.value,
              [0, 1],
              [0, -labelWidth * 0.1],
            ),
          },
        ],
      };
    }, [labelWidth]);

    const inputContainerStyle = useAnimatedStyle(() => {
      const inactiveColor = styles.inactiveFieldContainer.borderColor as string;
      const activeColor = styles.activeFieldContainer.borderColor as string;
      const errorColor = styles.errorFieldContainer.borderColor as string;
      if (error) {
        return {
          borderColor: withTiming(errorColor),
        };
      }
      return {
        borderColor: withTiming(isFocused.value ? activeColor : inactiveColor),
      };
    }, [error]);

    const renderLabel = () => {
      return (
        <Animated.View
          style={[styles.labelContainer, labelContainerStyle]}
          pointerEvents="none">
          <Animated.Text
            onLayout={event => {
              setLabelWidth(event.nativeEvent.layout.width);
            }}
            style={[styles.label, labelAnimatedStyle]}>
            {label}
          </Animated.Text>
        </Animated.View>
      );
    };

    const isLightTheme = colorTheme === 'light';

    return (
      <View style={styles.container} ref={containerToHandleRef}>
        <Animated.View
          style={[
            styles.inputFieldContainer,
            multiline && styles.multilineInputWrapper,
            containerStyle,
            outlineEnabled
              ? [styles.outlinedFieldContainer, inputContainerStyle]
              : false,
          ]}>
          {iconLeft ? (
            <Icon
              style={[styles.icon, styles.leftIcon]}
              {...iconLeft}
              size={24}
            />
          ) : null}
          <View
            style={[
              styles.inputFieldWrapper,
              multiline && styles.multilineInputFieldWrapper,
            ]}>
            {label ? renderLabel() : null}
            <TextInput
              testID={testID}
              ref={inputRef}
              style={[
                styles.inputField,
                !!label && styles.labelInputField,
                multiline && styles.multilineInputField,
              ]}
              secureTextEntry={secureTextEntry}
              autoCapitalize="none"
              keyboardType={keyboardType}
              autoCorrect={false}
              value={value}
              multiline={multiline}
              placeholder={placeholder}
              maxLength={maxLength}
              onChangeText={onChangeHandler}
              autoFocus={textInputAutofocus}
              onFocus={onFocusHandler}
              onBlur={onBlurHandler}
              onSubmitEditing={onSubmitEditingHandler}
              returnKeyType={returnKeyType}
              selectionColor={
                isLightTheme
                  ? COLORS.light.icon.accentLight
                  : COLORS.dark.icon.accentLight
              }
              placeholderTextColor={(styles.placeholderText as TextStyle).color}
            />
          </View>
          {iconRight ? (
            <Pressable onPress={onRightIconPress}>
              <Icon
                testID={composeTestID(testID, 'rightIcon')}
                style={[styles.icon, styles.rightIcon]}
                {...iconRight}
                size={24}
              />
            </Pressable>
          ) : null}
        </Animated.View>
        {helperText || <HelperText messageText={messageText} error={error} />}
      </View>
    );
  },
);
