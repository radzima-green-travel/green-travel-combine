import {useCallback} from 'react';

import {useNavigation, useRoute} from '@react-navigation/native';
import {useCategoryChildren, useCategoryListAnalytics} from 'core/hooks';
import {ITransformedCategory} from 'core/types';
import {
  CategoriesListScreenNavigationProps,
  CategoriesListScreenRouteProps,
} from '../types';

export const useCategoriesList = () => {
  const {navigate, setOptions} =
    useNavigation<CategoriesListScreenNavigationProps>();
  const {
    params: {categoryId, title},
  } = useRoute<CategoriesListScreenRouteProps>();

  const listData = useCategoryChildren(categoryId);

  const {sendSelectCardEvent} = useCategoryListAnalytics();

  const navigateToObjectDetails = useCallback(
    ({id, name}: ITransformedCategory) => {
      navigate('ObjectsList', {categoryId: id, title: name});
      sendSelectCardEvent(name, title);
    },
    [navigate, sendSelectCardEvent, title],
  );

  return {setOptions, title, listData, navigateToObjectDetails};
};
