import React, {memo, useCallback} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {ObjectCard, SubCategoryCard} from 'atoms';
import {styles} from './styles';
import {FlatList} from 'react-native-gesture-handler';
import {useTranslation} from 'react-i18next';
import {
  ICategoryWithExtendedObjects,
  IExtendedObject,
  IChildren,
} from 'core/types';
import {isEmpty} from 'lodash';

interface Props {
  item: ICategoryWithExtendedObjects;
  onAllPress: (options: {categoryId: string; title: string}) => void;
  onItemPress: () => void;
  onIsFavoriteChange: (data: {objectId: string; needToAdd: boolean}) => void;
}

export const HomeSectionBar = memo(
  ({onAllPress, onItemPress, onIsFavoriteChange, item}: Props) => {
    const {t} = useTranslation('home');

    const {_id: categoryId, name: sectionTitle, objects, children} = item;

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
        {isEmpty(objects) ? (
          <FlatList
            keyExtractor={({_id}) => _id}
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            data={children}
            horizontal
            renderItem={({item: child}: {item: IChildren}) => (
              <SubCategoryCard
                containerStyle={styles.cardContainer}
                onPress={onItemPress}
                data={child}
              />
            )}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <FlatList
            keyExtractor={({_id, isFavorite}) => _id + String(isFavorite)}
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            data={objects}
            horizontal
            renderItem={({item: object}: {item: IExtendedObject}) => (
              <ObjectCard
                containerStyle={styles.cardContainer}
                onPress={onItemPress}
                data={object}
                onIsFavoriteChange={onIsFavoriteChange}
              />
            )}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
    );
  },
);
