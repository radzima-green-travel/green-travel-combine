import React, {memo, useCallback, useRef, useEffect, useMemo} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {ObjectCard, CategoryCard} from 'molecules';
import {themeStyles, cardWidth, getSnapToOffsets} from './styles';
import {useTranslation} from 'react-i18next';
import {IObject, ITransformedCategory, TestIDs} from 'core/types';
import {isEmpty} from 'lodash';
import {useCategories, useObjects, useThemeStyles} from 'core/hooks';
import {useScrollToTop} from '@react-navigation/native';
import {composeTestID, getPlatformsTestID} from 'core/helpers';

interface Props {
  item: ITransformedCategory;
  allButtonTestID: string;
  onAllObjectsPress: (options: {categoryId: string; title: string}) => void;
  onAllCategoriesPress: (options: {categoryId: string; title: string}) => void;
  onObjectPress: (options: IObject) => void;
  onCategoryPress: (
    options: ITransformedCategory,
    parentCategoryName: string,
  ) => void;
  onObjectCardIsFavoriteChanged: (
    options: IObject,
    nextIsFavorite: boolean,
  ) => void;
}

export const HomeSectionBar = memo(
  ({
    onAllObjectsPress,
    onAllCategoriesPress,
    onObjectPress,
    onCategoryPress,
    onObjectCardIsFavoriteChanged,
    allButtonTestID,
    item,
  }: Props) => {
    const {t} = useTranslation('home');
    const styles = useThemeStyles(themeStyles);
    const {id: categoryId, name: sectionTitle, objects, children} = item;

    const isLessThenTwoItems = objects.length < 2 && children.length < 2;
    const isCategoriesList = isEmpty(objects);

    const objectsData = useObjects(objects);
    const childrenData = useCategories(children);

    const listRef = useRef<FlatList>(null);

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
      (object: IObject) => {
        onObjectPress(object);
      },
      [onObjectPress],
    );

    const onCategoryPressHandler = useCallback(
      (category: ITransformedCategory) => {
        onCategoryPress(category, sectionTitle);
      },
      [onCategoryPress, sectionTitle],
    );

    useScrollToTop(listRef);

    useEffect(() => {
      listRef.current?.scrollToOffset({animated: true, offset: 0});
    }, [childrenData, objectsData]);

    const snapToOffsetsForChildrenData = useMemo(() => {
      return getSnapToOffsets(childrenData);
    }, [childrenData]);

    const snapToOffsets = useMemo(() => {
      return getSnapToOffsets(objectsData);
    }, [objectsData]);

    return (
      <View>
        <View style={styles.sectionTitleContainer}>
          <Text
            style={styles.sectionTitle}
            {...getPlatformsTestID(
              composeTestID(TestIDs.CategoryTitle, sectionTitle),
            )}>
            {sectionTitle}
          </Text>
          {!isLessThenTwoItems ? (
            <TouchableOpacity activeOpacity={0.8} onPress={onAllPressHandler}>
              <Text style={styles.all} {...getPlatformsTestID(allButtonTestID)}>
                {t('all')}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
        {isCategoriesList ? (
          <FlatList
            ref={listRef}
            snapToOffsets={snapToOffsetsForChildrenData}
            snapToStart={false}
            decelerationRate="fast"
            keyExtractor={({id}) => id}
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
                testID={TestIDs.CategoryCardTitle}
              />
            )}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <FlatList
            ref={listRef}
            keyExtractor={({id}) => id}
            snapToOffsets={snapToOffsets}
            snapToStart={false}
            decelerationRate="fast"
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
                onFavoriteChanged={onObjectCardIsFavoriteChanged}
                testID={TestIDs.ObjectTitle}
              />
            )}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
    );
  },
);
