import React, {memo, useMemo} from 'react';
import {View, Text, Linking, TouchableOpacity} from 'react-native';
import {useThemeStyles, useTranslation} from 'core/hooks';
import {IOrigins} from 'core/types';
import {tryOpenURL} from 'core/helpers';
import {themeStyles} from './styles';
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
    ? origins.map(origin => {
        return (
          <TouchableOpacity
            key={origin.name}
            activeOpacity={0.8}
            onPress={() => Linking.openURL(origin.value)}>
            <Text style={styles.link}>{origin.name}</Text>
          </TouchableOpacity>
        );
      })
    : null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{sourceTitle}</Text>
      {siteLink ? (
        <Text onPress={() => tryOpenURL(siteLink)} style={styles.link}>
          {t('offSite')}
        </Text>
      ) : null}
      {sourceData}
    </View>
  );
});
