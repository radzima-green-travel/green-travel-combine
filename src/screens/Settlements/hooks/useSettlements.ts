import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect, useCallback, useMemo} from 'react';
import {
  selectIsSettlementsLoaded,
  selectSettlementsSections,
} from 'core/selectors';
import {useRequestLoading, useOnRequestError} from 'core/hooks';
import {getSettlementsDataRequest} from 'core/actions';
import {every, xor} from 'lodash';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SettlementsScreenRouteProps} from '../types';
import {IState} from 'core/store';
import {SpotItemDTO} from 'core/types';

export const useSettlements = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    params: {initialSelectedSettlements, onApplySelection, regionsToInclude},
  } = useRoute<SettlementsScreenRouteProps>();

  const {loading: fullScreenLoading} = useRequestLoading(
    getSettlementsDataRequest,
  );
  const {errorTexts} = useOnRequestError(
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

  const isDataLoaded = useSelector(selectIsSettlementsLoaded);

  const getSettlementsData = useCallback(() => {
    dispatch(getSettlementsDataRequest());
  }, [dispatch]);

  useEffect(() => {
    if (!isDataLoaded) {
      getSettlementsData();
    }
  }, [getSettlementsData, isDataLoaded]);

  const applySettlementsItems = useCallback(() => {
    onApplySelection(selectedSettlements);
    navigation.goBack();
  }, [onApplySelection, selectedSettlements, navigation]);

  const chooseSettlement = useCallback((item: SpotItemDTO) => {
    setSelectedSettlements(prevState => {
      return xor(prevState, [item.id]);
    });
  }, []);

  const resetSelectedSettlements = useCallback(() => {
    setSelectedSettlements([]);
  }, []);

  return {
    navigation,
    settlementsSections,
    selectedSettlements,
    fullScreenLoading: fullScreenLoading,
    errorTexts,
    searchValue,
    handleSearchValue: setSearchValue,
    chooseSettlement,
    applySettlements: applySettlementsItems,
    getSettlementsData,
    resetSelectedSettlements,
    isApplyButtonDisabled,
  };
};
