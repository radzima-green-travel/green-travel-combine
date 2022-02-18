import React, {memo, useMemo} from 'react';
import {View, Text, Linking, TouchableOpacity} from 'react-native';
import {useTranslation} from 'core/hooks';
import {IOrigins} from 'core/types';
import {useThemeStyles} from 'core/hooks';
import {themeStyles} from './styles';
interface IProps {
  origins: IOrigins[];
}

export const ObjectDescriptionSource = memo(({origins}: IProps) => {
  const styles = useThemeStyles(themeStyles);
  const {t} = useTranslation('objectDetails');

  const sourceTitle = useMemo(() => {
    return t('sources');
  }, [t]);

  const sourceData = origins.map(origin => {
    return (
      <TouchableOpacity
        key={origin.name}
        activeOpacity={0.8}
        onPress={() => Linking.openURL(origin.value)}>
        <Text style={styles.link}>{origin.name}</Text>
      </TouchableOpacity>
    );
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{sourceTitle}</Text>
      {sourceData}
    </View>
  );
});
