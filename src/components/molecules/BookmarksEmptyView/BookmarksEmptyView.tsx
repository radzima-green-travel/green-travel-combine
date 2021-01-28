import React, {memo} from 'react';
import {View, Text} from 'react-native';
import {Icon} from 'atoms';
import {SCREEN_WIDTH} from 'services/PlatformService';
import {styles} from './styles';
import {useTranslation} from 'react-i18next';

const ratio = 281 / 373;
const width = SCREEN_WIDTH;
const height = width * ratio;

export const BookmarksEmptyView = memo(() => {
  const {t} = useTranslation('bookmarks');
  return (
    <View style={[styles.container]}>
      <Icon name="bookmarksEmpty" width={width} height={height} />
      <Text style={styles.text}>{t('emptyText')}</Text>
    </View>
  );
});
