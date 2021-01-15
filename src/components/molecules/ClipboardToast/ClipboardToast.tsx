import React, {memo, forwardRef} from 'react';
import {View, Text} from 'react-native';
import {Toast, toastRef, Icon} from 'atoms';
import {themeStyles} from './styles';
import {useTranslation} from 'react-i18next';

import {useThemeStyles} from 'core/hooks';
import {COLORS} from 'assets';

export const ClipboardToast = memo(
  forwardRef<toastRef, {}>((_, ref) => {
    const {t} = useTranslation('common');
    const styles = useThemeStyles(themeStyles);
    return (
      <Toast ref={ref}>
        <View style={styles.container}>
          <Text style={styles.text}>{t('coppied')}</Text>
          <Icon color={COLORS.apple} name="check" width={16} height={11} />
        </View>
      </Toast>
    );
  }),
);
