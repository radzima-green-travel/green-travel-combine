import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  selectIsSettlementsLoaded,
  selectSettlementsSections,
  selectSelectedSettlementsSection,
  selectFilteredSettlements,
} from 'core/selectors';
import {
  useRequestLoading,
  useOnRequestError,
  useOnRequestSuccess,
} from 'core/hooks';
import {
  getFiltersDataRequest,
  getSettlementsDataRequest,
  setActiveFilter,
} from 'core/actions';
import { every, xor } from 'lodash';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SettlementsScreenRouteProps } from '../types';
import { IState } from 'core/store';
import { SpotItem } from 'core/types';
import { useSnackbar } from 'atoms';
import { useSettlementsAnalytics } from './useSettlementsAnalytics';

export const useSettlements = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const snackBarProps = useSnackbar();
  const {
    params: { initialSelectedSettlements, regionsToInclude },
  } = useRoute<SettlementsScreenRouteProps>();

  const { loading: fullScreenLoading } = useRequestLoading(
    getSettlementsDataRequest,
  );
  const { errorTexts } = useOnRequestError(
    getSettlementsDataRequest,
    'settlements',
  );

  const [selectedSettlements, setSelectedSettlements] = useState(
    initialSelectedSettlements,
  );

  const isApplyButtonDisabled = useMemo(() => {
    if (initialSelectedSettlements.length === selectedSettlements.length) {
      return every(initialSelectedSettlements, id =>
        selectedSettlements.includes(id),
      );
    }

    return false;
  }, [initialSelectedSettlements, selectedSettlements]);

  const [searchValue, setSearchValue] = useState('');

  const settlementsSections = useSelector((state: IState) =>
    selectSettlementsSections(state, regionsToInclude, searchValue),
  );
  const selectedSettlementsSection = useSelector((state: IState) =>
    selectSelectedSettlementsSection(state, selectedSettlements),
  );

  const filteredSettlements = useSelector((state: IState) =>
    selectFilteredSettlements(state, regionsToInclude, searchValue),
  );

  const isDataLoaded = useSelector(selectIsSettlementsLoaded);

  const {
    sendSettlementsViewEvent,
    sendSettlementSelectEvent,
    sendSettlementsApplyEvent,
    sendSettlementsResetEvent,
    sendSettlementsSearchClearEvent,
    sendSettlementsSearchEvent,
  } = useSettlementsAnalytics();

  useEffect(() => {
    sendSettlementsViewEvent();
  }, [sendSettlementsViewEvent]);

  const applySettlements = useCallback(() => {
    dispatch(
      setActiveFilter({
        name: 'municipalities',
        value: selectedSettlements,
      }),
    );

    sendSettlementsApplyEvent(selectedSettlementsSection);
  }, [
    dispatch,
    selectedSettlements,
    selectedSettlementsSection,
    sendSettlementsApplyEvent,
  ]);

  useOnRequestSuccess(getFiltersDataRequest, () => {
    navigation.goBack();
  });

  useOnRequestError(getFiltersDataRequest, 'filters', errorLabel => {
    snackBarProps.show({
      type: 'error',
      title: errorLabel.text,
    });
  });

  const { loading } = useRequestLoading(getFiltersDataRequest);
  const getSettlementsData = useCallback(() => {
    dispatch(getSettlementsDataRequest());
  }, [dispatch]);

  useEffect(() => {
    if (!isDataLoaded) {
      getSettlementsData();
    }
  }, [getSettlementsData, isDataLoaded]);

  const chooseSettlement = useCallback(
    (item: SpotItem) => {
      setSelectedSettlements(prevState => {
        if (!prevState.includes(item.id)) {
          sendSettlementSelectEvent(item.analyticsMetadata.value);
        }
        return xor(prevState, [item.id]);
      });
    },
    [sendSettlementSelectEvent],
  );

  const resetSelectedSettlements = useCallback(() => {
    setSelectedSettlements([]);
    sendSettlementsResetEvent(selectedSettlementsSection);
  }, [selectedSettlementsSection, sendSettlementsResetEvent]);

  const clearInput = useCallback(() => {
    setSearchValue('');
    sendSettlementsSearchClearEvent();
  }, [sendSettlementsSearchClearEvent]);

  const onSearchStart = useCallback(() => {
    sendSettlementsSearchEvent();
  }, [sendSettlementsSearchEvent]);

  return {
    navigation,
    settlementsSections,
    selectedSettlementsSection,
    selectedSettlements,
    fullScreenLoading: fullScreenLoading,
    errorTexts,
    searchValue,
    handleSearchValue: setSearchValue,
    chooseSettlement,
    applySettlements,
    getSettlementsData,
    resetSelectedSettlements,
    isApplyButtonDisabled,
    loading,
    snackBarProps,
    clearInput,
    filteredSettlements,
    onSearchStart,
  };
};
