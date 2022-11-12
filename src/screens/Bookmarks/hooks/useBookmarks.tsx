import {useCallback} from 'react';
import {selectBookmarksCardsData} from 'core/selectors';
import {useSelector, useDispatch} from 'react-redux';
import {
  useRequestError,
  useRequestLoading,
  useBookmarksAnalytics,
} from 'core/hooks';
import {getInitialHomeDataRequest} from 'core/reducers';
import {IBookmarkItem} from 'core/types';
import {useNavigation} from '@react-navigation/native';
import {ObjectsListScreenNavigationProps} from '../types';

export const useBookmarks = () => {
  const navigation = useNavigation<ObjectsListScreenNavigationProps>();
  const bookmarksCategories = useSelector(selectBookmarksCardsData);
  const dispatch = useDispatch();
  const {sendSelectSavedCategoryEvent} = useBookmarksAnalytics();

  const getHomeData = useCallback(() => {
    dispatch(getInitialHomeDataRequest());
  }, [dispatch]);

  const {loading} = useRequestLoading(getInitialHomeDataRequest);
  const {error} = useRequestError(getInitialHomeDataRequest);

  const navigateToBookmarksList = useCallback(
    ({categoryName, categoryId}: IBookmarkItem) => {
      navigation.navigate('BookmarksList', {
        title: categoryName,
        categoryId: categoryId,
      });
      sendSelectSavedCategoryEvent(categoryName);
    },
    [navigation, sendSelectSavedCategoryEvent],
  );

  return {
    getHomeData,
    bookmarksCategories,
    loading,
    error,
    navigateToBookmarksList,
  };
};
