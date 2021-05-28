import React, {memo, forwardRef} from 'react';
import {View, Text} from 'react-native';
import {Toast, toastRef} from 'atoms';
import {themeStyles} from './styles';

import {useThemeStyles} from 'core/hooks';

export const ErrorToast = memo(
  forwardRef<toastRef, {text: string}>(({text}, ref) => {
    const styles = useThemeStyles(themeStyles);
    return (
      <Toast isOnTop ref={ref}>
        <View style={styles.container}>
          <Text style={styles.text}>{text}</Text>
        </View>
      </Toast>
    );
  }),
);
