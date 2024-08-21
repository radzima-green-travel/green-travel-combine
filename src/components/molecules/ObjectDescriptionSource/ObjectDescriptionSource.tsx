import React, {memo} from 'react';
import {Text, View} from 'react-native';
import {useThemeStyles, useTranslation} from 'core/hooks';
import {IOrigins} from 'core/types';
import {composeTestID, getPlatformsTestID} from 'core/helpers';
import {themeStyles} from './styles';
import {Link} from 'atoms';

interface IProps {
  origins: IOrigins[];
  onLinkPress: (url: string) => void;
  testID: string;
}

export const ObjectDescriptionSource = memo(
  ({origins, onLinkPress, testID}: IProps) => {
    const styles = useThemeStyles(themeStyles);
    const {t} = useTranslation('objectDetails');

    const sourceData = origins.map(origin => (
      <Link
        style={styles.link}
        name={origin.name}
        link={origin.value}
        {...getPlatformsTestID(composeTestID(testID, 'link'))}
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
