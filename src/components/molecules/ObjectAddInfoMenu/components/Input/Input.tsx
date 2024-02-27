import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {Text} from 'react-native';
import {useThemeStyles} from 'core/hooks';
import {themeStyles} from './styles';
import {FormInput} from 'atoms';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import {View, TextInput, KeyboardType} from 'react-native';
import {composeTestID} from 'core/helpers';

interface IProps {
  onFocus: () => void;
  onBlur: () => void;
  onChange: (value: string) => void;
  multiline: boolean | undefined;
  prompt: string;
  placeholder: string | undefined;
  keyboardType: KeyboardType;
  value: string;
  testID: string;
}

export interface ObjectAddInfoMenuRef {
  focus: () => void;
  blur: () => void;
  clear: () => void;
}

export const Input = forwardRef<ObjectAddInfoMenuRef, IProps>(
  ({prompt, testID, ...props}, ref) => {
    const styles = useThemeStyles(themeStyles);
    const textInputRef = useRef<TextInput>(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        textInputRef.current?.focus();
      },
      blur: () => {
        textInputRef.current?.blur();
      },
      clear: () => {
        textInputRef.current?.clear();
      },
    }));

    return (
      <>
        {!!prompt && <Text style={styles.prompt}>{prompt}</Text>}
        <View style={styles.fieldContainer}>
          <FormInput
            {...props}
            ref={textInputRef}
            testID={composeTestID(testID, 'formInput')}
            TextInputComponent={BottomSheetTextInput}
          />
        </View>
      </>
    );
  },
);
