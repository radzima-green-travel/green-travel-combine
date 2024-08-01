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
  getSearchSettlementsDataRequest,
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
  const {errorTexts: errorTextsInitial} = useOnRequestError(
    getSettlementsDataRequest,
    'settlements',
  );
  const {loading: paginationLoading} = useRequestLoading(
    getPaginationSettlementsDataRequest,
  );
  const {municipalities: activeSettlements} = useSelector(selectActiveFilters);
  const [selectedSettlements, setSelectedSettlements] =
    useState<string[]>(activeSettlements);
  const [searchValue, setSearchValue] = useState('');

  const {requestedItemsCount, total} = useSelector(selectSettlementsData);
  const settlementsSections = useSelector(selectTransformedFiltersSettlements);

  const getSettlementsData = useCallback(() => {
    dispatch(getSettlementsDataRequest({nextToken: ''}));
  }, [dispatch]);

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
    hasMoreToLoad: requestedItemsCount < total,
  });

  const debouncedFunction = useCallback(
    debounce(value => {
      dispatch(
        getSearchSettlementsDataRequest({nextToken: '', searchValue: value}),
      );
    }, 250),
    [],
  );

  const handleSearchValue = value => {
    setSearchValue(value);
    debouncedFunction(value);
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

  useOnRequestError(
    getSearchSettlementsDataRequest,
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
    fullScreenLoading,
    errorTexts: errorTextsInitial,
    searchValue,
    errorTextsInitial,
    snackBarProps,
    handleSearchValue,
    chooseSettlement,
    applySettlements,
    getSettlementsData,
    resetSelectedSettlements,
  };
};
