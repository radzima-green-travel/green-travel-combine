import React from 'react';
import {View} from 'react-native';
import {themeStyles} from './styles';
import {useThemeStyles, useTranslation} from 'core/hooks';
import {UpdateView} from 'molecules';
import {useForceUpdate} from './hooks';

export const ForceUpdate = () => {
  const {t} = useTranslation('updateVersion');
  const styles = useThemeStyles(themeStyles);
  const {onUpdate} = useForceUpdate();

  return (
    <View style={styles.contentContainer}>
      <UpdateView
        testID="updateView"
        title={t('updateRequired')}
        subTitle={t('properWork')}
        buttonText={t('update')}
        onUpdate={onUpdate}
      />
    </View>
  );
};
