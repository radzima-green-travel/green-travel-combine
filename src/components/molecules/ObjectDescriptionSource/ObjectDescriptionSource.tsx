import React, {memo} from 'react';
import {Text, View} from 'react-native';
import {useThemeStyles, useTranslation} from 'core/hooks';
import {IOrigins} from 'core/types';
import {composeTestID, getPlatformsTestID} from 'core/helpers';
import {themeStyles} from './styles';
import {TestIDs} from 'core/types';
import {Link} from 'atoms';

interface IProps {
  origins: IOrigins[];
  onLinkPress: (url: string) => void;
}

export const ObjectDescriptionSource = memo(
  ({origins, onLinkPress}: IProps) => {
    const styles = useThemeStyles(themeStyles);
    const {t} = useTranslation('objectDetails');

    const sourceData = origins.map((origin, index) => (
      <Link
        style={styles.link}
        name={origin.name}
        link={origin.value}
        {...getPlatformsTestID(
          composeTestID(TestIDs.ObjectDetailsReferencesItem, index),
        )}
        onPress={onLinkPress}
        key={origin.name}
      />
    ));

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{t('sources')}</Text>
        {sourceData}
      </View>
    );
  },
);
