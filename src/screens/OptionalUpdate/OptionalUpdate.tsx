import React from 'react';
import {View} from 'react-native';
import {themeStyles} from './styles';
import {useThemeStyles, useTranslation} from 'core/hooks';
import {UpdateView} from 'molecules';

export const OptionalUpdate = () => {
  const {t} = useTranslation('updateVersion');
  const styles = useThemeStyles(themeStyles);

  return (
    <View style={styles.contentContainer}>
      <UpdateView
        title={t('updateRequired')}
        subTitle={t('properWork')}
        buttonText={t('update')}
        onUpdate={() => {}}
      />
    </View>
  );
};
