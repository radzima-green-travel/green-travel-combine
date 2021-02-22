import React, {memo} from 'react';
import {FlatList, View} from 'react-native';
import {MapFilterItem} from 'atoms';
import {isEmpty, some} from 'lodash';
import {styles} from './styles';
import {IMapFilter} from 'core/types';
import {useTranslation} from 'react-i18next';

interface IProps {
  filters: Array<IMapFilter>;
  selectedFilters: Array<IMapFilter>;
  onFilterSelect: (filter: IMapFilter) => void;
  resetFilters: () => void;
}

export const AppMapFilters = memo(
  ({filters, selectedFilters, onFilterSelect, resetFilters}: IProps) => {
    const {t} = useTranslation('map');
    return (
      <View style={styles.container}>
        <FlatList
          horizontal={true}
          data={filters}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
          ListHeaderComponent={
            <MapFilterItem
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
