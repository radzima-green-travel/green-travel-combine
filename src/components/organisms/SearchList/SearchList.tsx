import {ObjectListModeSwitch} from 'atoms';
import {ICONS_MATCHER} from 'core/constants';
import {composeTestID} from 'core/helpers';
import {useListPagination, useThemeStyles, useTranslation} from 'core/hooks';
import {SearchObject} from 'core/types';
import {idKeyExtractor} from 'core/utils/react';
import {
  ListItem,
  ObjectCardNew,
  SearchEmptyView,
  SearchListItem,
} from 'molecules';
import React, {ComponentType, memo, useCallback} from 'react';
import {
  FlatList,
  FlatListProps,
  KeyboardAvoidingView,
  ListRenderItem,
  Text,
  View,
} from 'react-native';
import {ObjectListViewMode} from '../../types';
import {themeStyles} from './styles';

interface IProps {
  data: SearchObject[];
  onItemPress: (objectId: string) => void;
  onDeletePress: (objectId: string) => void;
  onDeleteAllPress: () => void;
  isHistoryVisible: boolean;
  FlatListComponent?: ComponentType<FlatListProps<SearchObject>>;
  listPaninationProps: ReturnType<typeof useListPagination>;
  isSearchPreviewVisible: boolean;
  testID: string;
  totalResults: number;
}

export const SearchList = memo(
  ({
    data,
    FlatListComponent = FlatList,
    isHistoryVisible,
    onDeletePress,
    onDeleteAllPress,
    onItemPress,
    isSearchPreviewVisible,
    listPaninationProps,
    testID,
    totalResults,
  }: IProps) => {
    const {t} = useTranslation('search');

    const styles = useThemeStyles(themeStyles);

    const [viewMode, setViewMode] = React.useState<ObjectListViewMode>('list');

    const prevTotalResults = React.useRef(totalResults);

    // TODO: Move the view mode logic into hook after search bar refactoring
    if (totalResults !== prevTotalResults.current) {
      prevTotalResults.current = totalResults;
      setViewMode('list');
    }

    const resultsFound = !!totalResults;

    const renderSearchResultItem: ListRenderItem<SearchObject> = useCallback(
      ({item, index}) => {
        const {name, category, id, highlight} = item;

        const isLastItem = index === totalResults - 1;

        if (viewMode === 'card') {
          return (
            <ObjectCardNew
              testID={composeTestID(testID, 'cardItem')}
              item={item.id}
              id={id}
              name={name}
              categoryName={category.name}
              cover={item.cover}
              blurhash={item.blurhash}
              usersRating={item.usersRating}
              googleRating={item.googleRating}
              onPress={onItemPress}
              onFavoriteChanged={undefined}
              style={isLastItem ? styles.cardLast : styles.card}
            />
          );
        }

        return (
          <SearchListItem
            testID={composeTestID(testID, 'listItem')}
            objectId={id}
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
        totalResults,
        viewMode,
        onItemPress,
        testID,
        styles.cardLast,
        styles.card,
      ],
    );

    const renderHeader = useCallback(() => {
      if (isHistoryVisible) {
        return (
          <ListItem
            testID={composeTestID(testID, 'listHeader')}
            type="primary"
            title={t('recent')}
            containerStyle={styles.listHeader}
            label={t('clear')}
            onRightLabelPress={onDeleteAllPress}
          />
        );
      }

      if (isSearchPreviewVisible) {
        return null;
      }

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
          containerStyle={styles.listHeader}
          rightElement={
            resultsFound ? (
              <ObjectListModeSwitch
                testID={composeTestID(testID, 'viewModeSwitch')}
                selectedMode={viewMode}
                onPress={setViewMode}
              />
            ) : undefined
          }
        />
      );
    }, [
      isHistoryVisible,
      isSearchPreviewVisible,
      onDeleteAllPress,
      resultsFound,
      styles.listHeader,
      styles.resultsCount,
      t,
      testID,
      totalResults,
      viewMode,
    ]);

    const renderHistoryItem = useCallback(
      ({item}: {item: SearchObject}) => {
        const {name, category, id} = item;

        return (
          <SearchListItem
            objectId={id}
            onPress={onItemPress}
            objectName={name}
            categoryName={category.name}
            categoryIcon="clockHistory2"
            testID={composeTestID(testID, 'historyItem')}
            onRemovePress={onDeletePress}
            withRemoveButton
            withIconBackground={false}
          />
        );
      },
      [onDeletePress, onItemPress, testID],
    );

    const renderEmptyView = useCallback(() => {
      if (isSearchPreviewVisible) {
        return <SearchEmptyView />;
      }

      return (
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.emptyListContainer}>
          <View style={styles.emptyListContent}>
            <Text style={styles.emptyListText}>{t('notFound')}</Text>
          </View>
        </KeyboardAvoidingView>
      );
    }, [
      isSearchPreviewVisible,
      styles.emptyListContainer,
      styles.emptyListContent,
      styles.emptyListText,
      t,
    ]);

    const keyboardBehaviourProps = {
      keyboardDismissMode: 'on-drag',
      keyboardShouldPersistTaps: 'handled',
    } as const;

    return (
      <FlatListComponent
        style={styles.listContainer}
        contentContainerStyle={styles.listContentContainer}
        {...((resultsFound || isHistoryVisible) && keyboardBehaviourProps)}
        data={data}
        renderItem={
          isHistoryVisible ? renderHistoryItem : renderSearchResultItem
        }
        windowSize={5}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyView}
        keyExtractor={idKeyExtractor}
        key={viewMode}
        numColumns={viewMode === 'card' ? 2 : 1}
        columnWrapperStyle={
          viewMode === 'card' ? styles.columnWrapper : undefined
        }
        {...(!isHistoryVisible && listPaninationProps)}
      />
    );
  },
);
