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
import {SwipeToDeleteContainer} from '../../containers';
import {Icon} from 'atoms';
import {COLORS} from 'assets';
import {themeStyles} from './styles';
import {useThemeStyles, useTranslation} from 'core/hooks';
import {IObject, TestIDs} from 'core/types';

import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {composeTestID} from 'core/helpers';

interface IProps {
  data: IObject[];
  onItemPress: (object: IObject) => void;
  onDeletePress?: (object: IObject) => void;
  onDeleteAllPress: () => void;
  isHistoryVisible: boolean;
  FlatListComponent?: typeof FlatList | typeof BottomSheetFlatList;
  isSearchQueryEmpty: boolean;
}

export const SearchList = memo(
  ({
    data,
    FlatListComponent = FlatList,
    isHistoryVisible,
    onDeletePress,
    onDeleteAllPress,
    onItemPress,
    isSearchQueryEmpty,
  }: IProps) => {
    const {t} = useTranslation('search');

    const styles = useThemeStyles(themeStyles);

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

        {data.length ? (
          <FlatListComponent
            style={styles.listContainer}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.contentContainer}
            onScrollBeginDrag={Keyboard.dismiss}
            keyExtractor={item => item.id}
            data={data}
            ListHeaderComponent={() =>
              isHistoryVisible ? (
                <View style={styles.listTitleHeader}>
                  <Text style={styles.listTitle}>{t('searchTitle')}</Text>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={onDeleteAllPress}>
                    <Text style={styles.clearAll}>{t('clearAll')}</Text>
                  </TouchableOpacity>
                </View>
              ) : null
            }
            renderItem={({item, index}) => {
              const testID = composeTestID(TestIDs.SearchResultItem, index);
              const titleTestID = composeTestID(
                TestIDs.SearchResultItemTitle,
                index,
              );

              return isHistoryVisible && onDeletePress ? (
                <SwipeToDeleteContainer
                  data={item}
                  onDeletePress={onDeletePress}>
                  <SearchListItem
                    onPress={onItemPress}
                    data={item}
                    testID={testID}
                    titleTestID={titleTestID}
                  />
                </SwipeToDeleteContainer>
              ) : (
                <SearchListItem
                  onPress={onItemPress}
                  data={item}
                  testID={testID}
                />
              );
            }}
          />
        ) : isSearchQueryEmpty ? (
          <SearchEmptyView />
        ) : null}
      </>
    );
  },
);
