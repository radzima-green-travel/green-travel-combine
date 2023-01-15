import React, {memo, useMemo} from 'react';
import {View, Text, Linking, TouchableOpacity} from 'react-native';
import {useThemeStyles, useTranslation} from 'core/hooks';
import {IOrigins} from 'core/types';
import {tryOpenURL} from 'core/helpers';
import {themeStyles} from './styles';
import {TestIDs} from 'core/types';

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

  const sourceData = origins
    ? origins.map((origin, index) => {
        const testID = `${TestIDs.ObjectDetailsReferencesItem}_${index + 1}`;

        return (
          <TouchableOpacity
            key={origin.name}
            activeOpacity={0.8}
            onPress={() => Linking.openURL(origin.value)}>
            <Text style={styles.link} testID={testID}>
              {origin.name}
            </Text>
          </TouchableOpacity>
        );
      })
    : null;

  return (
    <View style={styles.container}>
      <Text style={styles.text} testID={TestIDs.ObjectDetailsReferencesTitle}>
        {sourceTitle}
      </Text>
      {siteLink ? (
        <Text
          onPress={() => tryOpenURL(siteLink)}
          style={styles.link}
          testID={TestIDs.ObjectDetailsOfficialSiteLink}>
          {t('offSite')}
        </Text>
      ) : null}
      {sourceData}
    </View>
  );
});
