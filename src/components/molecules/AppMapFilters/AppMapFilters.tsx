import React, {memo, useEffect, useMemo, useRef} from 'react';
import {FlatList, View} from 'react-native';
import {MapFilterItem} from 'atoms';
import {isEmpty, some, findIndex, xorBy} from 'lodash';
import {styles} from './styles';
import {IMapFilter} from 'core/types';
import {useTranslation} from 'react-i18next';
import {useScrollToTop} from '@react-navigation/native';
import {composeTestID} from 'core/helpers';
import {createKeyExtractor} from 'core/utils/react';

interface IProps {
  filters: Array<IMapFilter>;
  selectedFilters: Array<IMapFilter>;
  onFilterSelect: (filter: IMapFilter) => void;
  resetFilters: () => void;
  testID: string;
}

export const AppMapFilters = memo(
  ({
    filters,
    selectedFilters,
    onFilterSelect,
    resetFilters,
    testID,
  }: IProps) => {
    const {t} = useTranslation('map');

    const listRef = useRef<FlatList>(null);
    const prevSelectedFilters = useRef(selectedFilters);

    const newAddedFilterIndex = useMemo(() => {
      const addedFilter =
        selectedFilters.length > prevSelectedFilters.current.length
          ? xorBy(selectedFilters, prevSelectedFilters.current, 'categoryId')
          : null;

      prevSelectedFilters.current = selectedFilters;
      if (addedFilter && addedFilter.length) {
        return findIndex(
          filters,
          filter => filter.categoryId === addedFilter[0].categoryId,
        );
      }

      return -1;
    }, [filters, selectedFilters]);

    useEffect(() => {
      if (newAddedFilterIndex !== -1) {
        listRef.current?.scrollToIndex({index: newAddedFilterIndex});
      }
    }, [newAddedFilterIndex]);

    useEffect(() => {
      if (!selectedFilters.length) {
        listRef.current?.scrollToOffset({offset: 0});
      }
    }, [selectedFilters]);

    useScrollToTop(listRef);

    return (
      <View style={styles.container}>
        <FlatList
          ref={listRef}
          horizontal={true}
          keyExtractor={createKeyExtractor('categoryId')}
          data={filters}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
          ListHeaderComponent={
            <MapFilterItem
              testID={composeTestID(testID, 'allFilterItem')}
              data={{categoryId: '', icon: '', title: t('all')}}
              onSelect={resetFilters}
              isSelected={isEmpty(selectedFilters)}
            />
          }
          renderItem={({item}) => {
            return (
              <MapFilterItem
                data={item}
                onSelect={onFilterSelect}
                testID={composeTestID(testID, 'filterItem')}
                isSelected={some(
                  selectedFilters,
                  ({categoryId}) => categoryId === item.categoryId,
                )}
              />
            );
          }}
        />
      </View>
    );
  },
);
