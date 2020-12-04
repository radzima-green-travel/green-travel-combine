import React, {memo, useCallback} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {ObjectCard} from 'atoms';
import {styles} from './styles';
import {FlatList} from 'react-native-gesture-handler';
import {useTranslation} from 'react-i18next';
import {
  ICategoryWithExtendedObjects,
  IExtendedObject,
  IChildren,
} from 'core/types';
import {isEmpty} from 'lodash';
import {SCREEN_WIDTH} from 'services/PlatformService';
import {PADDING_HORIZONTAL} from 'core/constants';

const cardWidth = (SCREEN_WIDTH - PADDING_HORIZONTAL * 2) * 0.945;

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

    const isLessThenTwoItems = objects.length < 2 && children.length < 2;

    const onAllPressHandler = useCallback(() => {
      onAllPress({categoryId, title: sectionTitle});
    }, [onAllPress, categoryId, sectionTitle]);
    return (
      <View>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>{sectionTitle}</Text>
          {!isLessThenTwoItems ? (
            <TouchableOpacity activeOpacity={0.8} onPress={onAllPressHandler}>
              <Text style={styles.all}>{t('all')}</Text>
            </TouchableOpacity>
          ) : null}
        </View>
        {isEmpty(objects) ? (
          <FlatList
            keyExtractor={({_id}) => _id}
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            data={children}
            horizontal
            renderItem={({item: {_id, name, cover}}: {item: IChildren}) => (
              <ObjectCard
                containerStyle={styles.objectCardContainer}
                width={cardWidth}
                onPress={onItemPress}
                id={_id}
                name={name}
                imageUri={cover}
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
            renderItem={({
              item: {_id, name, cover, isFavorite},
            }: {
              item: IExtendedObject;
            }) => (
              <ObjectCard
                containerStyle={styles.objectCardContainer}
                width={cardWidth}
                onPress={onItemPress}
                onIsFavoriteChange={onIsFavoriteChange}
                id={_id}
                name={name}
                imageUri={cover}
                isFavorite={isFavorite}
              />
            )}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
    );
  },
);
