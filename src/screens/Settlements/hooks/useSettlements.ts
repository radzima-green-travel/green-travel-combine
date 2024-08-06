import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect, useCallback} from 'react';
import {
  selectSettlementsData,
  selectTransformedFiltersSettlements,
  selectActiveFilters,
} from 'core/selectors';
import {
  useRequestLoading,
  useListPagination,
  useOnRequestError,
} from 'core/hooks';
import {
  getSettlementsDataRequest,
  getPaginationSettlementsDataRequest,
  setActiveFilter,
} from 'core/actions';
import {xor, debounce} from 'lodash';
import {useNavigation} from '@react-navigation/native';
import {useSnackbar} from 'components/atoms';

export const useSettlements = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {show, ...snackBarProps} = useSnackbar();

  const {loading: fullScreenLoading} = useRequestLoading(
    getSettlementsDataRequest,
  );
  const {errorTexts} = useOnRequestError(
    getSettlementsDataRequest,
    'settlements',
  );
  const {loading: paginationLoading} = useRequestLoading(
    getPaginationSettlementsDataRequest,
  );
  const {municipalities: activeSettlements} = useSelector(selectActiveFilters);
  const [selectedSettlements, setSelectedSettlements] =
    useState(activeSettlements);
  const [searchValue, setSearchValue] = useState('');
  const [inputChangeLoading, setInputChangeLoading] = useState(false);

  const {requestedItemsCount, total} = useSelector(selectSettlementsData);
  const settlementsSections = useSelector(selectTransformedFiltersSettlements);

  const getSettlementsData = useCallback(
    (value?: string) => {
      dispatch(getSettlementsDataRequest({searchValue: value}));
    },
    [dispatch],
  );

  const getPaginationSettlementsData = useCallback(() => {
    dispatch(getPaginationSettlementsDataRequest({searchValue}));
  }, [dispatch, searchValue]);

  useEffect(() => {
    getSettlementsData();
  }, [getSettlementsData]);

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
    isLoading: paginationLoading,
    loadMore: getPaginationSettlementsData,
    hasMoreToLoad: requestedItemsCount < total && !paginationLoading,
  });

  const debouncedFunction = useCallback(
    debounce(value => {
      getSettlementsData(value);
      setInputChangeLoading(false);
    }, 500),
    [],
  );

  const handleSearchValue = value => {
    setSearchValue(value);
    debouncedFunction(value);
    setInputChangeLoading(true);
  };

  useOnRequestError(
    getPaginationSettlementsDataRequest,
    'settlements',
    errorLabel => {
      show({
        title: errorLabel.text,
        type: 'error',
      });
    },
  );

  return {
    navigation,
    paginationProps,
    settlementsSections,
    selectedSettlements,
    activeSettlements,
    fullScreenLoading: fullScreenLoading || inputChangeLoading,
    errorTexts,
    searchValue,
    snackBarProps,
    handleSearchValue,
    chooseSettlement,
    applySettlements,
    getSettlementsData,
    resetSelectedSettlements,
  };
};
