import React, {memo} from 'react';
import {Text, View} from 'react-native';
import {useThemeStyles, useTranslation} from 'core/hooks';
import {IOrigins} from 'core/types';
import {composeTestID, getPlatformsTestID, tryOpenURL} from 'core/helpers';
import {themeStyles} from './styles';
import {TestIDs} from 'core/types';
import {LinkItem} from './components';

interface IProps {
  origins: IOrigins[];
}

export const ObjectDescriptionSource = memo(({origins}: IProps) => {
  const styles = useThemeStyles(themeStyles);
  const {t} = useTranslation('objectDetails');

  const sourceData = origins.map((origin, index) => (
    <LinkItem
      style={styles.link}
      name={origin.name}
      link={origin.value}
      {...getPlatformsTestID(
        composeTestID(TestIDs.ObjectDetailsReferencesItem, index),
      )}
      onPress={tryOpenURL}
      key={origin.name}
    />
  ));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('sources')}</Text>
      {sourceData}
    </View>
  );
});
