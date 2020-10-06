import React, {memo, useCallback} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {ObjectCard} from 'atoms';
import {styles} from './styles';
import {FlatList} from 'react-native-gesture-handler';
import {useTranslation} from 'react-i18next';
import {IObject} from 'core/types';
import {includes} from 'lodash';
interface Props {
  title: string;
  content: IObject[];
  categoryId: string;
  onAllPress: (options: {data: IObject[]; title: string}) => void;
  onItemPress: () => void;
  favoritesObjects: string[] | null | undefined;
  addToFavorite: (data: {
    categoryId: string;
    objectId: string;
    needToAdd: boolean;
  }) => void;
}

export const HomeSectionBar = memo(
  ({
    title: sectionTitle,
    content,
    onAllPress,
    onItemPress,
    addToFavorite,
    categoryId,
    favoritesObjects,
  }: Props) => {
    const keyExtractor = useCallback(({title}) => title, []);
    const {t} = useTranslation('home');

    const onAllPressHandler = useCallback(() => {
      onAllPress({data: content, title: sectionTitle});
    }, [onAllPress, content, sectionTitle]);

    const addToFavoriteHandler = useCallback(
      (objectId: string, needToAdd: boolean) => {
        addToFavorite({objectId, needToAdd, categoryId});
      },
      [addToFavorite, categoryId],
    );

    const renderItem = ({item}: {item: IObject}) => (
      <ObjectCard
        containerStyle={styles.cardContainer}
        onPress={onItemPress}
        data={item}
        onIsFavoriteChange={addToFavoriteHandler}
        isFavorite={includes(favoritesObjects, item._id)}
      />
    );

    return (
      <View>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>{sectionTitle}</Text>
          <TouchableOpacity activeOpacity={0.8} onPress={onAllPressHandler}>
            <Text style={styles.all}>{t('all')}</Text>
          </TouchableOpacity>
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
  },
);
