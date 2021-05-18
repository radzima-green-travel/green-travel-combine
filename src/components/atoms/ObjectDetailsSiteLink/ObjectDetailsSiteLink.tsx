import {useThemeStyles} from 'core/hooks';
import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text} from 'react-native';
import {themeStyles} from './styles';
import {tryOpenURL} from 'core/helpers';

interface IProps {
  url: string;
}

export const ObjectDetailsSiteLink = memo(({url}: IProps) => {
  const {t} = useTranslation('objectDetails');
  const styles = useThemeStyles(themeStyles);

  return (
    <View style={styles.container}>
      <Text onPress={() => tryOpenURL(url)} style={styles.title}>
        {t('offSite')}
      </Text>
    </View>
  );
});
