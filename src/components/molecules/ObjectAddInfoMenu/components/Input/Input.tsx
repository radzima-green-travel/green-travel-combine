import React, {forwardRef} from 'react';
import {Text} from 'react-native';
import {useThemeStyles} from 'core/hooks';
import {themeStyles} from './styles';
import {FormInput} from 'atoms';
import {View, KeyboardType} from 'react-native';
import {composeTestID} from 'core/helpers';

interface IProps {
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

    return (
      <>
        {!!prompt && <Text style={styles.prompt}>{prompt}</Text>}
        <View style={styles.fieldContainer}>
          <FormInput
            {...props}
            ref={ref}
            testID={composeTestID(testID, 'formInput')}
          />
        </View>
      </>
    );
  },
);
