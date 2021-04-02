import React, {memo, useCallback} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {ObjectCard, CategoryCard} from 'molecules';
import {styles, cardWidth} from './styles';
import {FlatList} from 'react-native-gesture-handler';
import {useTranslation} from 'react-i18next';
import {IObject, ITransformedCategory} from 'core/types';
import {isEmpty} from 'lodash';
import {useCategories, useObjects} from 'core/hooks';

interface Props {
  item: ITransformedCategory;
  onAllObjectsPress: (options: {categoryId: string; title: string}) => void;
  onAllCategoriesPress: (options: {categoryId: string; title: string}) => void;
  onObjectPress: (options: {categoryId: string; objectId: string}) => void;
  onCategoryPress: (options: {categoryId: string; title: string}) => void;
}

export const HomeSectionBar = memo(
  ({
    onAllObjectsPress,
    onAllCategoriesPress,
    onObjectPress,
    onCategoryPress,
    item,
  }: Props) => {
    const {t} = useTranslation('home');

    const {_id: categoryId, name: sectionTitle, objects, children} = item;

    const isLessThenTwoItems = objects.length < 2 && children.length < 2;
    const isCategoriesList = isEmpty(objects);

    const objectsData = useObjects(objects);
    const childrenData = useCategories(children);

    const onAllPressHandler = useCallback(() => {
      if (isCategoriesList) {
        onAllCategoriesPress({categoryId, title: sectionTitle});
      } else {
        onAllObjectsPress({categoryId, title: sectionTitle});
      }
    }, [
      isCategoriesList,
      onAllCategoriesPress,
      categoryId,
      sectionTitle,
      onAllObjectsPress,
    ]);

    const onObjectPressHandler = useCallback(
      ({_id, category}: IObject) => {
        onObjectPress({categoryId: category, objectId: _id});
      },
      [onObjectPress],
    );

    const onCategoryPressHandler = useCallback(
      ({name, _id}: ITransformedCategory) => {
        onCategoryPress({categoryId: _id, title: name});
      },
      [onCategoryPress],
    );

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
        {isCategoriesList ? (
          <FlatList
            keyExtractor={({_id}) => _id}
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            data={childrenData}
            horizontal
            renderItem={({item: category}) => (
              <CategoryCard
                containerStyle={styles.objectCardContainer}
                width={cardWidth}
                onPress={onCategoryPressHandler}
                data={category}
              />
            )}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <FlatList
            keyExtractor={({_id}) => _id}
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            data={objectsData}
            horizontal
            renderItem={({item: object}) => (
              <ObjectCard
                containerStyle={styles.objectCardContainer}
                width={cardWidth}
                onPress={onObjectPressHandler}
                data={object}
              />
            )}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
    );
  },
);
