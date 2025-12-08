import { composeTestID } from 'core/helpers';
import { useTranslation } from 'core/hooks';
import { SearchObject } from 'core/types';
import { ListItem, SearchPromptView, SearchListItem } from 'molecules';
import React, { memo, useCallback } from 'react';
import { ObjectList, ObjectListProps } from '../ObjectList';
import { useHeaderWithOverlayLayout } from '../../containers/Header';

interface SearchListProps extends ObjectListProps {
  onDeletePress: (object: SearchObject) => void;
  onDeleteAllPress: () => void;
  isHistoryVisible: boolean;
  isSearchPromptVisible: boolean;
}

export const SearchList = memo(
  ({
    testID,
    data,
    isHistoryVisible,
    onItemPress,
    onDeletePress,
    onDeleteAllPress,
    isSearchPromptVisible,
    ...listProps
  }: SearchListProps) => {
    const { t } = useTranslation('search');

    const { overlayOffset } = useHeaderWithOverlayLayout();

    const renderHistoryHeader = useCallback(() => {
      return (
        <ListItem
          containerStyle={{ marginTop: overlayOffset }}
          testID={composeTestID(testID, 'listHeader')}
          type="primary"
          title={t('recent')}
          label={t('clear')}
          onRightLabelPress={onDeleteAllPress}
        />
      );
    }, [onDeleteAllPress, t, testID, overlayOffset]);

    const renderHistoryItem = useCallback(
      ({ item }: { item: { data: SearchObject } }) => {
        const { name, category } = item.data;

        return (
          <SearchListItem
            item={item.data}
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

    const historyListProps = {
      renderItem: renderHistoryItem,
      ListHeaderComponent: renderHistoryHeader,
    };

    const searchPreviewListProps = {
      data: [],
      ListHeaderComponent: null,
      ListEmptyComponent: SearchPromptView,
    };

    return (
      <ObjectList
        testID={testID}
        data={data}
        {...(isHistoryVisible && historyListProps)}
        {...(isSearchPromptVisible && searchPreviewListProps)}
        onItemPress={onItemPress}
        {...listProps}
      />
    );
  },
);
