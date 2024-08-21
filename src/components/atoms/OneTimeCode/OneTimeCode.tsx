import React, {useCallback, useMemo, useRef, useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {useThemeStyles} from 'core/hooks';
import {themeStyles} from './styles';
import {HelperText} from '../HelperText';
import {composeTestID, getPlatformsTestID} from 'core/helpers';
import {useTextInputAutoFocus} from 'core/hooks';

interface IProp {
  onChange: (code: string, isCodeFull: boolean) => void;
  value: string;
  messageText?: string;
  error?: boolean;
  codeLength?: number;
  autoFocus?: boolean;
  testID: string;
}

export const OneTimeCode = ({
  onChange,
  messageText,
  error,
  codeLength = 6,
  value,
  autoFocus = false,
  testID,
}: IProp) => {
  const styles = useThemeStyles(themeStyles);
  const [containerIsFocused, setContainerIsFocused] = useState(false);
  const isCodeFull = value.length === codeLength;
  const codeDigits = useMemo(() => [...Array(codeLength)], [codeLength]);
  const codeRef = useRef<TextInput>(null);

  const onCodeChangeHandler = useCallback(
    (nextValue: string) => {
      onChange(nextValue, nextValue.length === codeLength);
    },
    [codeLength, onChange],
  );

  const onCodeDigitPress = () => {
    codeRef?.current?.focus();
  };

  const onCodeDigitBlur = () => {
    setContainerIsFocused(false);
  };

  const onCodeDigitFocus = () => {
    setContainerIsFocused(true);
  };

  const toDigitInput = (_, index: number) => {
    const emptyDigit = ' ';
    const codeDigit = value[index] || emptyDigit;
    const isCurrentDigit = index === value.length;
    const isLastDigit = index === codeLength - 1;
    const isLastDigitEmpty = value[codeLength - 1] === undefined;
    const isDigitFocused = isCurrentDigit || (isLastDigit && isCodeFull);

    return (
      <View
        {...getPlatformsTestID(composeTestID(testID, index))}
        key={index}
        style={[
          styles.digitContainer,
          containerIsFocused && isDigitFocused && isLastDigitEmpty
            ? styles.digitContainerFocused
            : null,
        ]}>
        <Text style={styles.digit}>{codeDigit}</Text>
        {containerIsFocused && isDigitFocused && isLastDigitEmpty ? (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholder}>_</Text>
          </View>
        ) : null}
      </View>
    );
  };

  const textInputAutoFocus = useTextInputAutoFocus(codeRef, autoFocus);

  return (
    <View style={styles.container}>
      <Pressable style={styles.codeContainer} onPress={onCodeDigitPress}>
        {codeDigits.map(toDigitInput)}
      </Pressable>
      <TextInput
        ref={codeRef}
        style={styles.hiddenCodeInput}
        keyboardType="numeric"
        maxLength={codeLength}
        value={value}
        onChangeText={onCodeChangeHandler}
        onFocus={onCodeDigitFocus}
        onBlur={onCodeDigitBlur}
        onSubmitEditing={onCodeDigitBlur}
        autoFocus={textInputAutoFocus}
      />
      <HelperText messageText={messageText} error={error} />
    </View>
  );
};
