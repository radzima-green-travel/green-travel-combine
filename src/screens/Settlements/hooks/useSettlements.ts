import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect, useCallback} from 'react';
import {selectSettlementsData, selectSettlementsSections} from 'core/selectors';
import {
  useRequestLoading,
  useListPagination,
  useOnRequestError,
} from 'core/hooks';
import {
  getSettlementsDataRequest,
  getSettlementsNextDataRequest,
} from 'core/actions';
import {xor, debounce} from 'lodash';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSnackbar} from 'components/atoms';
import {SettlementsScreenRouteProps} from '../types';

export const useSettlements = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    params: {activeSettlements, applySettlements, settlementsWithNumberOfItems},
  } = useRoute<SettlementsScreenRouteProps>();
  const {show, ...snackBarProps} = useSnackbar();

  const {loading: fullScreenLoading} = useRequestLoading(
    getSettlementsDataRequest,
  );
  const {errorTexts} = useOnRequestError(
    getSettlementsDataRequest,
    'settlements',
  );
  const {loading: paginationLoading} = useRequestLoading(
    getSettlementsNextDataRequest,
  );
  const [selectedSettlements, setSelectedSettlements] =
    useState(activeSettlements);
  const [searchValue, setSearchValue] = useState('');
  const [inputChangeLoading, setInputChangeLoading] = useState(false);

  const {total, data} = useSelector(selectSettlementsData);
  const settlementsSections = useSelector(
    selectSettlementsSections(settlementsWithNumberOfItems),
  );

  const getSettlementsData = useCallback(
    (value?: string) => {
      dispatch(getSettlementsDataRequest({searchValue: value}));
    },
    [dispatch],
  );

  const getSettlementsNextData = useCallback(() => {
    dispatch(getSettlementsNextDataRequest({searchValue}));
  }, [dispatch, searchValue]);

  useEffect(() => {
    getSettlementsData();
  }, [getSettlementsData]);

  const applySettlementsItems = useCallback(() => {
    applySettlements(selectedSettlements);
    navigation.goBack();
  }, [applySettlements, selectedSettlements, navigation]);

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
    loadMore: getSettlementsNextData,
    hasMoreToLoad: data.length < total && !paginationLoading,
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
    getSettlementsNextDataRequest,
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
    applySettlements: applySettlementsItems,
    getSettlementsData,
    resetSelectedSettlements,
  };
};
