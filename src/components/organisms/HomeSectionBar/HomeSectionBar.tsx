import React, {memo, useCallback, useRef, useEffect, useMemo} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {ObjectCard, CategoryCard} from 'molecules';
import {themeStyles, cardWidth, SNAP_INTERVAL} from './styles';
import {useTranslation} from 'react-i18next';
import {CardItem, HomeSectionBarItem, TestIDs} from 'core/types';
import {useThemeStyles} from 'core/hooks';
import {useScrollToTop} from '@react-navigation/native';
import {composeTestID, getPlatformsTestID} from 'core/helpers';

interface Props {
  item: HomeSectionBarItem;
  allButtonTestID: string;
  onAllObjectsPress: (options: {categoryId: string; title: string}) => void;
  onAllCategoriesPress: (options: {categoryId: string; title: string}) => void;
  onObjectPress: (options: CardItem) => void;
  onCategoryPress: (options: CardItem, parentCategoryName: string) => void;
  onObjectCardIsFavoriteChanged: (data: {
    object: CardItem;
    nextIsFavorite: boolean;
  }) => void;
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
    const {items, isCategoryItems, title, categoryId} = item;

    const isLessThenTwoItems = items.length < 2;

    const listRef = useRef<FlatList>(null);

    const onAllPressHandler = useCallback(() => {
      if (isCategoryItems) {
        onAllCategoriesPress({categoryId, title});
      } else {
        onAllObjectsPress({categoryId, title});
      }
    }, [
      categoryId,
      isCategoryItems,
      onAllCategoriesPress,
      onAllObjectsPress,
      title,
    ]);

    const onObjectPressHandler = useCallback(
      (object: CardItem) => {
        onObjectPress(object);
      },
      [onObjectPress],
    );

    const onCategoryPressHandler = useCallback(
      (category: CardItem) => {
        onCategoryPress(category, title);
      },
      [onCategoryPress, title],
    );

    const onObjectCardIsFavoriteChangedHandler = useCallback(
      (object: CardItem, nextIsFavorite: boolean) => {
        onObjectCardIsFavoriteChanged({
          object,
          nextIsFavorite,
        });
      },
      [onObjectCardIsFavoriteChanged],
    );

    useScrollToTop(listRef);

    useEffect(() => {
      listRef.current?.scrollToOffset({animated: true, offset: 0});
    }, []);

    const snapToOffsets = useMemo(() => {
      return items.map((_, index) => {
        return index * SNAP_INTERVAL - 8;
      });
    }, [items]);

    const renderItem = useCallback(
      ({item: data}: {item: CardItem}) => {
        if (isCategoryItems) {
          return (
            <CategoryCard
              containerStyle={styles.objectCardContainer}
              width={cardWidth}
              onPress={onCategoryPressHandler}
              data={data}
              testID={TestIDs.CategoryCardTitle}
            />
          );
        }

        return (
          <ObjectCard
            containerStyle={styles.objectCardContainer}
            width={cardWidth}
            onPress={onObjectPressHandler}
            data={data}
            onFavoriteChanged={onObjectCardIsFavoriteChangedHandler}
            testID={TestIDs.ObjectTitle}
          />
        );
      },
      [
        isCategoryItems,
        onCategoryPressHandler,
        onObjectCardIsFavoriteChangedHandler,
        onObjectPressHandler,
        styles.objectCardContainer,
      ],
    );

    return (
      <View>
        <View style={styles.sectionTitleContainer}>
          <Text
            style={styles.sectionTitle}
            {...getPlatformsTestID(
              composeTestID(TestIDs.CategoryTitle, title),
            )}>
            {title}
          </Text>
          {!isLessThenTwoItems ? (
            <TouchableOpacity activeOpacity={0.8} onPress={onAllPressHandler}>
              <Text style={styles.all} {...getPlatformsTestID(allButtonTestID)}>
                {t('all')}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
        {isCategoryItems ? (
          <FlatList
            ref={listRef}
            snapToOffsets={snapToOffsets}
            snapToStart={false}
            decelerationRate="fast"
            keyExtractor={({id}) => id}
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            data={items}
            horizontal
            renderItem={renderItem}
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
            data={items}
            horizontal
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
    );
  },
);
