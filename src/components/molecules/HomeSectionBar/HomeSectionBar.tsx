import React, {memo, useCallback} from 'react';
import {View, Text} from 'react-native';
import {Icon} from 'atoms';
import {styles} from './styles';
import {FlatList} from 'react-native-gesture-handler';
import {useTranslation} from 'react-i18next';
import FastImage from 'react-native-fast-image';
import {IObject} from 'core/types';
interface Props {
  title: String;
  content: IObject[];
}

const renderItem = ({item: {cover, name}}: {item: IObject}) => (
  <View style={styles.cardContainer}>
    <FastImage style={styles.image} source={{uri: cover}} />

    <View style={styles.cardContentContainer}>
      <Text style={styles.title}>{name}</Text>
      <Icon name="bookmark" width={20} height={20} color={'white'} />
    </View>
  </View>
);

export const HomeSectionBar = memo(({title: sectionTitle, content}: Props) => {
  const keyExtractor = useCallback(({title}) => title, []);
  const {t} = useTranslation('home');
  return (
    <View>
      <View style={styles.sectionTitleContainer}>
        <Text style={styles.sectionTitle}>{sectionTitle}</Text>
        <Text style={styles.all}>{t('all')}</Text>
      </View>
      <FlatList
        keyExtractor={keyExtractor}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        data={content}
        horizontal
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
});
