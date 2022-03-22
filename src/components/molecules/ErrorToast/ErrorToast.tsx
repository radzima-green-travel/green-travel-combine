import React, {memo, forwardRef} from 'react';
import {View, Text} from 'react-native';
import {Toast, toastRef} from 'atoms';
import {themeStyles} from './styles';
import {useTranslation} from 'react-i18next';

import {useThemeStyles} from 'core/hooks';

export const ErrorToast = memo(
  forwardRef<toastRef, {text: string}>(({text}, ref) => {
    const styles = useThemeStyles(themeStyles);
    const {t} = useTranslation('common');

    return (
      <Toast isOnTop ref={ref}>
        <View style={styles.container}>
          <Text style={styles.text}>{text || t('errors.default.text')}</Text>
        </View>
      </Toast>
    );
  }),
);
