import React, {memo} from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  View,
} from 'react-native';
import {ListItem, SearchEmptyView, SearchListItem} from 'molecules';
import {themeStyles} from './styles';
import {useListPagination, useThemeStyles, useTranslation} from 'core/hooks';
import {SearchObject} from 'core/types';

import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {composeTestID} from 'core/helpers';

interface IProps {
  data: SearchObject[];
  onItemPress: (objectId: string) => void;
  onDeletePress: (objectId: string) => void;
  onDeleteAllPress: () => void;
  isHistoryVisible: boolean;
  FlatListComponent?: typeof FlatList | typeof BottomSheetFlatList;
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

    const renderHeader = () => {
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
        />
      );
    };

    const renderContent = () => {
      if (data.length) {
        if (isHistoryVisible) {
          return (
            <FlatListComponent
              style={styles.listContainer}
              data={data}
              renderItem={({item}) => {
                const {name, category, id, description} = item;

                return (
                  <SearchListItem
                    objectId={id}
                    onPress={onItemPress}
                    objectName={name}
                    description={description}
                    categoryName={category.name}
                    categoryIcon={category.icon}
                    testID={composeTestID(testID, 'item')}
                    withRemoveButton
                    onRemovePress={onDeletePress}
                    key={'historty' + id}
                  />
                );
              }}
            />
          );
        }

        return (
          <FlatListComponent
            style={styles.listContainer}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
            onScrollBeginDrag={Keyboard.dismiss}
            data={data}
            renderItem={({item}) => {
              const {name, category, id, description} = item;
              return (
                <SearchListItem
                  key={id}
                  objectId={id}
                  onPress={onItemPress}
                  objectName={name}
                  description={description}
                  categoryName={category.name}
                  categoryIcon={category.icon}
                  testID={composeTestID(testID, 'item')}
                />
              );
            }}
            {...listPaninationProps}
          />
        );
      }

      if (isSearchPreviewVisible) {
        return <SearchEmptyView />;
      }

      return null;
    };

    return (
      <>
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.emptyListContainer}>
          <View style={styles.emptyListContent}>
            <Text style={styles.emptyListText}>{t('notFound')}</Text>
          </View>
        </KeyboardAvoidingView>
        {renderHeader()}
        {renderContent()}
      </>
    );
  },
);
