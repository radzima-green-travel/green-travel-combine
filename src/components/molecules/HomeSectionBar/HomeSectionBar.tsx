import React, {memo, useCallback} from 'react';
import {View, ImageBackground, Text} from 'react-native';
import {Icon} from 'atoms';
import {styles} from './styles';
import {FlatList} from 'react-native-gesture-handler';
import {useTranslation} from 'react-i18next';

interface Props {
  title: String;
  content: Array<any>;
}

const renderItem = ({item: {image, title}}) => (
  <View style={styles.cardContainer}>
    <ImageBackground style={styles.image} source={image}>
      <View style={styles.cardContentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Icon name="bookmark" width={20} height={20} color={'white'} />
      </View>
    </ImageBackground>
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
        snapToInterval={324}
        decelerationRate="fast"
      />
    </View>
  );
});
