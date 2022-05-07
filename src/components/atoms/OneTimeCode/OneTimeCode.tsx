import React, {useEffect, useRef, useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {styles} from './styles';

interface IProp {
  onCodeInput: (codeCondition: boolean) => void;
}

export const OneTimeCode = ({onCodeInput}: IProp) => {
  const CODE_LENGTH = 4;
  const [code, setCode] = useState('');
  const [containerIsFocused, setContainerIsFocused] = useState(false);
  const isCodeFull = code.length === CODE_LENGTH;
  const codeDigits = [...Array(CODE_LENGTH)];
  const codeRef = useRef<TextInput>(null);

  useEffect(() => {
    onCodeInput(isCodeFull);
  }, [isCodeFull, onCodeInput]);

  const onCodeDigitPress = () => {
    setContainerIsFocused(true);
    codeRef?.current?.focus();
  };

  const onCodeDigitBlur = () => {
    setContainerIsFocused(false);
  };

  const toDigitInput = (_, index: number) => {
    const emptyDigit = ' ';
    const codeDigit = code[index] || emptyDigit;
    const isCurrentDigit = index === code.length;
    const isLastDigit = index === CODE_LENGTH - 1;
    const isLastDigitEmpty = code[CODE_LENGTH - 1] === undefined;
    const isDigitFocused = isCurrentDigit || (isLastDigit && isCodeFull);

    return (
      <View
        key={index}
        style={[
          styles.digitContainer,
          containerIsFocused && isDigitFocused && isLastDigitEmpty
            ? styles.digitContainerFocused
            : null,
        ]}>
        <Text style={styles.digit}>{codeDigit}</Text>
        {containerIsFocused && isDigitFocused && isLastDigitEmpty ? (
          <Text style={styles.placeholder} />
        ) : null}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.codeContainer} onPress={onCodeDigitPress}>
        {codeDigits.map(toDigitInput)}
      </Pressable>
      <TextInput
        ref={codeRef}
        style={styles.hiddenCodeInput}
        keyboardType="numeric"
        maxLength={CODE_LENGTH}
        value={code}
        onChangeText={setCode}
        onBlur={onCodeDigitBlur}
        onSubmitEditing={onCodeDigitBlur}
      />
    </View>
  );
};
