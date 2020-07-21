import React, {useCallback} from 'react';
import {View, Image, Text} from 'react-native';
import {Icon, TextElemets} from 'atoms';
import {styles} from './styles';
import {FlatList} from 'react-native-gesture-handler';
import {useTranslation} from 'react-i18next';

interface Props {
  categories: Array<any>;
}

export const HomeCategoriesBar = ({categories}: Props) => {
  const {t} = useTranslation('home');
  const renderItem = useCallback(
    ({item: {image, title, icon}}) => (
      <View style={styles.cardContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={image} />
          <Icon name={icon} width={28} height={28} />
        </View>
        <Text>{title}</Text>
      </View>
    ),
    [],
  );

  const keyExtractor = useCallback(({title}) => title, []);

  return (
    <View>
      <TextElemets.H2>{t('Discover new places')}</TextElemets.H2>

      <FlatList
        keyExtractor={keyExtractor}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        data={categories}
        horizontal
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
