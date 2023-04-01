import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  useRequestLoading,
  useBookmarksAnalytics,
  useOnRequestError,
} from 'core/hooks';
import {
  getInitialHomeDataRequest,
  syncAndGetFavoritesRequest,
} from 'core/reducers';
import {IBookmarkItem} from 'core/types';
import {useNavigation} from '@react-navigation/native';
import {ObjectsListScreenNavigationProps} from '../types';
import {selectBookmarksCardsData} from 'core/selectors';

export const useBookmarks = () => {
  const navigation = useNavigation<ObjectsListScreenNavigationProps>();
  const dispatch = useDispatch();
  const {sendSelectSavedCategoryEvent} = useBookmarksAnalytics();

  const bookmarksCategories = useSelector(selectBookmarksCardsData);

  const getHomeData = useCallback(() => {
    dispatch(getInitialHomeDataRequest());
  }, [dispatch]);

  const {loading} = useRequestLoading(getInitialHomeDataRequest);
  const {loading: syncFavoritesLoading} = useRequestLoading(
    syncAndGetFavoritesRequest,
  );
  const {errorTexts} = useOnRequestError(getInitialHomeDataRequest, '');

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
    bookmarksCategories,
    getHomeData,
    loading,
    error: errorTexts,
    navigateToBookmarksList,
    syncFavoritesLoading,
  };
};
