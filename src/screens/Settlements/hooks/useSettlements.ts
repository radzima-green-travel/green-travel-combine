import {useDispatch, useSelector} from 'react-redux';
import {useCallback, useState} from 'react';
import {
  selectSettlementsData,
  selectTransformedFiltersSettlements,
  selectActiveFilters,
} from 'core/selectors';
import {useRequestLoading, useListPagination} from 'core/hooks';
import {getSettlementsDataRequest, setActiveFilter} from 'core/actions';
import {xor} from 'lodash';
import {useNavigation} from '@react-navigation/native';

export const useSettlements = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {loading: dataLoading} = useRequestLoading(getSettlementsDataRequest);
  const {municipalities: activeSettlements} = useSelector(selectActiveFilters);
  const [selectedSettlements, setSelectedSettlements] =
    useState<string[]>(activeSettlements);

  const {requestedItemsCount, total} = useSelector(selectSettlementsData);
  const settlementsSections = useSelector(selectTransformedFiltersSettlements);

  const getPaginationSettlementsData = useCallback(() => {
    dispatch(getSettlementsDataRequest());
  }, [dispatch]);

  const applySettlements = useCallback(() => {
    dispatch(
      setActiveFilter({
        name: 'municipalities',
        value: selectedSettlements,
      }),
    );
    navigation.goBack();
  }, [dispatch, selectedSettlements, navigation]);

  const chooseSettlement = useCallback((settlementID: string) => {
    setSelectedSettlements(prevState => {
      return xor(prevState, [settlementID]);
    });
  }, []);

  const resetSelectedSettlements = useCallback(() => {
    setSelectedSettlements([]);
  }, []);

  const paginationProps = useListPagination({
    isLoading: dataLoading,
    loadMore: getPaginationSettlementsData,
    hasMoreToLoad: requestedItemsCount < total,
  });

  return {
    navigation,
    paginationProps,
    settlementsSections,
    selectedSettlements,
    activeSettlements,
    chooseSettlement,
    applySettlements,
    resetSelectedSettlements,
  };
};
