import React, {memo, useMemo} from 'react';
import {View, Text} from 'react-native';
import {useThemeStyles, useTranslation} from 'core/hooks';
import {IOrigins} from 'core/types';
import {composeTestID, getPlatformsTestID, tryOpenURL} from 'core/helpers';
import {themeStyles} from './styles';
import {TestIDs} from 'core/types';
import {LinkItem} from './components';

interface IProps {
  origins?: IOrigins[];
  siteLink?: string;
}

export const ObjectDescriptionSource = memo(({origins, siteLink}: IProps) => {
  const styles = useThemeStyles(themeStyles);
  const {t} = useTranslation('objectDetails');

  const sourceTitle = useMemo(() => {
    return t('sources');
  }, [t]);

  tryOpenURL;

  const sourceData = origins
    ? origins.map((origin, index) => (
        <LinkItem
          name={origin.name}
          link={origin.value}
          {...getPlatformsTestID(
            composeTestID(TestIDs.ObjectDetailsReferencesItem, index),
          )}
          onPress={tryOpenURL}
          key={origin.name}
        />
      ))
    : null;

  return (
    <View style={styles.container}>
      <Text
        style={styles.title}
        {...getPlatformsTestID(TestIDs.ObjectDetailsReferencesTitle)}>
        {sourceTitle}
      </Text>
      {siteLink ? (
        <LinkItem
          name={t('offSite')}
          link={siteLink}
          {...getPlatformsTestID(TestIDs.ObjectDetailsOfficialSiteLink)}
          onPress={tryOpenURL}
        />
      ) : null}
      {sourceData}
    </View>
  );
});
