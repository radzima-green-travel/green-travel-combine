import React, {memo, useCallback} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {ObjectCard} from 'atoms';
import {styles} from './styles';
import {FlatList} from 'react-native-gesture-handler';
import {useTranslation} from 'react-i18next';
import {IExtendedObject} from 'core/types';

interface Props {
  title: string;
  content: IExtendedObject[];
  categoryId: string;
  onAllPress: (options: {categoryId: string; title: string}) => void;
  onItemPress: () => void;
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
  }: Props) => {
    const keyExtractor = useCallback(({title}) => title, []);
    const {t} = useTranslation('home');

    const onAllPressHandler = useCallback(() => {
      onAllPress({categoryId, title: sectionTitle});
    }, [onAllPress, categoryId, sectionTitle]);

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
          renderItem={({item}: {item: IExtendedObject}) => (
            <ObjectCard
              containerStyle={styles.cardContainer}
              onPress={onItemPress}
              data={item}
              onIsFavoriteChange={addToFavorite}
            />
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  },
);
