/* eslint-disable react/no-unstable-nested-components */
import React, {memo} from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SearchEmptyView, SearchListItem} from 'molecules';
import {Icon} from 'atoms';
import {COLORS} from 'assets';
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
  }: IProps) => {
    const {t} = useTranslation('search');

    const styles = useThemeStyles(themeStyles);

    const renderContent = () => {
      if (data.length) {
        if (isHistoryVisible) {
          return (
            <FlatListComponent
              style={styles.listContainer}
              contentContainerStyle={styles.contentContainer}
              data={data}
              ListHeaderComponent={() => (
                <View style={styles.listTitleHeader}>
                  <Text style={styles.listTitle}>{t('searchTitle')}</Text>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={onDeleteAllPress}>
                    <Text style={styles.clearAll}>{t('clearAll')}</Text>
                  </TouchableOpacity>
                </View>
              )}
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
            contentContainerStyle={styles.contentContainer}
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
            <Icon name="search" color={COLORS.silver} height={48} width={48} />
            <Text style={styles.emptyListText}>{t('notFound')}</Text>
          </View>
        </KeyboardAvoidingView>

        {renderContent()}
      </>
    );
  },
);
