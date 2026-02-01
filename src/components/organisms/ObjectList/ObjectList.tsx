import { ICONS_MATCHER } from 'core/constants';
import { composeTestID } from 'core/helpers';
import {
  useScrollToTopButton,
  useObjectListMapView,
  useThemeStyles,
  useTranslation,
} from 'core/hooks';
import { SearchObject } from 'core/types';
import { idKeyExtractor } from 'core/utils/react';
import React, { useCallback } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  ListRenderItem,
  Text,
  View,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { ObjectListModeSwitch } from '../../atoms';
import { ListItem, ObjectCardNew, SearchListItem } from '../../molecules';
import { ObjectListViewMode } from '../../types';
import { themeStyles } from './styles';
import { MapWithBottomSheet } from '../MapWithBottomSheet';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useObjectListSlots } from './ObjectListSlotsContext';

const AnimatedBottomSheetFlatList =
  Animated.createAnimatedComponent(BottomSheetFlatList);

type AnimatedFlatListProps = React.ComponentProps<typeof Animated.FlatList>;

export interface ObjectListProps
  extends Omit<AnimatedFlatListProps, 'data' | 'renderItem'> {
  testID: string;
  data: SearchObject[];
  renderItem?: ListRenderItem<{
    data: SearchObject;
    viewMode: ObjectListViewMode;
  }>;
  totalResults: number;
  onItemPress: (object: SearchObject) => void;
  onToggleFavoriteStatusPress?: (
    object: SearchObject,
    nextIsFavorite: boolean,
  ) => void;

  viewMode?: ObjectListViewMode;
  onViewModeChange?: (viewMode: ObjectListViewMode) => void;
  mapWithBottomSheetProps?: ReturnType<typeof useObjectListMapView>;

  handlesKeyboard?: boolean;
  withScrollToTopButton?: boolean;
  withMapWithBottomSheet?: boolean;
}

export const ObjectList = ({
  testID,
  data,
  totalResults,
  onItemPress,
  onToggleFavoriteStatusPress,

  viewMode = 'list',
  onViewModeChange,

  renderItem: renderItemProp,

  handlesKeyboard = true,
  withScrollToTopButton = true,
  withMapWithBottomSheet = true,
  mapWithBottomSheetProps,
  ...listProps
}: ObjectListProps) => {
  const styles = useThemeStyles(themeStyles);
  const { t } = useTranslation('search');
  const { footer } = useObjectListSlots();

  const renderItem: ListRenderItem<SearchObject> = useCallback(
    ({ item, index, separators }) => {
      if (renderItemProp) {
        return renderItemProp({
          item: { data: item, viewMode },
          index,
          separators,
        });
      }

      const { name, category, id, highlight } = item;

      const isOddItem = !(index % 2);

      if (viewMode === 'card') {
        return (
          <ObjectCardNew
            testID={composeTestID(testID, 'cardItem')}
            item={item}
            id={id}
            name={name}
            categoryName={category.name}
            cover={item.cover}
            blurhash={item.blurhash}
            usersRating={item.usersRating}
            googleRating={item.googleRating}
            onPress={onItemPress}
            onFavoriteChanged={onToggleFavoriteStatusPress}
            style={isOddItem ? styles.cardOdd : styles.card}
          />
        );
      }

      return (
        <SearchListItem
          item={item}
          id={id}
          testID={composeTestID(testID, 'listItem')}
          onPress={onItemPress}
          objectName={highlight?.name || name}
          description={highlight?.description}
          address={highlight?.address}
          categoryName={category.name}
          categoryIcon={ICONS_MATCHER[category.icon]}
        />
      );
    },
    [
      renderItemProp,
      viewMode,
      testID,
      onItemPress,
      styles.cardOdd,
      styles.card,
      onToggleFavoriteStatusPress,
    ],
  );

  const renderHeader = useCallback(() => {
    return (
      <ListItem
        testID={composeTestID(testID, 'listHeader')}
        type="primary"
        title={t('results')}
        renderTitle={props => (
          <Text>
            <Text {...props} />
            <Text> </Text>
            <Text style={[props.style, styles.resultsCount]}>
              {totalResults}
            </Text>
          </Text>
        )}
        rightElement={
          totalResults ? (
            <ObjectListModeSwitch
              testID={composeTestID(testID, 'viewModeSwitch')}
              selectedMode={viewMode}
              onPress={onViewModeChange}
            />
          ) : undefined
        }
      />
    );
  }, [
    onViewModeChange,
    styles.resultsCount,
    t,
    testID,
    totalResults,
    viewMode,
  ]);

  const renderEmptyView = useCallback(() => {
    const Container = handlesKeyboard ? KeyboardAvoidingView : View;

    return (
      <Container behavior="padding" style={styles.emptyListContainer}>
        <View>
          <Text style={styles.emptyListText}>{t('notFound')}</Text>
        </View>
      </Container>
    );
  }, [handlesKeyboard, styles.emptyListContainer, styles.emptyListText, t]);

  const keyboardBehaviourProps = {
    keyboardDismissMode: 'on-drag',
    keyboardShouldPersistTaps: 'handled',
  } as const;

  const {
    ScrollToTopButton,
    listRef: scrollToTopListRef,
    listScrollHandler,
    listLayoutHandler,
    listContentSizeChangeHandler,
  } = useScrollToTopButton();

  const hideKeyboard = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  const ListComponent = (
    withMapWithBottomSheet ? AnimatedBottomSheetFlatList : Animated.FlatList
  ) as typeof Animated.FlatList<SearchObject>;

  const list = (
    <ListComponent
      ref={scrollToTopListRef}
      data={data}
      renderItem={renderItem}
      windowSize={5}
      scrollEventThrottle={16}
      ListHeaderComponent={renderHeader}
      ListHeaderComponentStyle={styles.listHeader}
      ListEmptyComponent={renderEmptyView}
      // @ts-ignore
      keyExtractor={idKeyExtractor}
      numColumns={viewMode === 'card' ? 2 : 1}
      key={viewMode}
      onScroll={listScrollHandler}
      onLayout={listLayoutHandler}
      onContentSizeChange={listContentSizeChangeHandler}
      {...(handlesKeyboard && data.length && keyboardBehaviourProps)}
      {...listProps}
      style={[styles.listContainer, listProps.style]}
      contentContainerStyle={[
        styles.listContentContainer,
        listProps.contentContainerStyle,
      ]}
    />
  );

  return (
    <View style={styles.listContainer}>
      {withMapWithBottomSheet && mapWithBottomSheetProps ? (
        <MapWithBottomSheet
          onObjectPress={onItemPress}
          onTouch={hideKeyboard}
          {...mapWithBottomSheetProps}>
          {list}
        </MapWithBottomSheet>
      ) : (
        list
      )}

      {footer}
      {withScrollToTopButton && <ScrollToTopButton />}
    </View>
  );
};
